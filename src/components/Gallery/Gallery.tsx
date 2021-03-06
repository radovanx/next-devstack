import React, { useState } from 'react';
import { Image } from '..';
import Lightbox from 'react-image-lightbox';
import { ImageInterface } from '../../types/app';

interface GalleryProps {
    images: ReadonlyArray<ImageInterface>;
}

export const Gallery = ({ images }: GalleryProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState(0);

    return (
        <>
            {Array.isArray(images) &&
                images.map((image, index) => (
                    <Image
                        key={image.id}
                        image={image}
                        onClick={() => {
                            setIsOpen(true);
                            setActive(index);
                        }}
                    />
                ))}
            {isOpen && (
                <Lightbox
                    mainSrc={images[active].url}
                    nextSrc={active < images.length - 1 ? images[active + 1].url : undefined}
                    prevSrc={active > 0 ? images[active - 1].url : undefined}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => active > 0 && setActive(active - 1)}
                    onMoveNextRequest={() => active < images.length - 1 && setActive(active + 1)}
                />
            )}
        </>
    );
};
