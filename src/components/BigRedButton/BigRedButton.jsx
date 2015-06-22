import React from "react";
import Base from "../Base";
import Paper from "../Paper/Paper";

export default class BigRedButton extends Base {
  render() {
    return (
      <Paper
        className={this.getComponentClasses({working: this.props.working})}
        shape="circle">
        <div className={this.c("inner")} onClick={this.onClick.bind(this)}>
          {this.props.children}
        </div>
      </Paper>
    );
  }

  onClick() {
    console.log('click!');
    this.props.onClick();
  }
}
