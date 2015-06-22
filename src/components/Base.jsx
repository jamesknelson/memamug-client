import {Component, PropTypes} from "react";
import classNames from "classnames";


class Base extends Component {
  getComponentClasses(classNames, ...overrideClassNames) {
    return [
      this.constructor.name,
      this.c(classNames),
      this.props.className || "",
      this.c(overrideClassNames)
    ].join(' ');
  }

  c(...args) {
    return (
      classNames(...args)
        .split(/\s+/)
        .filter(name => name !== "")
        .map(name => `${this.constructor.name}-${name}`)
        .join(' ')
    );
  }
}

Base.propTypes = {
  className: PropTypes.string
};


export default Base;
