import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import Quiz from "./models/QuizModel"
import Page from './components/Page'

const quiz = new Quiz();

render(
  <div>
    <DevTools />
    <Page store={quiz} />
  </div>,
  document.getElementById("root")
);
