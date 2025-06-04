import {useMutation} from '@tanstack/react-query';

import OpenAIService, {ChatCompletionRequest, ImageGenerationRequest} from '../service/openai';

// Query Keys
export const openaiKeys = {
  all: ['openai'] as const,
  chat: () => [...openaiKeys.all, 'chat'] as const,
  image: () => [...openaiKeys.all, 'image'] as const,
  embedding: () => [...openaiKeys.all, 'embedding'] as const,
};

// Chat Completion Hook
export const useChatCompletion = () => {
  return useMutation({
    mutationFn: (request: ChatCompletionRequest) => OpenAIService.createChatCompletion(request),
    onError: error => {
      console.error('Chat completion failed:', error);
    },
  });
};

// Simple Chat Hook
export const useChat = () => {
  return useMutation({
    mutationFn: ({
      message,
      model = 'gpt-3.5-turbo',
      systemPrompt,
    }: {
      message: string;
      model?: string;
      systemPrompt?: string;
    }) => OpenAIService.chat(message, model, systemPrompt),
    onError: error => {
      console.error('Chat failed:', error);
    },
  });
};

// Image Generation Hook
export const useImageGeneration = () => {
  return useMutation({
    mutationFn: (request: ImageGenerationRequest) => OpenAIService.generateImage(request),
    onError: error => {
      console.error('Image generation failed:', error);
    },
  });
};

// Simple Image Creation Hook
export const useCreateImage = () => {
  return useMutation({
    mutationFn: ({
      prompt,
      size = '1024x1024',
      quality = 'standard',
    }: {
      prompt: string;
      size?: ImageGenerationRequest['size'];
      quality?: ImageGenerationRequest['quality'];
    }) => OpenAIService.createImage(prompt, size, quality),
    onError: error => {
      console.error('Image creation failed:', error);
    },
  });
};

// Embedding Hook
export const useCreateEmbedding = () => {
  return useMutation({
    mutationFn: ({text, model = 'text-embedding-ada-002'}: {text: string | string[]; model?: string}) =>
      OpenAIService.createEmbedding(text, model),
    onError: error => {
      console.error('Embedding creation failed:', error);
    },
  });
};

// Audio Transcription Hook
export const useAudioTranscription = () => {
  return useMutation({
    mutationFn: ({audioFile, model = 'whisper-1'}: {audioFile: File | Blob; model?: string}) =>
      OpenAIService.transcribeAudio(audioFile, model),
    onError: error => {
      console.error('Audio transcription failed:', error);
    },
  });
};
