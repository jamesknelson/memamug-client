import Rx from "rx";
import Immutable from "immutable";


export default function IdentityModel(Observables) {
  const I = Observables.Identity;

  return (
    Rx.Observable.concat(
      I.initialize.map(Immutable.fromJS),
      Rx.Observable.merge(
        I.postSession.map(() =>
          ({state: 'loggingIn'})),

        I.receiveSession.map(({user, accessToken}) =>
          ({state: 'loggedIn', details: user, accessToken: accessToken})),

        I.startForegroundLogin.map(() => 
          ({state: 'authorizing', details: {}, accessToken: null})),

        I.startBackgroundLogin.map(() =>
          ({state: 'authorizing', details: {}, accessToken: null})),

        I.unauthorize.map(details => 
          ({state: 'unauthorized', details: details, accessToken: null})),

        I.logout.map(() => 
          ({state: 'anonymous', details: {}, accessToken: null}))
      )
    )
      .scan((current, delta) => current
        .merge(delta)
        .set('timestamp', new Date())
      )
  );
}
