import Rx from "rx";
import Immutable from "immutable";
import {generate} from "../utils/uuid";


function createEmpty() {
  const record = Immutable.fromJS({
    id: generate(),
    state: 'new',
    message: null,
    data: {name: null, file: null}
  });

  return record.merge(validate(record));
}

function validate(record) {
  const errors = {name: [], file: []};
  const data = record.get('data').toJS();

  if (!data.name) errors.name.push('empty');
  if (!data.file) errors.file.push('empty');

  return {errors, valid: !Object.values(errors).some(arr => arr.length)};
}

export default function ContactModel(Observables) {
  return (
    Rx.Observable.concat(
      Observables.Contact.initialize.map(createEmpty),
      Rx.Observable.merge(
        Observables.Contact.post.map(() => ({state: 'saving'})),
        Observables.Contact.postSucceeded.map(createEmpty),
        Observables.Contact.postFailed.map(({message}) => ({state: 'failed', message})),
        Observables.Contact.update
      )
    )
      .scan((current, delta) => {
        const merged = current.mergeDeep(delta).set('timestamp', new Date());
        return merged.merge(validate(merged));
      })
  );
}
