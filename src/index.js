import React from "react";
import { render } from "react-dom";

import quizStore from "./stores/QuizStore"
import Page from './components/Page'
import NewQuiz from "./forms/NewQuiz";

render(
  <div>
    <Page store={quizStore} form={new NewQuiz()} />
  </div>,
  document.getElementById("root")
);
