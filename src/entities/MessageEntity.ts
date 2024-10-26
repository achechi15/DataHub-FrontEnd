import { response } from "../screens/ChatPage";

export interface Message {
    id: string;
    isBot: boolean;
    content: string | response;
}