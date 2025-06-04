import {useState} from 'react';
import {Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import {Box, Text} from '@app/themes';
import OpenAIService from '@lib/react-query/service/openai';

export default function SimpleOpenAIExample() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askOpenAI = async () => {
    if (!question.trim()) {
      Alert.alert('Error', 'Please enter a question');
      return;
    }

    setLoading(true);
    try {
      // Simple chat example
      const response = await OpenAIService.chat(
        question,
        'gpt-3.5-turbo',
        'You are a helpful assistant. Provide clear and concise answers.',
      );
      setAnswer(response);
    } catch (error) {
      console.error('OpenAI Error:', error);
      Alert.alert('Error', 'Failed to get response from OpenAI');
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async () => {
    if (!question.trim()) {
      Alert.alert('Error', 'Please enter an image description');
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await OpenAIService.createImage(question, '1024x1024', 'standard');
      setAnswer(`Generated image URL: ${imageUrl}`);
    } catch (error) {
      console.error('OpenAI Image Error:', error);
      Alert.alert('Error', 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} padding="md" backgroundColor="white">
      <Text variant="h_2_medium" textAlign="center" marginBottom="lg">
        OpenAI Integration Test
      </Text>

      <Box marginBottom="md">
        <Text marginBottom="xs">Enter your question or image prompt:</Text>
        <TextInput
          style={styles.textInput}
          value={question}
          onChangeText={setQuestion}
          placeholder="Ask me anything or describe an image..."
          multiline
          numberOfLines={4}
        />
      </Box>

      <Box flexDirection="row" marginBottom="lg" gap="md">
        <TouchableOpacity style={[styles.button, styles.chatButton]} onPress={askOpenAI} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Ask GPT'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.imageButton]} onPress={generateImage} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Generate Image'}</Text>
        </TouchableOpacity>
      </Box>

      {answer && (
        <Box backgroundColor="primary_light" padding="md" borderRadius="md">
          <Text variant="body_helper_medium" color="grey_dark" marginBottom="xs">
            Response:
          </Text>
          <Text>{answer}</Text>
        </Box>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  chatButton: {
    backgroundColor: '#007AFF',
  },
  imageButton: {
    backgroundColor: '#FF6B35',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
