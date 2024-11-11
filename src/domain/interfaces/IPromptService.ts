import { PromptInstructionTypeEnum } from "../enums/PromptInstructionTypeEnum";

export interface IPromptService {
  wrapPrompt(prompt: string, similarDocuments: string[]): string;
}
