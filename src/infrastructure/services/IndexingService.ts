import { MemoryVectorStore } from "langchain/vectorstores/memory";
import VectorStoreSingleton from "./VectorStoreSingleton";

export interface SimilarDocument {
  content: string;
  title: string;
}
class IndexingService {
  public async similaritySearch(query: string): Promise<SimilarDocument[]> {
    const vectorStore = await VectorStoreSingleton.getInstance();
    const similarDocument = await vectorStore.similaritySearch(query, 2);
    return similarDocument.map((document) => ({
      content: document.pageContent,
      title: document.metadata.source,
    }));
  }
}

export default IndexingService;
