import React from "react";
import ImageDrop from "../ImageDrop/ImageDrop";
import Base from "../Base";
import LoadingBar from "../LoadingBar/LoadingBar"
import Paper from "../Paper/Paper";


class NewCard extends Base {
  constructor(props) {
    super(props);

    this.state = {
      waitingForLogin: false,
      submitPressed: false,
      loadingEntered: false
    };
  }

  componentDidMount() {
    this.refs.name.getDOMNode().focus();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.waitingForLogin && nextProps.identity.get('accessToken')) {
      this.save();
      this.setState({waitingForLogin: false, loadingEntered: true});
    }
  }

  isDisabled() {
    return this.props.contact.get('state') == 'saving';
  }

  render() {
    const contact = this.props.contact.toJS();

    const image = contact.data.file && contact.data.file.dataURL &&
      <div className={this.c("image")} style={{backgroundImage: `url(${contact.data.file.dataURL})`}} />;

    const progress = contact.state == "saving" &&
      <LoadingBar className={this.c("loading", {"loading-entered": this.state.loadingEntered})} />;

    const message = contact.message &&
      <div className={this.c("message")}>{contact.message}</div>

    return (
      <Paper className={this.getComponentClasses()}>
        <div className={this.c("inner")}>
          {message}
          <div className={this.c("image-selector")}>
            {image}
            <ImageDrop className={this.c("dropzone", {'error': this.hasError('file')})} onDrop={this.onDrop.bind(this)} accept="image/jpeg">
              {!image && <div className={this.c("dropzone-message")}>Drop a face here, or click to select one.</div>}
            </ImageDrop>
          </div>
          <div>
            <input className={this.c("name", {'error': this.hasError('name')})} onChange={this.onChangeName.bind(this)} disabled={this.isDisabled()} placeholder="Name to remember" value={contact.data.name} ref="name" />
            <button className={this.c("submit")} onClick={this.onSubmitContact.bind(this)} disabled={this.isDisabled()}>
              {this.props.identity.get('accessToken') ? 'Remind me!' : 'Login and remind me!'}
            </button>
          </div>
        </div>

        {progress}
      </Paper>
    );
  }

  hasError(prop) {
    return this.state.submitPressed && this.props.contact.get('errors').get(prop).size;
  }

  onChangeName(e) {
    this.context.Actions.Contact.update({name: event.target.value});
  }

  onDrop(files) {
    // Our Dropzone component doesn't support
    if (this.isDisabled()) return;

    this.context.Actions.Contact.update({file: null});

    const file = files[0];

    if (!file.type.match('image.*')) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      file.dataURL = reader.result;
      this.context.Actions.Contact.update({file: file});
    };
    reader.readAsDataURL(file);
  }

  onSubmitContact() {
    if (!this.submitPressed && !this.props.contact.get('valid')) {
      this.setState({submitPressed: true});
    }
    else if (!this.props.identity.get('accessToken')) {
      this.setState({waitingForLogin: true});
      this.context.Actions.Identity.startForegroundLogin();
    }
    else {
      this.save();
      setTimeout(() => {this.setState({loadingEntered: true})}, 50);
    }
  }

  // Use a separate save method, so we can call it directly from the save
  // button, or when logged in
  save() {
    if (this.props.contact.get('valid')) this.context.Actions.Contact.post();
  }
}

NewCard.contextTypes = {
  Actions: React.PropTypes.object
};

export default NewCard;
