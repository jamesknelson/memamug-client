import Rx from "rx";


export default function NavigationModel(Observables) {
  return Rx.Observable.concat(
    Observables.Navigation.initialize,
    Observables.Navigation.navigatedTo
  );
}
