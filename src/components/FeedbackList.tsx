import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { FeedbackType } from "../lib/types";

type FeedbackListProps = {
  isLoading: boolean;
  errorMessage: string;
  feedbacks: FeedbackType[];
};

export default function FeedbackList({
  feedbacks,
  isLoading,
  errorMessage,
}: FeedbackListProps) {
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {feedbacks.map((feedback) => (
        <FeedbackItem feedback={feedback} />
      ))}
    </ol>
  );
}
