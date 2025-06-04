import ky from 'ky';

import {OPENAI_API_KEY, OPENAI_API_URL} from '@config';

const openaiInstance = ky.create({
  prefixUrl: OPENAI_API_URL,
  headers: {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
  timeout: 6e4 * 2, // 2 minutes timeout for OpenAI requests
  retry: {
    limit: 2,
    methods: ['post'],
    statusCodes: [408, 500, 502, 503, 504],
  },
});

export {openaiInstance};
