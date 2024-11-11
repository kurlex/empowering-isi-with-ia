import { Word } from "@prisma/client";
import { IReducedWord } from "./IReducedWord";

export interface IWordRepository {
  getMostUsedWords(): Promise<Word[]>;
  getSpecificWords(words: string[]): Promise<Word[]>;
  getWordWithLatestsUpdateTime(): Promise<Word | null>;
  createOrUpdateWords(words: IReducedWord[]): Promise<void>;
}
