import {OPENAI_API_KEY, OPENAI_API_URL} from '@config';
import {MutationFunction} from '@tanstack/react-query';
import ky from 'ky';

interface ChatGPTRequest {
  message: string;
  model?: string;
}

interface ChatGPTResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const getAppInfo: MutationFunction<ChatGPTResponse, ChatGPTRequest> = async (data: ChatGPTRequest) => {
  const {message, model = 'gpt-3.5-turbo'} = data;

  try {
    const response = await ky
      .post(`${OPENAI_API_URL}/chat/completions`, {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        json: {
          model,
          messages: [
            {
              role: 'user',
              content: message,
            },
          ],
          max_tokens: 150,
          temperature: 0.7,
        },
      })
      .json<ChatGPTResponse>();

    return response;
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    throw error;
  }
};

export const AppServices = {
  getAppInfo,
};
