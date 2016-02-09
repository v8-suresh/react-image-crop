import React, {Component} from 'react';
import UploadIcon from './UploadIcon';

if (!File.prototype.slice) {
  var newSlice = File.prototype.mozSlice || File.prototype.webkitSlice;
  if ( newSlice ) {
    File.prototype.slice = (function() {
      return function(startingByte, length) {
        return newSlice.call( this, startingByte, length + startingByte );
      };
    })();
  } else {
    throw "File.slice() not supported.";
  }
}

class FileUploader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            draggingOver: false
        };
        this.setDraggingOn = this.setDraggingOn.bind(this);
        this.setDraggingOff = this.setDraggingOff.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onFileUploadChange = this.onFileUploadChange.bind(this);
    }

    componentDidMount() {
        this.refs.fileUploader.addEventListener('drag', this.cancelEvent);
        this.refs.fileUploader.addEventListener('dragstart', this.cancelEvent);
        this.refs.fileUploader.addEventListener('dragend', this.setDraggingOff);
        this.refs.fileUploader.addEventListener('dragover', this.setDraggingOn);
        this.refs.fileUploader.addEventListener('dragenter', this.setDraggingOn);
        this.refs.fileUploader.addEventListener('dragleave', this.setDraggingOff);
        this.refs.fileUploader.addEventListener('drop', this.onDrop);
        this.refs.fileUpload.addEventListener('change', this.onFileUploadChange);
    }

    componentWillUnmount() {
        this.refs.fileUploader.removeEventListener('drag', this.cancelEvent);
        this.refs.fileUploader.removeEventListener('dragstart', this.cancelEvent);
        this.refs.fileUploader.removeEventListener('dragend', this.setDraggingOff);
        this.refs.fileUploader.removeEventListener('dragover', this.setDraggingOn);
        this.refs.fileUploader.removeEventListener('dragenter', this.setDraggingOn);
        this.refs.fileUploader.removeEventListener('dragleave', this.setDraggingOff);
        this.refs.fileUploader.removeEventListener('drop', this.onDrop);
        this.refs.fileUpload.removeEventListener('change', this.onFileUploadChange);
    }

    setDraggingOn(e) {
        this.cancelEvent(e);
        this.setState({
            draggingOver: true
        });
    }

    setDraggingOff(e) {
        this.cancelEvent(e);
        this.setState({
            draggingOver: false
        });
    }

    onDrop(e) {
        this.cancelEvent(e);
        this.setState({
            draggingOver: false
        });
        this.uploadFileList(e.dataTransfer.files);
    }

    cancelEvent(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    onFileUploadChange(e) {
        this.uploadFileList(e.target.files);
        e.target.value = null;
    }

    uploadFileList(files) {
        let file = files[0];
        let reader = new FileReader();
        let buffer, int32View;
        reader.onload = (e) => {
            buffer = e.target.result;
            int32View = new Int32Array(buffer);
            switch(int32View[0]) {
                case 1196314761:
                    file.verified_type = "image/png";
                    break;
                case 944130375:
                    file.verified_type = "image/gif";
                    break;
                case -1370862270:
                case 544099650:
                    file.verified_type = "image/bmp";
                    break;
                case -520103681:
                    file.verified_type = "image/jpeg";
                    break;
                default:
                    console.warn(`[${int32View[0]}] Couldn't verify type for ${file.type}`);
            }
            if(file.verified_type) {
                if(this.props.onFileChange) {
                    this.props.onFileChange(file);
                }
            }
        };
        reader.readAsArrayBuffer(file.slice(0, 4));
    }

    renderInputBox() {
        let style;
        let message;
        if(this.state.draggingOver) {
            message = <label className="fileUploader__label" htmlFor="file"><strong>Drop the file</strong> to start the upload.</label>;
        } else {
            message = <label className="fileUploader__label" htmlFor="file"><strong>Select the file</strong> or drag it.</label>;
        }
        return (
            <div style={style} className="fileUploader__inputBox">
                <input ref="fileUpload" className="fileUploader__file" type="file" id="file" />
                <UploadIcon className="fileUploader__icon"/>
                { message }
            </div>
        );
    }

    render() {
        let className="fileUploader";
        if(this.state.draggingOver) {
            className += " fileUploader--dragging";
        }
        return (
            <div ref="fileUploader" className={className}>
                { this.renderInputBox() }
            </div>
        );
    }
}

export default FileUploader;
