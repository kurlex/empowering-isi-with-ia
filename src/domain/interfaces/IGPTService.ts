export interface IGPTService {
  generateResponse(prompt: string): Promise<string | null>;
}
