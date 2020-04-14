import axios from 'axios';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';
import { Logger } from '../../../services';

export const createRelayEnvironment = (records: RecordMap, rejectErrors: boolean): Environment =>
    new Environment({
        network: Network.create(async (operation, variables) => {
            if (!process.env.DATOCMS_ENDPOINT) {
                throw new Error('No GraphQL endpoint defined!');
            }

            if (!process.env.DATOCMS_API_TOKEN_FULL) {
                throw new Error('No API token!');
            }

            let response;

            try {
                const { data } = await axios(process.env.DATOCMS_ENDPOINT, {
                    data: JSON.stringify({ query: operation.text, variables }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: process.env.DATOCMS_API_TOKEN_FULL,
                    },
                    method: 'POST',
                    responseType: 'json',
                });

                // Relay fetch ignores json.errors, so we have to handle it manually.
                // But only for queries. Mutations are ok.
                if (rejectErrors && data.errors) return Promise.reject(data.errors);
                return data;
            } catch (e) {
                Logger.log('ERROR');
                Logger.log(operation.text?.substr(0, 200), variables);
                Logger.error(e);
            }
        }),
        store: new Store(new RecordSource(records)),
    });
