import dayjs from "dayjs";
import { IWordRepository } from "../../domain/interfaces/IWordRepository";
import { IWordCloudService } from "../../domain/interfaces/IWordCloudService";
import { Word } from "@prisma/client";

export class HandleGetCloudWordUseCase {
  constructor(
    private wordCloudService: IWordCloudService,
    private wordRepository: IWordRepository
  ) {}

  private isDifferenceLessThanADay = (latestUpdateDate: Date): boolean => {
    const currentTime = dayjs();
    const lastUpdatedTime = dayjs(latestUpdateDate);
    return currentTime.diff(lastUpdatedTime, "day") < 1;
  };

  async execute(): Promise<Word[]> {
    const latestWord = await this.wordRepository.getWordWithLatestsUpdateTime();
    if (!latestWord || !this.isDifferenceLessThanADay(latestWord.updatedAt)) {
      await this.wordCloudService.updateMostUsedWords();
    }
    return await this.wordRepository.getMostUsedWords();
  }
}
