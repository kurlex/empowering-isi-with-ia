export interface IOpenAIService {
  answerQuestion(query: string): Promise<string>;
}
