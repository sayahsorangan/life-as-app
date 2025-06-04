// Test script to verify OpenAI integration
// Run this with: npx ts-node scripts/test-openai.ts

import OpenAIService from '../app/lib/react-query/service/openai';

async function testOpenAI() {
  console.log('🤖 Testing OpenAI Integration...\n');

  try {
    // Test simple chat
    console.log('1. Testing Chat Completion...');
    const chatResponse = await OpenAIService.chat(
      'Say hello in a creative way!',
      'gpt-3.5-turbo',
      'You are a friendly assistant',
    );
    console.log('✅ Chat Response:', chatResponse);
    console.log('');

    // Test embeddings
    console.log('2. Testing Text Embeddings...');
    const embeddings = await OpenAIService.createEmbedding('Hello world', 'text-embedding-ada-002');
    console.log('✅ Embedding Vector Length:', embeddings[0]?.length);
    console.log('');

    console.log('🎉 All tests passed! OpenAI integration is working.');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testOpenAI();
