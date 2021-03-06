import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { BlockWrapper, GoogleMap } from '../../components';
import BlockRegistry from '../../lib/blocks/BlockRegistry';
import { BaseBlockProps } from '../../types/block';
import styles from './MapBlock.module.scss';

graphql`
    fragment MapBlock_content on MapRecord {
        id
        bubbleText
        gps {
            latitude
            longitude
        }
    }
`;

function MapBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper tooltip={'MapBlock'} className={styles.wrapper} {...rest}>
            <GoogleMap
                isMarkerShown
                latitude={content.gps ? content.gps.latitude : 0}
                longitude={content.gps ? content.gps.longitude : 0}
                bubbleText={content.bubbleText}
            />
        </BlockWrapper>
    );
}

BlockRegistry.set('MapBlock', MapBlock);
