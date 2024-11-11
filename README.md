## Demo

https://github.com/user-attachments/assets/cdcf9f4e-d756-4271-b6f3-e677236b0375

## Database

The app uses three tables: `Chat`, `Conversation`, and `Word`.

### Conversation Table

A conversation represents a single interaction between a user and the AI. In other words, a conversation consists of a user's request and the AI's response. Each conversation also has a flag called `isTreated`, which determines whether the conversation has been processed. This flag is used to compute the most frequently occurring words across all user requests, which will later be displayed in a word cloud.

```prisma
model Conversation {
  id         String   @id @default(uuid())
  request    String
  response   String
  createdAt  DateTime @default(now())
  chat       Chat     @relation(fields: [chatId], references: [id])
  chatId     String
  isTreated  Boolean  @default(false)
}
```

### Chat Table

The `Chat` table represents the context of interactions between the user and the AI. A single chat can contain multiple conversations.

```prisma
model Chat {
  id            String         @id @default(uuid())
  name          String
  userId        String
  createdAt     DateTime       @default(now())
  conversations Conversation[]
}
```

### Word Table

The `Word` table contains all valid words from user requests. It has a column called occurance that keeps track of the frequency of each word. If the occurance is negative, the word is considered a stop word.

```prisma
model Word {
  content    String   @id
  occurance  Int
  updatedAt  DateTime @updatedAt @default(now())
}
```

## Software Architecture

In this project, we adhered to the principles of **CLEAN Architecture**. The project is organized into four layers: **Presentation**, **Application**, **Infrastructure**, and **Domain**. However, since Next.js expects the presentation layer to be named either app or pages, we opted to use the app directory for consistency.

The structure of the `src` folder is as follows:

```
src
|-- app (Presentation Layer)
|-- application
|-- infrastructure
|-- domain
```

### Presentation Layer

The Presentation Layer contains everything related to the UI, including pages, components, contexts, and more.

The structure of the `app` folder is as follows:

```
app
|-- assets
|-- components
|-- context
|-- dashboard
|-- lib
|-- serverActions
|-- utils
```

- **Pages**: Since we opted for the App Router, the pages are not centralized under a nested folder within the `app` folder. For instance, the Home page is defined directly under the `app` folder, while the Dashboard page is defined within the `dashboard` folder.
- **Assets**: Contains any assets imported by a page or a component.
- **Components**: The `components` folder includes all components that make up the pages mentioned earlier. The defined components are:
  - **Chat**: Handles the conversation between the user and the AI.
  - **Sidebar**: Manages operations on chats.
  - **Loader**
  - **WordCloud**
- **Context**: A folder containing contexts and their providers. For example, there is one context shared among all child components of the Dashboard page.
- **Lib**: A folder used to re-export third-party libraries. For instance, it’s used to create and export the Supabase client.
- **ServerActions**: The actions in this folder serve as gateways to access our server.
- **Utils**: Contains all utility functions.

#### Presentation Layer Dependency

The actions defined inside the `serverActions` folder are the only methods that communicate with the Infrastructure Layer, acting as a gateway between the front end and the back end. Any other component within the Presentation Layer must use these actions to communicate externally. Additionally, all components within the Presentation Layer are private and not exported outside. In other words, the Presentation Layer depends on the Infrastructure Layer via actions, but no other layer depends on it.

### Infrastructure Layer

The infrastructure layer contains the concrete implementations of repositories and services, which are exposed to the presentation layer through containers. The structure of the `infrastructure` folder is as follows:

```
infrastructure
|-- containers
|-- repositories
|-- services
```

- **containers**: This directory contains containers that inject the repositories and services into the use cases (application layer). For now, there is a single container that checks whether the environment is development or production based on a setting defined in the `.env` file, and accordingly, it decides whether to use production services or their mock versions.
- **repositories**: This directory defines the concrete implementations of the repositories.
- **services**: This directory contains various services that define the business logic. The services include:
  - `GPTService`: A service responsible for invoking the OpenAI client and retrieving the response to a given prompt.
  - `MockDataService`: A service responsible for loading and providing mocked data.
  - `MockGPTService`: A mock version of `GPTService` that uses the mocked data to respond to specific prompts.
  - `PromptService`: A service that wraps the user's input with the appropriate prompt, which is then used by `IGPTService`.
  - `WordCloudService`: A service that runs once a day, taking all untreated conversations, classifying the words using IA, and then updating their occurrence in the database.

#### Infrastructure Layer Dependency

The infrastructure layer depends on two layers: the domain layer and the application layer. It uses the domain layer to implement the interfaces for repositories and services, and it depends on the application layer to inject these repositories and services into the use cases, which are then exposed to the application layer via the container.

### Application Layer

The application layer contains various use cases. In our case, this layer consists solely of the `useCases` folder. The use cases are:

- **Create User**
- **Create Conversation**
- **Delete Chat**
- **Get Old Conversations**
- **Get Chat**: If no chat is found, it creates a default chat.
- **Get Cloud Word Data**: Checks whether it's been more than a day since the last update. If so, it processes a new batch and returns the top 100 most frequent words.
- **Get Number of User's Messages**
- **Update Chat Name**

#### Application Layer Dependency

The use cases in this layer rely on the interfaces defined in the domain layer for repositories and services. Each use case interacts with these abstract definitions, allowing the application layer to remain independent of the concrete implementations provided in the infrastructure layer. Thus, the application layer depends solely on the domain layer.

### Domain Layer

The domain layer defines all repository and service interfaces, as well as enums. It serves as the core of the application and does not depend on any other layers.

## Next Step

Two main things aren't done yet: the tests and the deployment.
