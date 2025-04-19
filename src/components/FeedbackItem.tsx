import { TriangleUpIcon } from "@radix-ui/react-icons";

export default function FeedbackItem() {
  return (
    <li className={"feedback"}>
      <button>
        <TriangleUpIcon />
        <span>593</span>
      </button>

      <div>
        <p>B</p>
      </div>

      <div>
        <p>Amazon</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          vel voluptatem dignissimos, temporibus dolorem nam.
        </p>
      </div>

      <p>4d</p>
    </li>
  );
}
