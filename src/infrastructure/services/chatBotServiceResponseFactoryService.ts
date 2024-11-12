class ChatBotServiceResponseFactoryService {
  constructor() {}

  static getResponse(response: string | null) {
    const errorResponse = {
      type: "error",
      payload: "we are sorry, we can't",
    };

    if (!response) return errorResponse;

    const jsResp = JSON.parse(response);
    switch (jsResp.type) {
      case "question": {
        return {
          type: "question",
          payload: jsResp.response,
        };
      }
      case "answer": {
        return {
          type: "response",
          payload: jsResp.response,
          buttons: ["Oui", "Non", "Plus d'informations"],
        };
      }
      default:
        return errorResponse;
    }
  }
}

export default ChatBotServiceResponseFactoryService;
