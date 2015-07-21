import React, {Component, PropTypes} from "react";
import {base} from "../../utils/decorators";


@base
export default class NotFoundPage extends Component {
  render() {
    return (
      <div {...this.base()}>
        <h1 className={this.c("title")}>404</h1>
      </div>
    );
  }
}
