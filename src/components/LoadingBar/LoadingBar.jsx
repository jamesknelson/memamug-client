import React from "react";
import Base from "../Base";

export default class LoadingBar extends Base {
  constructor(props) {
    super(props)

    this.state = {completed: 0};
  }

  componentDidMount() {
    this.interval = window.setInterval(() => {
      var diff = Math.random() * 10;

      this.setState({
        completed: Math.min(this.state.completed + diff, 100)
      });

      if (this.state.completed == 100) {
        window.clearInterval(this.interval);
      };
    }, 500);
  }

  componentWillUnmount() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  render() {
    return (
      <div className={this.getComponentClasses()}>
        <div className={this.c("inner")} style={{width: this.state.completed+'%'}} />
      </div>
    );
  }
}
