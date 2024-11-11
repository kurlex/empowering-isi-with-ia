import { IOpenAIService } from "../../domain/interfaces/IOpenAIService";
import VectorStoreSingleton from "./VectorStoreSingleton";
import TranslationService from "./TranslationService";

class OpenAIService implements IOpenAIService {
  async answerQuestion(query: string): Promise<string> {
    let translation = new TranslationService();
    await translation.translateFolder(
      "/home/bibolil/Documents/GitHub/empowering-isi-with-ia/data/docs"
    );

    return "";
  }
}

export default OpenAIService;
