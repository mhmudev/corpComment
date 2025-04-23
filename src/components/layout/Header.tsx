import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";

type HeaderProps = {
  onAddFeedback: (text: string) => void;
};

export default function Header({ onAddFeedback }: HeaderProps) {
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddFeedback={onAddFeedback} />
    </header>
  );
}
