import React from "react";
import Base from "./Base";
import ApplicationLayout from "./ApplicationLayout/ApplicationLayout";
import MugsPage from "./MugsPage/MugsPage";
import NewPage from "./NewPage/NewPage";
import UnsubscribePage from "./UnsubscribePage/UnsubscribePage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";


class Application extends Base {
  getChildContext() {
    return {
      Actions: this.props.Actions,
      currentRoute: this.props.route
    };
  }
    
  render() {
    let page;

    //
    // Create a component based on the current route
    //
    
    switch (this.props.route.name) {
      case "new":
        page = <NewPage
          contacts={this.props.contacts}
          contact={this.props.contact}
          identity={this.props.identity} />;
        break;

      case "mugs":
        page = <MugsPage contacts={this.props.contacts} />;
        break;

      case "unsubscribe":
        page = <UnsubscribePage
          identity={this.props.identity}
          subscriptions={this.props.subscriptions} />;
        break;

      default: 
        page = <NotFoundPage />
    }

    return (
      <ApplicationLayout
        className={this.getComponentClasses()}
        identity={this.props.identity}
        page={page}
      />
    );
  }
}

Application.childContextTypes = {
  Actions: React.PropTypes.object,
  currentRoute: React.PropTypes.object
};

export default Application;
