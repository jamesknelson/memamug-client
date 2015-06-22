import React from "react";
import Base from "../Base";

export default class Paper extends Base {
  render() {
    const shape = {
      circle: this.props.shape == 'circle',
      rounded: !this.props.shape || this.props.shape == 'rounded'
    };

    return (
      <div className={this.getComponentClasses(shape)}>
        <div className={this.c("inner")}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
