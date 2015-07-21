import React, {Component, PropTypes} from "react";
import {base} from "../../utils/decorators";


@base
export default class LoadingBall extends Component {
  render() {
    return (
      <div {...this.base()}>
        <div className={this.c("inner-1")}></div>
        <div className={this.c("inner-2")}></div>
      </div>
    );
  }
}
