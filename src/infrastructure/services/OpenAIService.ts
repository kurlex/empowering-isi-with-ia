import { IOpenAIService } from "../../domain/interfaces/IOpenAIService";
import VectorStoreSingleton from "./VectorStoreSingleton";
import TranslationService from "./TranslationService";

class OpenAIService implements IOpenAIService {
  async answerQuestion(query: string): Promise<string> {
    return "";
  }
}

export default OpenAIService;
