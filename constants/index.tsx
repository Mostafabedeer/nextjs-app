export const themes = [
  { value: "light", label: "Light", icon: "/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/icons/moon.svg" },
  { value: "system", label: "System", icon: "/icons/computer.svg" },
];

export const sidebarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: "/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};

export const HotNetworkData = [
  {
    id: 1,
    title: "How to center a div in CSS?",
  },
  {
    id: 2,
    title: "What is the difference between let and var in JavaScript?",
  },
  {
    id: 3,
    title: "How to make a responsive navbar in React?",
  },
];

export const PopularTagsData = [
  {
    id: 1,
    tag: "JavaScript",
    numberOfQuestions: 1200,
  },
  {
    id: 2,
    tag: "React",
    numberOfQuestions: 950,
  },
  {
    id: 3,
    tag: "CSS",
    numberOfQuestions: 800,
  },
  {
    id: 4,
    tag: "HTML",
    numberOfQuestions: 700,
  },
  {
    id: 5,
    tag: "Node.js",
    numberOfQuestions: 650,
  },
  {
    id: 6,
    tag: "TypeScript",
    numberOfQuestions: 600,
  },
  {
    id: 7,
    tag: "Next.js",
    numberOfQuestions: 550,
  },
  {
    id: 8,
    tag: "Python",
    numberOfQuestions: 500,
  },
];
