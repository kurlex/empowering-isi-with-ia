export class ChatBotServiceResponseFactoryService {
  constructor() {}

  getResponse(response: string) {
    const jsResp = JSON.parse(response);
    switch (jsResp.type) {
      case "question": {
        return {
          type: "question",
          payload: jsResp.response,
        };
      }
      case "response": {
        return {
          type: "response",
          payload: jsResp.response,
          buttons: ["Oui", "Non", "Plus d'informations"],
        };
      }
      default:
        return {
          type: "error",
          payload: "we are sorry, we can t",
        };
    }
  }
}
