import Rx from 'rx';

export function combineObject(obj) {
  const keys = Object.keys(obj);

  return Rx.Observable.combineLatest.apply(
    Rx.Observable.combineLatest,
    keys
      .map(key => obj[key])
      .concat((...states) => {
        const res = {};
        for (let i = 0; i != keys.length; i++) {
          res[keys[i]] = states[i];
        }
        return res;
      })
  );
}
