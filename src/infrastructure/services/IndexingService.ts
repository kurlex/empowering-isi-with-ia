import { MemoryVectorStore } from "langchain/vectorstores/memory";
import VectorStoreSingleton from "./VectorStoreSingleton";

class IndexingService {
  public async similaritySearch(query: string): Promise<string[]> {
    const vectorStore = await VectorStoreSingleton.getInstance();
    const similarDocument = await vectorStore.similaritySearch(query, 3);
    return similarDocument.map((document) => document.pageContent);
  }
}

export default IndexingService;
