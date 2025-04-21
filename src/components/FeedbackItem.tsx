import { TriangleUpIcon } from "@radix-ui/react-icons";

type FeedbackType = {
  upvoteCount: number;
  badgeLetter: string;
  companyName: string;
  text: string;
  daysAgo: number;
};

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
        <p>{feedback.companyName}</p>
        <p>{feedback.text}</p>
      </div>

      <p>{feedback.daysAgo}d</p>
    </li>
  );
}
