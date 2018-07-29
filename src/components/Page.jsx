import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import Quiz from './Quiz'
import Form from './Form'


@observer
export default class Question extends React.Component {

  render() {
    return (
      <div>
          <Form/>
          <Quiz/>
      </div>
    );
  }
}
