import React from "react";
import equal from "deep-equal";
import Base from "./Base";
import router from "../utils/router";


class Link extends Base {
  isActive() {
    const stateParts = this.context.currentRoute.name.split('.');
    const propsParts = this.props.to.split('.');

    return (
      equal(stateParts.slice(0, propsParts.length), propsParts) &&
      (!this.props.params || equal(this.context.currentRoute.params, this.props.params))
    );
  }

  render() {
    const activeClass = this.isActive() ? ' '+this.props.activeClassName : '';

    return (
      <a
        {...this.props}
        href={'#'+router.makePath(this.props.to, this.props.params)}
        className={this.getComponentClasses() + activeClass}>
        {this.props.children}
      </a>
    );
  }
}

Link.contextTypes = {
  Actions: React.PropTypes.object,
  currentRoute: React.PropTypes.object
};

Link.propTypes = {
  activeClassName: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired,
  params: React.PropTypes.object
};

Link.defaultProps = {
  activeClassName: "Link-active"
};

export default Link;
