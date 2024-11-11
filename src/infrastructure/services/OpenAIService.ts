import { IOpenAIService } from "../../domain/interfaces/IOpenAIService";
import VectorStoreSingleton from "./VectorStoreSingleton";

class OpenAIService implements IOpenAIService {
  async answerQuestion(query: string): Promise<string> {
    return "";
  }
}

export default OpenAIService;
