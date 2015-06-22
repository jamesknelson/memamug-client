import environment from "environment";

export default function IdentityControl(Actions, Replayables) {
  function handleFacebookResponse(response) {
    if (response.status == 'connected') {
      Actions.Identity.postSession(response.authResponse);
    }
    else if (response.status == 'not_authorized') {
      Actions.Identity.unauthorize('not_authorized');
    }
    else {
      Actions.Identity.unauthorize('not_logged_in');
    }
  }

  return {
    initialize() {
      let identity = {
        state: 'anonymous',
        accessToken: null,
        timestamp: new Date(),
        details: null,
      };

      const storedIdentity = localStorage.getItem(environment.identityProperty);

      if (storedIdentity) {
        try {
          identity = JSON.parse(storedIdentity);
        }
        catch (e) {
          // Gracefully fail if somehow the cookie gets messed up
          localStorage.clear();
          window.location.reload();
        }
      }

      this(identity);
    },

    postSession(data) {
      fetch('/auth/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.assign({}, data, {provider: 'facebook'}))
      })
        .then(response => {
          if (response.ok) {
            response
              .json()
              .then(Actions.Identity.receiveSession, Actions.Identity.unauthorize);
          }
          else {
            Actions.Identity.unauthorize({status: 404});
          }
        })
        .catch(err => Actions.Identity.unauthorize());

      this();
    },

    receiveSession({data, included}) {
      this(Object.assign(
        {},
        data.attributes,
        {id: data.id, user: Object.assign({}, included[0].attributes, {id: included[0].id})}
      ));
    },

    startForegroundLogin() {
      FB.login(handleFacebookResponse, {scope: environment.facebook.scope});
      this();
    },

    startBackgroundLogin() {
      FB.getLoginStatus(handleFacebookResponse);
      this();
    },

    unauthorize(reason) {
      this(reason);
    },

    logout() {
      FB.logout();
      this();
    },
  };
};
