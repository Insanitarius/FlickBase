import * as Yup from "yup";

export const formValues = {
  title: "",
  content: "",
  excerpt: "",
  score: "",
  director: "",
  actors: [],
  status: "draft",
};

export const validation = () => {
  return Yup.object({
    title: Yup.string().required("Sorry, the title is required"),
    content: Yup.string()
      .required("Sorry, the content is required")
      .min(50, "That's it...? Write some more"),
    excerpt: Yup.string()
      .required("Sorry, the excerpt is required")
      .max(500, "Sorry, the word limit is 500"),
    score: Yup.number()
      .required("Sorry, the score is required")
      .min(0, "Sorry, 0 is the minimum")
      .max(100, "Sorry, 100 is the maximum"),
    director: Yup.string().required("Please enter the director"),
    actors: Yup.array()
      .required("Please enter the actors")
      .min(2, "Minimum 2 actors required"),
    status: Yup.string().required("Sorry, the status is required"),
  });
};
