import React from "react";
import Base from "../Base";
import LoadingBall from "../LoadingBall/LoadingBall";

class Identity extends Base {
  render() {
    const identity = this.props.identity.toJS();
    let inner;

    if (identity.accessToken) {
      const user = identity.details;

      inner = <div>
        <img className={this.c("avatar")} src={user.avatarUrl} />
        <span className={this.c("name")}>
          {user.firstName} {user.lastName}
        </span>
        <a
          className={this.c("logout")}
          onClick={this.onClickLogout.bind(this)}>
          Sign out
        </a>
      </div>
    }
    else {
      inner = <div>
        {identity.state == 'loggingIn' && <LoadingBall className={this.c("loading")} />}
        <a
          className={this.c("login")}
          onClick={this.onClickLogin.bind(this)}>
          Login with Facebook
        </a>
      </div>;
    }

    return (
      <div className={this.getComponentClasses()}>
        {inner}
      </div>
    );
  }

  onClickLogin() {
    this.context.Actions.Identity.startForegroundLogin();
  }

  onClickLogout() {
    this.context.Actions.Identity.logout();
  }
}

Identity.contextTypes = {
  Actions: React.PropTypes.object
};

export default Identity;
