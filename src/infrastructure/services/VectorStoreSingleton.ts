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
        new OpenAIEmbeddings({
          azureOpenAIApiDeploymentName:
            process.env.E_AZURE_OPENAI_API_DEPLOYMENT_NAME,
          azureOpenAIApiInstanceName:
            process.env.E_AZURE_OPENAI_API_INSTANCE_NAME,
          azureOpenAIApiVersion: process.env.E_AZURE_OPENAI_API_VERSION,
          azureOpenAIApiKey: process.env.E_AZURE_OPENAI_API_KEY,
        })
      );

      const docsFolderPath = path.join(process.cwd(), "data", "docs");
      console.log(__dirname, docsFolderPath);
      const textFiles = fs
        .readdirSync(docsFolderPath)
        .filter((file) => file.endsWith(".txt"));
      let count = 0;
      let maxPartSize = 0;
      for (const file of textFiles) {
        if (count >= 10) break;
        count++;
        const filePath = path.join(docsFolderPath, file);
        const content = fs.readFileSync(filePath, "utf-8");
        for (let split = Math.max(content.length / 9032, 1); ; split++) {
          const partSize = Math.ceil(content.length / split);
          const parts: string[] = [];
          try {
            await VectorStoreSingleton._vectorStore!.addDocuments([
              new Document({
                pageContent: content.slice(0, partSize),
                metadata: { source: file },
              }),
            ]);
          } catch {
            continue;
          }

          for (let i = 1; i < content.length; i += partSize) {
            parts.push(content.slice(i, i + partSize));
          }
          parts.forEach(async (part) => {
            maxPartSize = Math.max(maxPartSize, part.length);
            await VectorStoreSingleton._vectorStore!.addDocuments([
              new Document({
                pageContent: part,
                metadata: { source: file },
              }),
            ]);
          });
          break;
        }
        console.log("finished", filePath, maxPartSize);
      }
      console.log("feeding docs finished");
    }

    return VectorStoreSingleton._vectorStore;
  }
}

export default VectorStoreSingleton;
