import { ChatPage } from "./screens/ChatPage"
import './app.css';
import { useEffect } from "react";
import { useWebSocketStore } from "./store/useWebSocketStore";
function App() {


  useEffect(() => {
    const { connect, disconnect } = useWebSocketStore.getState();
    connect('ws://localhost:8000/chat/search/123');

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
