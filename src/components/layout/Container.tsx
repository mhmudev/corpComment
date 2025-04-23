import { FeedbackType } from "../../lib/types";
import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";

type ContainerProps = {
  isLoading: boolean;
  errorMessage: string;
  feedbacks: FeedbackType[];
  handleAddFeedback: (text: string) => void;
};

export default function Container({
  isLoading,
  errorMessage,
  feedbacks,
  handleAddFeedback,
}: ContainerProps) {
  return (
    <main className="container">
      <Header onAddFeedback={handleAddFeedback} />
      <FeedbackList
        isLoading={isLoading}
        errorMessage={errorMessage}
        feedbacks={feedbacks}
      />
    </main>
  );
}
