import "./styles/main.scss";

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import FileUploader from './components/FileUploader';
import ImageCropper from './components/ImageCropper';
import CroppedImageSection from './components/CroppedImageSection';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            crop: null,
            previewCrop: null,
            imgWidth: null,
            imgHeight: null,
            previewMaxWidth: 250,
            previewMaxHeight: 250
        };
        this.onFileChange = this.onFileChange.bind(this);
        this.onCropAreaChange = this.onCropAreaChange.bind(this);
    }

    onFileChange(file) {
        let reader = new FileReader();

        reader.onload = (e) => {
            this.preLoadImage(e.target.result);
        };

        reader.readAsDataURL(file);
    }

    preLoadImage(imgUrl) {
        let img = new Image();
        img.onload = (e) => {
            this.setState({
                file: imgUrl,
                imgWidth: e.target.naturalWidth,
                imgHeight: e.target.naturalHeight
            });
        };
        img.src = imgUrl;
    }

    onCropAreaChange(crop) {
        this.setState({
            previewCrop: crop
        });
    }

    render() {
        return (
            <div>
                <section className="header is-orange">
                    <Logo />
                </section>

                <section className="is-gray">
                    <FileUploader onFileChange={ this.onFileChange }/>
                </section>

                <section className="is-blue">
                    <ImageCropper crop={ this.state.crop } file={ this.state.file } onChange={ this.onCropAreaChange }/>
                </section>

                <CroppedImageSection
                                crop={ this.state.previewCrop }
                                img={ this.state.file }
                                width={ this.state.imgWidth }
                                height={ this.state.imgHeight }
                                maxWidth={ this.state.previewMaxWidth }
                                maxHeight={ this.state.previewMaxHeight }
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
