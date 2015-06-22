import Rx from "rx";
import Immutable from "immutable";


export default function ContactsModel(Observables) {
  return (
    Rx.Observable.concat(
      Observables.Contacts.initialize.map(Immutable.fromJS({state: 'unknown', resources: []})),
      Rx.Observable.merge(
        Observables.Identity.logout.map(() =>
          ({state: 'current', resources: Immutable.List()})),
        Observables.Contact.postSucceeded.map(resource =>
          ({add: Immutable.fromJS(resource)})),
        Observables.Contacts.fetch.map(() =>
          ({state: 'fetching'})),
        Observables.Contacts.fetchSucceeded.map(resources =>
          ({state: 'current', resources: Immutable.fromJS(resources || [])})
        ),
        Observables.Contacts.fetchFailed.map(() =>
          ({state: 'error'}))
      )
    )
      .scan((current, delta) => {
        const updated = delta.add
          ? current.update('resources', list => list.push(delta.add))
          : current.merge(delta);

        return updated.set('timestamp', new Date());
      })
  );
}
