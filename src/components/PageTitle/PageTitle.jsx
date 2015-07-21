import React, {Component, PropTypes} from "react";
import {base} from "../../utils/decorators";


@base
export default class PageTitle extends Component {
  render() {
    return (
      <h1 {...this.base()}>{this.props.children}</h1>
    );
  }
}
