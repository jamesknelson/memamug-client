import React, {Component, PropTypes} from "react";
import {base} from "../../utils/decorators";


@base
export default class ImageDrop extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    accept: PropTypes.string,
  }


  constructor() {
    super();
    this.state = {isDragActive: false};
  }

  @base.on('dragLeave')
  onDragLeave(e) {
    this.setState({isDragActive: false});
  }

  @base.on('dragOver')
  onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";

    this.setState({isDragActive: true});
  }

  @base.on('drop')
  onDrop(e) {
    e.preventDefault();

    this.setState({isDragActive: false});

    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    
    files[0].preview = URL.createObjectURL(files[0]);

    this.props.onSelect(files, e);
  }

  render() {
    const classes = {
      active: this.state.isDragActive,
    }

    return (
      <label {...this.base({classes})}>
        <input
          type="file"
          onChange={this.onDrop.bind(this)}
          accept={this.props.accept}
          style={{display: 'none'}} />
        {this.props.children}
      </label>  
    );
  }
}
