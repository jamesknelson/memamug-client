import React, {Component, PropTypes} from "react";
import {base} from "../../utils/decorators";
import LoadingBall from "../LoadingBall/LoadingBall";


@base
export default class Identity extends Component {
  static propTypes = {
    identity: PropTypes.object,
  }

  static contextTypes = {
    Actions: PropTypes.object,
  }

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
          onClick={this.onClickLogout}>
          Sign out
        </a>
      </div>
    }
    else {
      inner = <div>
        {identity.state == 'loggingIn' && <LoadingBall className={this.c("loading")} />}
        <a
          className={this.c("login")}
          onClick={this.onClickLogin}>
          Login with Facebook
        </a>
      </div>;
    }

    return (
      <div {...this.base()}>
        {inner}
      </div>
    );
  }

  onClickLogin = () => {
    this.context.Actions.Identity.startForegroundLogin();
  }

  onClickLogout = () => {
    this.context.Actions.Identity.logout();
  }
}
