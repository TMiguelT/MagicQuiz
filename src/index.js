import React from "react";
import { render } from "react-dom";

import quizStore from "./stores/QuizStore"
import Page from './components/Page'

render(
  <div>
    <Page store={quizStore} />
  </div>,
  document.getElementById("root")
);
