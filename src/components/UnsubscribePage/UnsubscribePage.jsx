import React from "react";
import Base from "../Base";
import PageTitle from "../PageTitle/PageTitle";
import BigRedButton from "../BigRedButton/BigRedButton";

class UnsubscribePage extends Base {
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
      <div className={this.getComponentClasses()}>
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

UnsubscribePage.contextTypes = {
  Actions: React.PropTypes.object
};

export default UnsubscribePage;
