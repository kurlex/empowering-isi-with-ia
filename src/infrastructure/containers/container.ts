import { ChatOpenAI } from "@langchain/openai";
import { IGPTService } from "../../domain/interfaces/IGPTService";
import { GPTService } from "../services/GPTService";
import { IWordCloudService } from "../../domain/interfaces/IWordCloudService";
import { WordCloudService } from "../services/WordCloudService";
import { ConversationRepository } from "../repositories/ConversationRepository";
import { ChatRepository } from "../repositories/ChatRepository";
import { WordRepository } from "../repositories/WordRepository";
import { PromptService } from "../services/PromptService";
import { IPromptService } from "../../domain/interfaces/IPromptService";
import { HandleDeleteChatUseCase } from "../../application/useCases/HandleDeleteChatUseCase";
import { HandleGetCloudWordUseCase } from "../../application/useCases/HandleGetCloudWordUseCase";
import { HandleCreateConversationUseCase } from "../../application/useCases/HandleCreateConversationUseCase";
import { HandleGetConversationUseCase } from "../../application/useCases/HandleGetConversationUseCase";
import { HandleUpdateChatUseCase } from "../../application/useCases/HandleUpdateChatUseCase";
import { HandleGetConversationCountUseCase } from "../../application/useCases/HandleGetConversationCountUseCase";
import { HandleGetChatUserCase } from "../../application/useCases/HandleGetChatUserCase";
import { HandleCreateChatUseCase } from "../../application/useCases/HandleCreateChatUseCase";
import { MockGPTService } from "../services/MockGPTService";

const isProd = process.env.RUNTIME_ENV === "production";
console.log("Project Started at", isProd ? "Prod" : "Dev", "environment");
// const chatGPTModel = new ChatOpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// repositories
export const conversationRepository = new ConversationRepository();
export const chatRepository = new ChatRepository();
export const wordRepository = new WordRepository();

// services
const promptService: IPromptService = new PromptService();

// const gptService: IGPTService = isProd
//   ? new GPTService(chatGPTModel)
//   : new MockGPTService();
const gptService: IGPTService = new MockGPTService();
const wordCloudService: IWordCloudService = new WordCloudService(
  wordRepository,
  conversationRepository,
  gptService,
  promptService
);

// handlers
export const handleDeleteChatUseCase = new HandleDeleteChatUseCase(
  chatRepository,
  conversationRepository
);

export const handleGetCloudWordUseCase = new HandleGetCloudWordUseCase(
  wordCloudService,
  wordRepository
);

handleGetCloudWordUseCase.execute();

export const handleCreateConversationUseCase =
  new HandleCreateConversationUseCase(
    gptService,
    promptService,
    conversationRepository
  );

export const handleGetConversationUseCase = new HandleGetConversationUseCase(
  conversationRepository
);

export const handleUpdateChatUseCase = new HandleUpdateChatUseCase(
  chatRepository
);

export const handleGetConversationCountUseCase =
  new HandleGetConversationCountUseCase(conversationRepository);

export const handleGetChatUserCase = new HandleGetChatUserCase(chatRepository);

export const handleCreateChatUseCase = new HandleCreateChatUseCase(
  chatRepository
);
