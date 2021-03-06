import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper, Slider } from '../../components';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { BaseBlockProps } from '../../types/block';
import styles from './SliderBlock.module.scss';

graphql`
    fragment SliderBlock_content on SliderRecord {
        id
        textAlign
        autoplay
        interval
        banners {
            id
            image {
                ...appImageFragment @relay(mask: false)
            }
            video {
                ...appVideoFragment @relay(mask: false)
            }
            headline
            description
            textAlign
        }
    }
`;

function SliderBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'SliderBlock'} className={styles.wrapper} {...rest}>
            <Slider {...content} />
        </BlockWrapper>
    );
}

BlockRegistry.set('SliderBlock', SliderBlock);
