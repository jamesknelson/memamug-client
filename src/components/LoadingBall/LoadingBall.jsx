import React from "react";
import Base from "../Base";

export default class LoadingBall extends Base {
  render() {
    return (
      <div className={this.getComponentClasses()}>
        <div className={this.c("inner-1")}></div>
        <div className={this.c("inner-2")}></div>
      </div>
    );
  }
}
