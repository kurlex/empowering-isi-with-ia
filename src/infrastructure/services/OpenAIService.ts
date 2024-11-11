import { IOpenAIService } from "../../domain/interfaces/IOpenAIService";
import VectorStoreSingleton from "./VectorStoreSingleton";

class OpenAIService implements IOpenAIService {
  async answerQuestion(query: string): Promise<string> {
    const vectorStore = await VectorStoreSingleton.getInstance();
    const similarDocument = await vectorStore.similaritySearch(
      "quel sont les formation a l'isi",
      3
    );
    console.log(similarDocument.map((document) => document.pageContent));
    return "";
  }
}

export default OpenAIService;
