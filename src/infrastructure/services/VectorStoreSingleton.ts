import * as fs from "fs";
import * as path from "path";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";

class VectorStoreSingleton {
  private static _vectorStore: MemoryVectorStore | null = null;
  private constructor() {}
  public static async getInstance() {
    if (VectorStoreSingleton._vectorStore == null) {
      VectorStoreSingleton._vectorStore = new MemoryVectorStore(
        new OpenAIEmbeddings()
      );

      const docsFolderPath = path.join(process.cwd(), "data", "docs");
      console.log(__dirname, docsFolderPath);
      const textFiles = fs
        .readdirSync(docsFolderPath)
        .filter((file) => file.endsWith(".txt"));
      for (const file of textFiles) {
        const filePath = path.join(docsFolderPath, file);

        const content = fs.readFileSync(filePath, "utf-8");
        for (let split = 1; ; split++) {
          try {
            const partSize = Math.ceil(content.length / split);
            const parts: string[] = [];

            for (let i = 0; i < content.length; i += partSize) {
              parts.push(content.slice(i, i + partSize));
            }
            parts.forEach(async (part) => {
              await VectorStoreSingleton._vectorStore!.addDocuments([
                new Document({
                  pageContent: part,
                  metadata: { source: file },
                }),
              ]);
            });

            break;
          } catch (error) {
            continue;
          }
        }
      }
    }

    return VectorStoreSingleton._vectorStore;
  }
}

export default VectorStoreSingleton;
