import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    )
      .then((response) => response.json())
      .then((data) => {
        setFeedbacks(data.feedbacks);
        setIsLoading(false);
      });
  }, []);

  return (
    <ol className="feedback-list">
      {isLoading ? <Spinner /> : null}
      {feedbacks.map((feedback) => (
        <FeedbackItem feedback={feedback} />
      ))}
    </ol>
  );
}
