import React, {Component, PropTypes} from "react";
import {base} from "../../utils/decorators";


@base
export default class AboutPage extends Component {
  render() {
    return (
      <div {...this.base()}>
        <h1>Mugs</h1>
      </div>
    );
  }
}
