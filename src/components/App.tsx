import { useEffect, useState } from "react";
import Container from "./Container";
import Footer from "./Footer";
import HashtagList from "./HashtagList";
import { FeedbackType } from "../lib/types";

export default function App() {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddFeedback = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((text) => text.includes("#"))!
      .substring(1);

    const newFeedback: FeedbackType = {
      id: new Date().getTime(),
      text: text,
      daysAgo: 0,
      upvoteCount: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    setFeedbacks([...feedbacks, newFeedback]);
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setFeedbacks(data.feedbacks);
      } catch (error) {
        setErrorMessage("Something went wrong.");
      }
      setIsLoading(false);
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="app">
      <Footer />
      <Container
        isLoading={isLoading}
        errorMessage={errorMessage}
        feedbacks={feedbacks}
        handleAddFeedback={handleAddFeedback}
      />
      <HashtagList />
    </div>
  );
}
