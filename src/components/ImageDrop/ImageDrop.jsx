import React from "react";
import Base from "../Base";

class ImageDrop extends Base {
  constructor() {
    super();
    this.state = {isDragActive: false};
  }

  onDragLeave(e) {
    this.setState({isDragActive: false});
  }

  onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";

    this.setState({isDragActive: true});
  }

  onDrop(e) {
    e.preventDefault();

    this.setState({isDragActive: false});

    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    
    files[0].preview = URL.createObjectURL(files[0]);
    
    if (this.props.onDrop) {
      this.props.onDrop(files, e);
    }
  }

  render() {
    return (
      <label
        className={this.getComponentClasses({active: this.state.isDragActive})}
        onDragLeave={this.onDragLeave.bind(this)}
        onDragOver={this.onDragOver.bind(this)}
        onDrop={this.onDrop.bind(this)}>
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

ImageDrop.propTypes = {
  onDrop: React.PropTypes.func.isRequired,
  accept: React.PropTypes.string
};

export default ImageDrop;
