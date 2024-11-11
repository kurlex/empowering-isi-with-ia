import { IGPTService } from "../../domain/interfaces/IGPTService";
import { IPromptService } from "../../domain/interfaces/IPromptService";
import IndexingService from "./IndexingService";
import { franc } from "franc-min";
import TranslationService from "./TranslationService";

class ChatBotService {
  constructor(
    private indexationService: IndexingService,
    private gptService: IGPTService,
    private promptService: IPromptService,
    private translateService: TranslationService
  ) {}
  private ENGLISH_CODE = "en";
  private FRENCH_CODE = "fr";

  public async processPrompt(prompt: string) {
    const language = franc(prompt);
    if (language != this.ENGLISH_CODE && language != this.FRENCH_CODE) return; // unsuported language
    if (language == this.FRENCH_CODE)
      prompt = await this.translateService.translateText(
        prompt,
        this.ENGLISH_CODE,
        this.FRENCH_CODE
      );
    const similarDocuments = await this.indexationService.similaritySearch(
      prompt
    );
    prompt = this.promptService.wrapPrompt(prompt, similarDocuments);
    const response = await this.gptService.generateResponse(prompt);
    return ChatBotServiceResponseFactory.getResponse(response);
  }
}

export default ChatBotService;
