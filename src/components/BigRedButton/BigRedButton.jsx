import React, {Component, PropTypes} from "react";
import {base} from "../../utils/decorators";
import Paper from "../Paper/Paper";


@base
export default class BigRedButton extends Component {
  render() {
    const classes = {
      working: this.props.working,
    }

    return (
      <Paper {...this.base({classes})} shape="circle">
        <div className={this.c("inner")}>
          {this.props.children}
        </div>
      </Paper>
    );
  }
}
