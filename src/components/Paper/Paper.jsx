import React, {Component, PropTypes} from "react";
import {base} from "../../utils/decorators";


@base
export default class Paper extends Component {
  static propTypes = {
    shape: PropTypes.oneOf(['circle', 'rounded']),
  }

  static defaultProps = {
    shape: 'rounded',
  }


  render() {
    return (
      <div {...this.base({classes: this.props.shape})}>
        <div className={this.c("inner")}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
