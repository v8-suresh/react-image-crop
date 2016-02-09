import React, {Component} from 'react';
import ReactCrop from 'react-image-crop';

class ImageCropper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crop: props.crop || {
                x: 25,
                y: 25,
                width: 50,
                height: 50
            }
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(crop) {
        if(this.props.onChange) {
            this.props.onChange(crop);
        }
    }

    renderMessage() {
        return (
            <h3>If you upload a file the cropping area will show up here</h3>
        );
    }

    renderImageCropper() {
        return (
            <div className="ReactCropContainer">
                <ReactCrop
                    crop={ this.state.crop }
                    src={ this.props.file }
                    onImageLoaded={ this.onChange }
                    onComplete={ this.onChange }
                    onChange={ this.onChange }
                    keepSelection={ this.props.keepSelection }
                />
            </div>
        );
    }

    render() {
        if(this.props.file) {
            return this.renderImageCropper();
        }
        return this.renderMessage();
    }
}

export default ImageCropper;
