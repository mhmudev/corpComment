import Container from "./layout/Container";
import Footer from "./layout/Footer";
import HashtagList from "./hashtag/HashtagList";
import { useEffect } from "react";
import { useFeedbackItemsStore } from "../stores/feedbackStore";

export default function App() {
  const fetchFeedbacks = useFeedbackItemsStore((state) => state.fetchFeedbacks);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);
  return (
    <div className="app">
      <Footer />
      <Container />
      <HashtagList />
    </div>
  );
}
