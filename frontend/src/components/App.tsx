import { io } from "socket.io-client";
import Container from "./layout/Container";
import Footer from "./layout/Footer";
import HashtagList from "./hashtag/HashtagList";
import { useEffect } from "react";
import { useFeedbackItemsStore } from "../stores/feedbackStore";

const socket = io("https://corpcomment-production.up.railway.app");

export default function App() {
  const fetchFeedbacks = useFeedbackItemsStore((state) => state.fetchFeedbacks);
  const setFeedbacks = useFeedbackItemsStore((state) => state.setFeedbacks);

  useEffect(() => {
    fetchFeedbacks();
    socket.on("newFeedback", (feedback) => {
      console.log("Received new feedback:", feedback);
      setFeedbacks(feedback);
    });
    return () => {
      socket.off("newFeedback");
    };
  }, []);

  return (
    <div className="app">
      <Footer />
      <Container />
      <HashtagList />
    </div>
  );
}







[
  {
    
    "company": "Starbucks",
    "badgeLetter": "S",
    "upvoteCount": 563,
    "text": "I really wish #Starbucks would use hand wrappers for hot drinks as a standard, I keep burning my hands and am tired of bothering the employee."
  },
  {
    
    "company": "Netflix",
    "badgeLetter": "N",
    "upvoteCount": 486,
    "text": "since yday on mobile #netflix keeps buffering the video, it keeps happening even when I redownload the app. I'm in an area with decent internet btw"
  },
  {
    
    "company": "McDonald's",
    "badgeLetter": "M",
    "upvoteCount": 377,
    "text": "It's a real shame that my local #mcdonald's removed milkshakes from the menu. they were the reason I go to mcdonald's. 😩 please bring them back!"
  },
  {
    
    "company": "Amazon",
    "badgeLetter": "A",
    "upvoteCount": 156,
    "text": "Im an #amazon prime member but don't really watch the prime video offering. instead of that I would want an option for even faster delivery 😎"
  },
  {
    
    "company": "Netflix",
    "badgeLetter": "N",
    "upvoteCount": 88,
    "text": "would be great if #netflix could announce content removals further ahead. 😊 I dont want to get into a show only for it to be gone soon. thanks"
  },
  {
    
    "company": "Microsoft",
    "badgeLetter": "M",
    "upvoteCount": 41,
    "text": "i've been using #microsoft teams for a couple weeks now and 1 thing that really sticks out is that navigation is too difficult. please simplify it."
  },
  {
    
    "company": "Nike",
    "badgeLetter": "N",
    "upvoteCount": 39,
    "text": "hi #nike I love your running shoes but it's very difficult to return them after a purchase. had to do a lot of phone calls to make it work. thanks 👍"
  },
  {
    
    "company": "McDonald's",
    "badgeLetter": "M",
    "upvoteCount": 22,
    "text": "#mcdonald's the past few times I've been some items were missing from my order. only noticed this when I got home. straws, nuggets, fries, they missed"
  },
  {
    
    "company": "Adidas",
    "badgeLetter": "A",
    "upvoteCount": 9,
    "text": "i like your website #adidas, but your sizing guide needs some work. it suggested an L for me but when it arrived it was too big. still kept it btw 😎"
  }
]