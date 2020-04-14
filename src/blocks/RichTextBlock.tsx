import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { useFragment } from 'relay-hooks/lib';
import { BlockWrapper } from '../components';
import { RichText } from '../components';
import BlockFactory from '../lib/blocks/BlockFactory';
import { BaseBlockProps } from '../types/block';
import styles from './RichTextBlock.module.scss';

graphql`
    fragment RichTextBlock_content on RichTextRecord {
        id
        text
    }
`;

function RichTextBlock({ content, ...rest }: BaseBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const { text } = content;

    return (
        <BlockWrapper type={'RichTextBlock'} className={styles.wrapper} {...rest}>
            <RichText content={text} />
        </BlockWrapper>
    );
}

BlockFactory.set('RichTextBlock', RichTextBlock);
