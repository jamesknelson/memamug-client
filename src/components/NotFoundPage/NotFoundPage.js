import React from "react";
import Base from "../Base";

export default class NotFoundPage extends Base {
  render() {
    return (
      <div className={this.getComponentClasses()}>
        <h1 className={this.c("title")}>404</h1>
      </div>
    );
  }
}
