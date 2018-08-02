import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import Question from './Question'


@observer
export default class Quiz extends React.Component {

  render() {
    return (
      <div>
          {this.props.cards.map(card => <Question card={card}></Question>) }
      </div>
    );
  }
}
