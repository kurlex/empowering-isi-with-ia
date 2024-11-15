import { AzureChatOpenAI } from "@langchain/openai";
import { IGPTService } from "../../domain/interfaces/IGPTService";
import { GPTService } from "../services/GPTService";
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
import IndexingService from "../services/IndexingService";
import ChatBotService from "../services/ChatBotService";
import TranslationService from "../services/TranslationService";

const isProd = process.env.RUNTIME_ENV === "production";
console.log("Project Started at", isProd ? "Prod" : "Dev", "environment");
console.log(process.env.G_OPENAI_API_DEPLOYMENT_NAME);
console.log(process.env.G_OPENAI_API_INSTANCE_NAME);
console.log(process.env.G_OPENAI_API_VERSION);
console.log(process.env.G_OPENAI_API_KEY);
const chatGPTModel = new AzureChatOpenAI({
  azureOpenAIApiDeploymentName: process.env.G_OPENAI_API_DEPLOYMENT_NAME,
  azureOpenAIApiInstanceName: "isiai",
  azureOpenAIApiVersion: process.env.G_OPENAI_API_VERSION,
  azureOpenAIApiKey: process.env.G_OPENAI_API_KEY,
});

// repositories
export const conversationRepository = new ConversationRepository();
export const chatRepository = new ChatRepository();
export const wordRepository = new WordRepository();

// services
const promptService: IPromptService = new PromptService();
const indexingService = new IndexingService();
const translateService = new TranslationService(
  process.env.TRANSLATION_API_KEY!,
  process.env.TRANSLATION_ENDPOINT!,
  process.env.TRANSLATION_LOCATION!
);
const gptService: IGPTService = new GPTService(chatGPTModel);

const chatBotService = new ChatBotService(
  indexingService,
  gptService,
  promptService,
  translateService
);

// handlers
export const handleDeleteChatUseCase = new HandleDeleteChatUseCase(
  chatRepository,
  conversationRepository
);

export const handleGetCloudWordUseCase = new HandleGetCloudWordUseCase(
  wordRepository
);

handleGetCloudWordUseCase.execute();

export const handleCreateConversationUseCase =
  new HandleCreateConversationUseCase(conversationRepository, chatBotService);

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
