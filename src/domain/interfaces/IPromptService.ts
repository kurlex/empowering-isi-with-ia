import { PromptInstructionTypeEnum } from "../enums/PromptInstructionTypeEnum";

export interface IPromptService {
  wrapPrompt(
    prompt: string,
    promptInstructionTypeEnum: PromptInstructionTypeEnum
  ): string;
}
