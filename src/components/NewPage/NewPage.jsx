import React from "react/addons";
import Base from "../Base";
import Link from "../Link";
import PageTitle from "../PageTitle/PageTitle";
import NewCard from "../NewCard/NewCard";


const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


const MESSAGES = [
  () =>
    <div key="initial">
      <p>Get e-mail reminders tomorrow, in 3 days, 7 days, 2 weeks, and 1 month. <Link to="unsubscribe">Unsubscribe</Link> at any time.</p>
      <p>Want to remember multiple people? Don't worry - we group your reminders so you never get more than one e-mail a day.</p>
    </div>,
  contacts => 
    <div key={1}>
      <p>
        Awesome, your first e-mail will be in your inbox tomorrow!
      </p>
      <p>
        But... <strong>{contacts.get(0).get('displayName')}</strong> might feel lonely
        being the only person in your reminder e-mail. You could add someone else?
      </p>
    </div>,
  (contacts, identity) =>
    <div key={2}>
      <p>
        Great work, {identity.getIn(['details', 'firstName'])}, that's two contacts
        whose names you'll find easier to remember than before!
      </p>
      <p>
        They say three is a party, and reminder e-mails are no exception. Let's add one more
        contact to keep <strong>{contacts.get(0).get('displayName')}</strong> and 
        <strong> {contacts.get(1).get('displayName')}</strong> company.
      </p>
    </div>
]

const DEFAULT_MESSAGE =
  (contacts) =>
    <div key={contacts.size}>
      <p>
        Roger that. <strong>{contacts.last().get('displayName')}</strong> will be in your
        e-mail tomorrow!
      </p>
      <p>
        You've added <strong>{contacts.size}</strong> contacts to Memamug so far.
        Why not make it <strong>{contacts.size+1}</strong>?
      </p>
    </div>

const WELCOME_BACK_MESSAGE =
  (contacts, identity) =>
    <div key="welcome-back">
      <p>
        Welcome back, {identity.getIn(['details', 'firstName'])}! 
        You've added <strong>{contacts.size}</strong> contacts to Memamug so far.
        Why not make it <strong>{contacts.size+1}</strong>?
      </p>
    </div>


class NewPage extends Base {
  constructor(props) {
    super(props);

    this.state = {
      created: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contact.get('id') != this.props.contact.get('id')) {
      this.setState({created: true});
    }
  }

  render() {
    const contacts = this.props.contacts.get('resources');
    const message = this.props.identity.get('accessToken') && !this.state.created && contacts.size > 0
      ? WELCOME_BACK_MESSAGE(contacts, this.props.identity)
      : MESSAGES[contacts.size]
        ? MESSAGES[contacts.size](contacts, this.props.identity)
        : DEFAULT_MESSAGE(contacts);

    return (
      <div className={this.getComponentClasses()}>
        <PageTitle className={this.c("title")}>Can't afford to forget faces?</PageTitle>
        <div className={this.c("description")}>
          <ReactCSSTransitionGroup transitionName="NewPage-content">
            {message}
          </ReactCSSTransitionGroup>
        </div>
        <NewCard contact={this.props.contact} identity={this.props.identity} />
      </div>
    );
  }
}

export default NewPage;
