# OpenAI Integration Guide

This project includes a complete OpenAI API integration with your API key already configured.

## Available Features

### 1. Chat Completions (GPT)

- Text generation and conversation
- System prompts support
- Customizable model selection

### 2. Image Generation (DALL-E)

- Text-to-image generation
- Multiple size options
- Quality settings

### 3. Text Embeddings

- Convert text to vector embeddings
- Useful for semantic search and similarity

### 4. Audio Transcription (Whisper)

- Convert audio files to text
- Multiple language support

## Usage Examples

### Simple Chat

```typescript
import OpenAIService from '@lib/react-query/service/openai';

// Simple chat
const response = await OpenAIService.chat('Hello, how are you?', 'gpt-3.5-turbo', 'You are a helpful assistant');
console.log(response);
```

### Using React Query Hooks

```typescript
import { useChat, useCreateImage } from '@lib/react-query/hooks/openai';

function MyComponent() {
  const chatMutation = useChat();
  const imageMutation = useCreateImage();

  const handleChat = async () => {
    const response = await chatMutation.mutateAsync({
      message: "Explain quantum physics",
      model: "gpt-3.5-turbo"
    });
  };

  const handleImageGeneration = async () => {
    const imageUrl = await imageMutation.mutateAsync({
      prompt: "A beautiful sunset over mountains",
      size: "1024x1024"
    });
  };

  return (
    // Your component JSX
  );
}
```

### Advanced Chat with Full Options

```typescript
const response = await OpenAIService.createChatCompletion({
  model: 'gpt-4',
  messages: [
    {role: 'system', content: 'You are a helpful assistant.'},
    {role: 'user', content: 'What is the capital of France?'},
  ],
  max_tokens: 150,
  temperature: 0.7,
});
```

### Image Generation

```typescript
// Simple image generation
const imageUrl = await OpenAIService.createImage('A cat wearing a space suit', '1024x1024', 'hd');

// Advanced image generation
const response = await OpenAIService.generateImage({
  prompt: 'A futuristic city at night',
  model: 'dall-e-3',
  size: '1024x1024',
  quality: 'hd',
  style: 'vivid',
});
```

## Demo Screens

Check out these example screens:

- `app/modules/openai/screens/simple-example.tsx` - Basic usage example
- `app/modules/openai/screens/openai-demo.tsx` - Full-featured demo

## Configuration

Your OpenAI API key is configured in `config/env.ts`:

```typescript
export const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY || 'your-api-key-here';
```

## Available Models

### Chat Models

- `gpt-4` - Most capable, higher cost
- `gpt-3.5-turbo` - Fast and cost-effective
- `gpt-4-turbo` - Balance of capability and speed

### Image Models

- `dall-e-3` - Latest and most capable
- `dall-e-2` - Previous generation

### Other Models

- `text-embedding-ada-002` - Text embeddings
- `whisper-1` - Audio transcription

## Error Handling

All service methods include error handling and logging. Errors are automatically caught and logged to the console.

## Rate Limits

The integration includes:

- 2-minute timeout for requests
- Automatic retry on failures (up to 2 times)
- Proper error status code handling

## Security Note

Make sure to keep your API key secure and never commit it to version control in production apps.
