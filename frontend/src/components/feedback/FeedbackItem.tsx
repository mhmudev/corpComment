import { TriangleUpIcon } from "@radix-ui/react-icons";
import { FeedbackType } from "../../lib/types";
import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://corpcomment-production.up.railway.app");

type FeedbackItemPropsType = { feedback: FeedbackType };

export default function FeedbackItem({ feedback }: FeedbackItemPropsType) {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedback.upvoteCount);
  console.log("FeedbackItem", feedback, feedback._id);

  const handleUpvote = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setUpvoteCount((prev) => prev + 1);
    e.stopPropagation();
    e.currentTarget.disabled = true;

    const response = await fetch(
      `https://corpcomment-production.up.railway.app/api/feedbacks/${feedback._id}/upvote`,
      {
        method: "PATCH",
      }
    );

    const errorData = await response.json();
    if (!response.ok) {
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    socket.on("upvoted", (upvoted) => {
      console.log("Received new vote:", upvoted);
      setUpvoteCount((prev) => prev + 1);
    });

    return () => {
      socket.off("upvoted");
    };
  };
  return (
    <li
      onClick={() => setOpen((prev) => !prev)}
      className={`feedback ${open ? "feedback--expand" : ""}`}
    >
      <button onClick={handleUpvote}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>

      <div>
        <p>{feedback.badgeLetter}</p>
      </div>

      <div>
        <p>{feedback.company}</p>
        <p>{feedback.text}</p>
      </div>

      <p>{feedback.daysAgo === 0 ? "NEW" : `${feedback.daysAgo}d`}</p>
    </li>
  );
}
