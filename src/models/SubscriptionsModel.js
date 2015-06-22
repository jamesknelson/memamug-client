import Rx from "rx";
import Immutable from "immutable";


export default function SubscriptionsModel(Observables) {
  return (
    Rx.Observable.concat(
      Observables.Subscriptions.initialize.map(Immutable.fromJS({state: 'current', subscriptions: 0})),
      Rx.Observable.merge(
        Observables.Identity.logout.map(() =>
          ({state: 'current', subscriptions: 0})),
        Observables.Contacts.fetchSucceeded.map(resources =>
          ({state: 'current',
            subscriptions: (resources || []).reduce((total, contact) => total + (contact.subscribedOn ? 1 : 0), 0)})),
        Observables.Contact.postSucceeded.map(contact =>
          ({add: contact.subscribedOn})),
        Observables.Subscriptions.deleteAll.map(() =>
          ({state: 'deleting'})),
        Observables.Subscriptions.deleteAllSucceeded.map(() =>
          ({state: 'current', subscriptions: 0})),
        Observables.Subscriptions.deleteAllFailed.map(() =>
          ({state: 'unknown'}))
      )
    )
      .scan((current, delta) => {
        const updated = delta.add
          ? current.update('subscriptions', count => count + 1)
          : current.merge(delta);

        return updated.set('timestamp', new Date());
      })
  );
}
