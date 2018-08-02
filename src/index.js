import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import quizStore from "./stores/QuizStore"
import Page from './components/Page'

render(
  <div>
    <DevTools />
    <Page store={quizStore} />
  </div>,
  document.getElementById("root")
);
