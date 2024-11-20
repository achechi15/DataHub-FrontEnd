import { ChatPage } from "./screens/ChatPage"
import './app.css';
import { useEffect } from "react";
import { useWebSocketStore } from "./store/useWebSocketStore";


const websocketUrl = import.meta.env.VITE_WEBSOCKET_URL;
console.log(websocketUrl)
function App() {


  useEffect(() => {
    const { connect, disconnect } = useWebSocketStore.getState();
    const id = crypto.randomUUID();
    console.log({id})
    connect(`${import.meta.env.VITE_WEBSOCKET_URL}/chat/search/${id}`);

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
