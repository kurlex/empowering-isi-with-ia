import { IWordRepository } from "../../domain/interfaces/IWordRepository";
import { Conversation, Word } from "@prisma/client";
import { IPromptService } from "../../domain/interfaces/IPromptService";
import { PromptInstructionTypeEnum } from "../../domain/enums/PromptInstructionTypeEnum";
import { IWordCloudService } from "../../domain/interfaces/IWordCloudService";
import { IConversationRepository } from "../../domain/interfaces/IConversationRepository";
import { IGPTService } from "../../domain/interfaces/IGPTService";

export class WordCloudService implements IWordCloudService {
  constructor(
    private wordRepository: IWordRepository,
    private conversationRepository: IConversationRepository,
    private gptService: IGPTService,
    private promptService: IPromptService
  ) {}

  cleanWord = (word: string): string => {
    return word.replace(/[^a-zA-Z]/g, "");
  };

  getWordOccurrencesInUserRequest = (
    request: string
  ): Record<string, number> => {
    const wordsList = request
      .split(" ")
      .map((word) => this.cleanWord(word))
      .filter(Boolean);
    const wordOccurrences: Record<string, number> = {};

    wordsList.forEach((word) => {
      wordOccurrences[word] = (wordOccurrences[word] || 0) + 1;
    });

    return wordOccurrences;
  };

  getWordOccurrencesInAllUsersRequests = (conversations: Conversation[]) => {
    const wordOccurrencesAcrossConversations: Record<string, number> = {};

    conversations.forEach((conversation) => {
      const wordOccurrencesInRequest = this.getWordOccurrencesInUserRequest(
        conversation.request
      );

      Object.entries(wordOccurrencesInRequest).forEach(([word, occurrence]) => {
        wordOccurrencesAcrossConversations[word] =
          (wordOccurrencesAcrossConversations[word] || 0) + occurrence;
      });
    });

    return wordOccurrencesAcrossConversations;
  };

  removeForbiddenWords = (
    wordOccurrences: Record<string, number>,
    words: Word[]
  ): Record<string, number> => {
    const forbiddenWords = words
      .filter((word) => word.occurance < 0)
      .map((word) => word.content);

    forbiddenWords.forEach((forbiddenWord) => {
      delete wordOccurrences[forbiddenWord];
    });

    return wordOccurrences;
  };

  getUnknownWords = (
    wordOccurrences: Record<string, number>,
    knownWords: Word[]
  ): string[] => {
    const knownWordsSet = new Set(knownWords.map((word) => word.content));
    return Object.keys(wordOccurrences).filter(
      (word) => !knownWordsSet.has(word)
    );
  };

  requestIAToClassifyWords = async (
    words: string[]
  ): Promise<Record<string, string> | null> => {
    const prompt = `[${words.join(", ")}]`;
    const formattedPrompt = this.promptService.wrapPrompt(
      prompt,
      PromptInstructionTypeEnum.word
    );
    try {
      const response = await this.gptService.generateResponse(formattedPrompt);
      if (!response) null;
      return JSON.parse(response!);
    } catch {
      return null;
    }
  };

  getClassifiedUnknownWords = async (
    wordOccurrences: Record<string, number>,
    knownWords: Word[]
  ) => {
    const unknownWords = this.getUnknownWords(wordOccurrences, knownWords);
    return await this.requestIAToClassifyWords(unknownWords);
  };

  accumulateOccurance = (
    wordOccurrences: Record<string, number>,
    classifiedWord: Record<string, string>,
    knownWords: Word[]
  ) => {
    return Object.entries(wordOccurrences)
      .map(([word, occurance]) => ({
        content: word,
        occurance:
          occurance < 0 || classifiedWord[word] !== "valid"
            ? -1
            : (knownWords[word] || 0) + occurance,
      }))
      .filter((word) => classifiedWord[word.content] !== "invalid");
  };

  async updateMostUsedWords(): Promise<void> {
    const untreatedConversations =
      await this.conversationRepository.getUntreatedConversations();
    let wordOccurrencesInAllUsersRequests =
      this.getWordOccurrencesInAllUsersRequests(untreatedConversations);

    let knownWords = await this.wordRepository.getSpecificWords(
      Object.keys(wordOccurrencesInAllUsersRequests)
    );
    wordOccurrencesInAllUsersRequests = this.removeForbiddenWords(
      wordOccurrencesInAllUsersRequests,
      knownWords
    );
    let classifiedUnknownWords = await this.getClassifiedUnknownWords(
      wordOccurrencesInAllUsersRequests,
      knownWords
    );

    if (!classifiedUnknownWords) return;

    let updatedWords = this.accumulateOccurance(
      wordOccurrencesInAllUsersRequests,
      classifiedUnknownWords,
      knownWords
    );
    await this.wordRepository.createOrUpdateWords(updatedWords);
    await this.conversationRepository.updateTreatedConversations(
      untreatedConversations.map((conversation) => conversation.id)
    );
  }
}
