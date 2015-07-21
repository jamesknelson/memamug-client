import React, {Component, PropTypes} from "react";
import equal from "deep-equal";
import {base} from "../utils/decorators";
import router from "../utils/router";


@base
class Link extends Component {
  isActive() {
    const stateParts = this.context.currentRoute.name.split('.');
    const propsParts = this.props.to.split('.');

    return (
      equal(stateParts.slice(0, propsParts.length), propsParts) &&
      (!this.props.params || equal(this.context.currentRoute.params, this.props.params))
    );
  }

  render() {
    const classes = {
      [this.props.activeClassName]: this.isActive(),
    }

    return (
      <a {...this.base({classes})}
        href={'#'+router.makePath(this.props.to, this.props.params)}>
        {this.props.children}
      </a>
    );
  }
}

Link.contextTypes = {
  Actions: PropTypes.object,
  currentRoute: PropTypes.object
};

Link.propTypes = {
  activeClassName: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  params: PropTypes.object
};

Link.defaultProps = {
  activeClassName: "Link-active"
};

export default Link;
