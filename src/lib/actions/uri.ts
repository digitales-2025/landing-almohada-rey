import { baseUri } from '../../actions/action-setup';
import { RequestUri } from './actionOperations';

export const uri = (requestUri: RequestUri) => {
    return `${baseUri}/${requestUri}`;
};
