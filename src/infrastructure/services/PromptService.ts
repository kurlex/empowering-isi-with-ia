import fs from "fs";
import path from "path";
import { IPromptService } from "../../domain/interfaces/IPromptService";
import { PromptInstructionTypeEnum } from "../../domain/enums/PromptInstructionTypeEnum";

export class PromptService implements IPromptService {
  private promptInstructions: Record<PromptInstructionTypeEnum, string>;

  constructor() {
    this.promptInstructions = {
      chat: "",
      word: "",
    };
    for (const promptInstructionType of Object.keys(
      PromptInstructionTypeEnum
    )) {
      const filePath = path.join(
        process.cwd(),
        "data",
        `${promptInstructionType}PromptInstruction.txt`
      );
      this.promptInstructions[promptInstructionType] = fs.readFileSync(
        filePath,
        "utf8"
      );
    }
  }

  private replacePromptInput(template: string, prompt: string): string {
    return template.replace(/\[PROMPT_INPUT\]/g, prompt);
  }

  wrapPrompt(
    prompt: string,
    promptInstructionTypeEnum: PromptInstructionTypeEnum
  ): string {
    return this.replacePromptInput(
      this.promptInstructions[promptInstructionTypeEnum],
      prompt
    );
  }
}
