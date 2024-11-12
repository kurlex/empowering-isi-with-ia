import { SimilarDocument } from "../../infrastructure/services/IndexingService";

export interface IPromptService {
  wrapPrompt(
    userPrompt: string,
    similarDocuments: SimilarDocument[],
    language: string
  ): string;
}
