import fs from "fs";
import path from "path";
import { PromptInstructionTypeEnum } from "../../domain/enums/PromptInstructionTypeEnum";

export class MockDataService {
  private mockedData: Record<string, string> = {};
  getMockedData(key: PromptInstructionTypeEnum) {
    try {
      if (!this.mockedData[key]) {
        const filePath = path.join(process.cwd(), "data", `${key}Mock.json`);
        const fileContents = fs.readFileSync(filePath, "utf8");
        this.mockedData[key] = JSON.parse(fileContents);
      }
      return this.mockedData[key];
    } catch {
      return null;
    }
  }
}
