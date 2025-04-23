import { useState } from "react";
import { MAX_CHARS } from "../lib/constants";

type FeedbackFormProps = {
  onAddFeedback: (text: string) => void;
};

export default function FeedbackForm({ onAddFeedback }: FeedbackFormProps) {
  const [text, setText] = useState("");
  const charLeft = MAX_CHARS - text.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARS) {
      return;
    }
    setText(newText);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddFeedback(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <textarea
        value={text}
        onChange={handleChange}
        id="feedback-textarea"
        placeholder="blabla"
        spellCheck={false}
      />

      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>

      <div>
        <p className="u-italic">{charLeft}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
