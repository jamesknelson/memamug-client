import React, {Component, PropTypes} from "react";
import {base} from "../../utils/decorators";
import PageTitle from "../PageTitle/PageTitle";
import BigRedButton from "../BigRedButton/BigRedButton";


@base
export default class UnsubscribePage extends Component {
  static propTypes = {
    identity: PropTypes.object.isRequired,
    subscriptions: PropTypes.object.isRequired,
  }

  static contextTypes = {
    Actions: React.PropTypes.object,
  }


  render() {
    let content;

    if (!this.props.identity.get('accessToken')) {
      content = <p>Please login with the link at the top right to unsubscribe.</p>;
    }
    else if (this.props.subscriptions.get('subscriptions') == 0) {
      content = <p>You're unsubscribed!</p>;
    }
    else {
      const working = this.props.subscriptions.get('state') == 'deleting';

      content = <div>
        <p>
          So, you've already remembered everyone's name before the e-mail
          sequence completes? That's great! Just press the big red button.
        </p>
        <BigRedButton
          className={this.c("button")}
          onClick={this.unsubscribe.bind(this)}
          working={working}>
          Unsubscribe
        </BigRedButton>
      </div>;
    }

    return (
      <div {...this.base()}>
        <PageTitle className={this.c("title")}>Unsubscribe</PageTitle>
        {content}
      </div>
    );
  }

  unsubscribe() {
    console.log('unsubscribe!');
    this.context.Actions.Subscriptions.deleteAll();
  }
}
