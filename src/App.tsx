import { ChatPage } from "./screens/ChatPage"
import './App.css';
import { useEffect } from "react";
import { useWebSocketStore } from "./store/useWebSocketStore";


const websocketUrl = import.meta.env.VITE_WEBSOCKET_URL;
if (!websocketUrl) {
  throw new Error("VITE_WEBSOCKET_URL is not defined");
}
console.log(websocketUrl);

function App() {


  useEffect(() => {
    const { connect, disconnect } = useWebSocketStore.getState();
    const id = crypto.randomUUID();
    console.log({id})
    console.log(`${websocketUrl}/chat/search/${id}`)
    connect(`${websocketUrl}/chat/search/${id}`);

    return () => {
      disconnect();
    }
  }, []);
  


  return (
    <>
      {/* <NavBar /> */}
      <ChatPage />
      {/* <Chat /> */}
    </>
  )
}

export default App
