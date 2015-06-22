import Rx from "rx";

export default (Actions, Replayables) => ({
  initialize() {
    this();
  },

  fetch() {
    Replayables.Identity
      .take(1)
      .subscribe(identity => {
        fetch('/api/v1/contacts', {
          method: 'get',
          headers: {
            'Authorization': `Token token=${identity.get('accessToken')}`,
            'Accept': 'application/json'
          }
        })
          .then(response => {
            if (response.ok) {
              response
                .json()
                .then(Actions.Contacts.fetchSucceeded, Actions.Contacts.fetchFailed);
            }
            else if (response.status == 403 || response.status == 401) {
              Actions.Identity.unauthorize();
            }
            else {
              Actions.Contacts.fetchFailed();
            }
          })
          .catch(err => Actions.Contacts.fetchFailed(err));
      });

    this();
  },

  fetchSucceeded({data, included}) {
    // TODO: embed photos
    this(data.map(resource => Object.assign({}, resource.attributes, {id: resource.id})));
  },

  fetchFailed(message) {
    this({message});
  }
})
