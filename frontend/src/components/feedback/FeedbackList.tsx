import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsStore } from "../../stores/feedbackStore";
import { useEffect } from "react";
import { API_BASE_URL } from "../../lib/constants";
import { io } from "socket.io-client";

const socket = io(API_BASE_URL);

export default function FeedbackList() {
  const isLoading = useFeedbackItemsStore((state) => state.isLoading);
  const errorMessage = useFeedbackItemsStore((state) => state.errorMessage);
  const filteredFeedbacks = useFeedbackItemsStore((state) =>
    state.getFilteredFeedbacks()
  );
  const setFeedbacks = useFeedbackItemsStore((state) => state.setFeedbacks);
  const feedbacks = useFeedbackItemsStore((state) => state.feedbacks);

  useEffect(() => {
    socket.on("newFeedback", (feedback) => {
      console.log("Received new feedback:", feedback);
      const isFeedbackExists = feedbacks.some((f) => f._id === feedback._id);
      console.log(isFeedbackExists);
      if (!isFeedbackExists) {
        setFeedbacks(feedback);
      }
    });

    return () => {
      socket.off("newFeedback");
    };
  }, []);

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {filteredFeedbacks.map((feedback, index) => (
        <FeedbackItem key={feedback._id ?? index} feedback={feedback} />
      ))}
    </ol>
  );
}
