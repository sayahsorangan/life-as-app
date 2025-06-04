import ky from 'ky';

import {API_HOST} from '@config';

import {authAfterResponseHooks, authBeforeResponseHooks} from './hooks';

const kyInstance = ky.create({
  headers: {
    'cache-control': 'no-cache',
    'access-control-allow-origin': '*',
  },
});

const base = kyInstance.extend({
  prefixUrl: API_HOST,
  timeout: 6e4 * 4,
  hooks: {
    afterResponse: [authAfterResponseHooks],
    beforeRequest: [authBeforeResponseHooks],
  },
  retry: {
    limit: 2,
    methods: ['get', 'post', 'put', 'delete'],
    statusCodes: [408, 500],
  },
});

const Api = base.extend({});

export {Api};
