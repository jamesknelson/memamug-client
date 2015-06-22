import React from "react";
import Base from "../Base";

export default class PageTitle extends Base {
  render() {
    return (
      <h1 className={this.getComponentClasses()}>{this.props.children}</h1>
    );
  }
}
