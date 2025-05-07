import { io } from "socket.io-client";
import Container from "./layout/Container";
import Footer from "./layout/Footer";
import HashtagList from "./hashtag/HashtagList";
import { useEffect } from "react";
import { useFeedbackItemsStore } from "../stores/feedbackStore";

const socket = io("https://corpcomment-production.up.railway.app");

export default function App() {
  const fetchFeedbacks = useFeedbackItemsStore((state) => state.fetchFeedbacks);
  const setFeedbacks = useFeedbackItemsStore((state) => state.setFeedbacks);

  useEffect(() => {
    fetchFeedbacks();
    socket.on("newFeedback", (feedback) => {
      console.log("Received new feedback:", feedback);
      setFeedbacks(feedback);
    });
    return () => {
      socket.off("newFeedback");
    };
  }, []);

  return (
    <div className="app">
      <Footer />
      <Container />
      <HashtagList />
    </div>
  );
}
