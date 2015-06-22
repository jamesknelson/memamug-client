import Rx from "rx";

export default (Actions, Replayables) => ({
  initialize() {
    this();
  },

  update(data) {
    this({data});
  },

  post() {
    Rx.Observable.combineLatest(
      Replayables.Identity,
      Replayables.Contact,
      (identity, contact) => ({identity, contact})
    )
      .take(1)
      .subscribe(({identity, contact}) => {
        const data = contact.get('data').toJS();

        const body = {
          displayName: data.name,
          photosAttributes: [{
            status: 'active',
            sourceType: 'uploaded',
            imageContentType: data.file.type,
            imageOriginalFilename: data.file.name,
            imageBase64: data.file.dataURL
          }]
        };

        fetch('/api/v1/contacts', {
          method: 'post',
          headers: {
            'Authorization': `Token token=${identity.get('accessToken')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
          .then(response => {
            if (response.ok) {
              response
                .json()
                .then(Actions.Contact.postSucceeded)
                .catch(() => Actions.Contact.postFailed('Something went wrong.'));
            }
            else if (response.status == 403 || response.status == 401) {
              Actions.Identity.unauthorize();
            }
            else {
              response
                .json()
                .then((errors) => {
                  let message;

                  if (errors['photos.imageContentType']) {
                    message = "Please submit a photo.";
                  }
                  else if (errors['photos.imageFileSize']) {
                    message = "Please submit an image less than 2MB in size.";
                  }
                  else {
                    message = "Something went wrong while processing your contact. Please try a different name/photo."
                  }

                  Actions.Contact.postFailed(message);
                })
                .catch(() => Actions.Contact.postFailed('Something went wrong.'));
            }
          })
          .catch(err => Actions.Contact.postFailed('Something went wrong.'));
      });

    this();
  },

  postSucceeded({data, included}) {
    this(Object.assign(
      {},
      data.attributes,
      {id: data.id, photo: Object.assign({}, included[0].attributes, {id: included[0].id})}
    ));
  },

  postFailed(message) {
    this({message});
  }
})
