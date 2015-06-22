import Rx from "rx";


let lastRouteName;
let lastUserId;


export default function FetchActor(Actions, Replayables) {
  Rx.Observable.combineLatest(
    Replayables.Navigation,
    Replayables.Identity,
    Replayables.Contacts,
    (route, identity, contacts) => ({route, identity, contacts})
  )
    .subscribe(({route, identity, contacts}) => {
      const userId = identity.getIn(['details', 'id']);

      if (((route.name == "new" && lastRouteName != route.name) ||
           (lastUserId != userId)) &&
          userId &&
          contacts.get('state') != "fetching") {
        Actions.Contacts.fetch();
      }

      lastRouteName = route.name;
      lastUserId = userId;
    });
}
