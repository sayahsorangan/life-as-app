import {openaiInstance} from '@lib/ky/openai';

// Types for OpenAI API
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string | string[];
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: ChatMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ImageGenerationRequest {
  prompt: string;
  model?: string;
  n?: number;
  quality?: 'standard' | 'hd';
  response_format?: 'url' | 'b64_json';
  size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
  style?: 'vivid' | 'natural';
  user?: string;
}

export interface ImageGenerationResponse {
  created: number;
  data: {
    url?: string;
    b64_json?: string;
    revised_prompt?: string;
  }[];
}

// OpenAI Service Class
export class OpenAIService {
  // Chat Completions
  static async createChatCompletion(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
    try {
      const response = await openaiInstance.post('v1/chat/completions', {
        json: request,
      });

      return response.json<ChatCompletionResponse>();
    } catch (error) {
      console.error('OpenAI Chat Completion Error:', error);
      throw error;
    }
  }

  // Simple chat method for quick usage
  static async chat(message: string, model: string = 'gpt-3.5-turbo', systemPrompt?: string): Promise<string> {
    const messages: ChatMessage[] = [];

    if (systemPrompt) {
      messages.push({
        role: 'system',
        content: systemPrompt,
      });
    }

    messages.push({
      role: 'user',
      content: message,
    });

    const response = await this.createChatCompletion({
      model,
      messages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || '';
  }

  // Image Generation
  static async generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    try {
      const response = await openaiInstance.post('v1/images/generations', {
        json: {
          model: 'dall-e-3',
          ...request,
        },
      });

      return response.json<ImageGenerationResponse>();
    } catch (error) {
      console.error('OpenAI Image Generation Error:', error);
      throw error;
    }
  }

  // Simple image generation method
  static async createImage(
    prompt: string,
    size: ImageGenerationRequest['size'] = '1024x1024',
    quality: ImageGenerationRequest['quality'] = 'standard',
  ): Promise<string> {
    const response = await this.generateImage({
      prompt,
      size,
      quality,
      n: 1,
    });

    return response.data[0]?.url || '';
  }

  // Text Embeddings
  static async createEmbedding(text: string | string[], model: string = 'text-embedding-ada-002'): Promise<number[][]> {
    try {
      const response = await openaiInstance.post('v1/embeddings', {
        json: {
          model,
          input: text,
        },
      });

      const result = await response.json<{
        data: {embedding: number[]}[];
      }>();

      return result.data.map(item => item.embedding);
    } catch (error) {
      console.error('OpenAI Embedding Error:', error);
      throw error;
    }
  }

  // Audio Transcription
  static async transcribeAudio(audioFile: File | Blob, model: string = 'whisper-1'): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', audioFile);
      formData.append('model', model);

      const response = await openaiInstance.post('v1/audio/transcriptions', {
        body: formData,
      });

      const result = await response.json<{text: string}>();
      return result.text;
    } catch (error) {
      console.error('OpenAI Transcription Error:', error);
      throw error;
    }
  }
}

export default OpenAIService;
