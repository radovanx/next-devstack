import React, { ReactElement } from 'react';
import { fetchQuery, graphql } from 'react-relay';
import { BlockWrapper, NewsList } from '../../components';
import BlockFactory from '../../lib/blocks/BlockFactory';
import { BaseBlockProps, StaticBlockContext } from '../../types/block';
import { NewsListBlockQuery, NewsListBlockQueryResponse } from './__generated__/NewsListBlockQuery.graphql';
import styles from './NewsListBlock.module.scss';

type NewsListBlockProps = BaseBlockProps & NewsListBlockQueryResponse;

const query = graphql`
    query NewsListBlockQuery($locale: SiteLocale, $limit: IntType, $offset: IntType) {
        allNews(locale: $locale, orderBy: dateFrom_DESC, first: $limit, skip: $offset) {
            id
            dateFrom
            title
            slug
            perex
            image {
                url
                alt
            }
            tags {
                id
                title
            }
        }
    }
`;

graphql`
    fragment NewsListBlock_content on NewsListRecord {
        headline
    }
`;

function NewsListBlock({ content, allNews, ...rest }: NewsListBlockProps): ReactElement<BaseBlockProps, 'BaseBlock'> {
    const { headline } = content;

    return (
        <BlockWrapper tooltip={'NewsListBlock'} className={styles.wrapper} {...rest}>
            <NewsList headline={headline} items={allNews} />
        </BlockWrapper>
    );
}

NewsListBlock.getStaticProps = async ({
    environment,
    locale,
}: StaticBlockContext): Promise<NewsListBlockQueryResponse> => {
    return fetchQuery<NewsListBlockQuery>(environment, query, {
        locale,
        limit: 3,
        offset: 0,
    });
};

BlockFactory.set('NewsListBlock', NewsListBlock);
