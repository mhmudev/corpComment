import { create } from "zustand";
import { FeedbackType } from "../lib/types";
import { API_BASE_URL } from "../lib/constants";

type Store = {
  feedbacks: FeedbackType[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbacks: () => FeedbackType[];
  addFeedback: (text: string) => Promise<void>;
  fetchFeedbacks: () => Promise<void>;
  selectCompany: (company: string) => void;
  setFeedbacks: (feedback: FeedbackType) => void;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbacks: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",

  getCompanyList: () => {
    return get()
      .feedbacks.map((feedback) => feedback.company)
      .filter((company, index, self) => self.indexOf(company) === index);
  },

  getFilteredFeedbacks: () => {
    const state = get();
    return state.selectedCompany
      ? state.feedbacks.filter(
          (feedback) => feedback.company === state.selectedCompany
        )
      : state.feedbacks;
  },

  addFeedback: async (text: string) => {
    const companyName = text
      .split(" ")
      .find((text) => text.includes("#"))!
      .substring(1);

    const newFeedback: FeedbackType = {
      text: text,
      daysAgo: 0,
      upvoteCount: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    set((state) => ({ feedbacks: [...state.feedbacks, newFeedback] }));
    await fetch(`${API_BASE_URL}/api/feedbacks`, {
      method: "POST",
      body: JSON.stringify(newFeedback),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  },
  fetchFeedbacks: async () => {
    set(() => ({ isLoading: true }));
    try {
      const response = await fetch(`${API_BASE_URL}/api/feedbacks`);

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      set(() => ({ feedbacks: data }));
    } catch (error) {
      set(() => ({
        errorMessage: "Something went wrong.",
      }));
    }
    set(() => ({ isLoading: false }));
  },

  selectCompany: (company: string) => {
    set((state) => ({
      selectedCompany: state.selectedCompany === company ? "" : company,
    }));
  },
  setFeedbacks: (feedback) => {
    console.log("feedback", feedback);
    const newFeedback: FeedbackType = {
      text: feedback.text,
      daysAgo: 0,
      upvoteCount: 0,
      company: feedback.company,
      badgeLetter: feedback.badgeLetter,
      _id: feedback._id,
    };

    set((state) => {
      const isFeedbackExists = state.feedbacks.some(
        (f) => f.text === newFeedback.text
      );

      if (isFeedbackExists) {
        return { feedbacks: state.feedbacks };
      }

      return { feedbacks: [...state.feedbacks, newFeedback] };
    });
  },
}));
