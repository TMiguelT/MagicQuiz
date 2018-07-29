import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";


@observer
export default class Question extends React.Component {

  render() {
    return (
      <div>
        <p>What is this card?</p>
        <div>{this.props.card}</div>
      </div>
    );
  }
}
