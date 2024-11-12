class ChatBotServiceResponseFactoryService {
  constructor() {}

  static getResponse(response: string | null) {
    const errorResponse = {
      type: "error",
      payload:
        "The query you submitted is unsupported. Please ensure your question pertains to university-related topics.",
    };

    if (!response) return errorResponse;

    const jsResp = JSON.parse(response);
    switch (jsResp.type) {
      case "question": {
        return {
          type: "question",
          payload: jsResp.response,
          suggestions: jsResp.rapid_answer_suggestions,
        };
      }
      case "answer": {
        return {
          type: "response",
          payload: jsResp.response,
        };
      }
      default:
        return errorResponse;
    }
  }
}

export default ChatBotServiceResponseFactoryService;
