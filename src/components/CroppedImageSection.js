import React, {Component} from 'react';

class CroppedImageSection extends Component {
    scale(options) {
        let scale = options.scale || Math.min(options.maxWidth/options.width, options.maxHeight/options.height);

        scale = Math.min(scale, 100);

        return {
            scale: scale,
            width: options.width * scale,
            height: options.height * scale
        };
    }

    calcCssCrop(crop) {
        let imageWidthUnit = crop.originalWidth / 100;
        let imageHeightUnit = crop.originalHeight / 100;
        let viewportWidth = imageWidthUnit * crop.width;
        let viewportHeight = imageHeightUnit * crop.height;
        let scaledViewport = this.scale({
            width: viewportWidth,
            height: viewportHeight,
            maxWidth: crop.maxWidth,
            maxHeight: crop.maxHeight
        });
        let scaledImage = this.scale({
            scale: scaledViewport.scale,
            width: crop.originalWidth,
            height: crop.originalHeight
        });
        imageWidthUnit = scaledImage.width / 100;
        imageHeightUnit = scaledImage.height / 100;

        let imageMLeft = -1 * Math.abs(imageWidthUnit * crop.x);
        let imageMTop = -1 * Math.abs(imageHeightUnit * crop.y);

        return {
            image: {
                width: scaledImage.width,
                height: scaledImage.height,
                marginLeft: imageMLeft,
                marginTop: imageMTop
            },
            viewport: {
                width: scaledViewport.width,
                height: scaledViewport.height
            },
            originalCrop: crop
        };
    }
    renderMessage() {
        return (
            <h4>You'll see the preview crop in this area</h4>
        );
    }

    renderCroppedImage() {
        let crop = this.props.crop;
        crop.originalWidth = this.props.width;
        crop.originalHeight = this.props.height;
        crop.maxWidth = this.props.maxWidth;
        if(crop.aspect) {
                crop.maxHeight = crop.maxWidth / crop.aspect;
        } else {
            crop.maxHeight = crop.maxWidth;
        }

        crop = this.calcCssCrop(crop);

        let { viewport, image } = crop;
        return (
            <div className="croppedArea" style={{
                maxWidth: viewport.width,
                height: viewport.height,
                overflow: "hidden"
            }}>
            <img src={ this.props.img } style={{
                width: image.width + "px",
                height: image.height + "px",
                marginLeft: image.marginLeft + "px",
                marginTop: image.marginTop + "px"
            }} />
            </div>
        );
    }

    render() {
        return (
            <section className="is-green">
                {
                    !this.props.crop ? this.renderMessage() : this.renderCroppedImage()
                }
            </section>
        );
    }
}

export default CroppedImageSection;
