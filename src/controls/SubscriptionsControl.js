import Rx from "rx";

export default (Actions, Replayables) => ({
  initialize() {
    this();
  },

  deleteAll() {
    Replayables.Identity
      .take(1)
      .subscribe(identity => {
        fetch('/api/v1/subscriptions', {
          method: 'delete',
          headers: {
            'Authorization': `Token token=${identity.get('accessToken')}`,
            'Accept': 'application/json'
          }
        })
          .then(response => {
            if (response.ok) {
              Actions.Subscriptions.deleteAllSucceeded();
            }
            else if (response.status == 403 || response.status == 401) {
              Actions.Identity.unauthorize();
            }
            else {
              Actions.Subscriptions.deleteAllFailed();
            }
          })
          .catch(err => Actions.Subscriptions.deleteAllFailed(err));
      });

    this();
  },

  deleteAllSucceeded() {
    this();
  },

  deleteAllFailed(message) {
    this({message});
  }
})
