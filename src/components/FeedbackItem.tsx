import { TriangleUpIcon } from "@radix-ui/react-icons";
import { FeedbackType } from "../lib/types";

type FeedbackItemPropsType = { feedback: FeedbackType };

export default function FeedbackItem({ feedback }: FeedbackItemPropsType) {
  return (
    <li className={"feedback"}>
      <button>
        <TriangleUpIcon />
        <span>{feedback.upvoteCount}</span>
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
