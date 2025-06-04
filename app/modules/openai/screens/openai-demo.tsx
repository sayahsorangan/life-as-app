import {useState} from 'react';
import {Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Box, Text} from '@app/themes';
import {useChat, useCreateImage} from '@lib/react-query/hooks/openai';

export default function OpenAIDemo() {
  const [chatInput, setChatInput] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const chatMutation = useChat();
  const imageMutation = useCreateImage();

  const handleChat = async () => {
    if (!chatInput.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }

    try {
      const response = await chatMutation.mutateAsync({
        message: chatInput,
        model: 'gpt-3.5-turbo',
        systemPrompt: 'You are a helpful assistant.',
      });
      setChatResponse(response);
    } catch (error) {
      Alert.alert('Error', 'Failed to get chat response');
    }
  };

  const handleImageGeneration = async () => {
    if (!imagePrompt.trim()) {
      Alert.alert('Error', 'Please enter an image prompt');
      return;
    }

    try {
      const response = await imageMutation.mutateAsync({
        prompt: imagePrompt,
        size: '1024x1024',
        quality: 'standard',
      });
      setImageUrl(response);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate image');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <Box padding="md" backgroundColor="white">
          <Text variant="h_2_medium" textAlign="center" marginBottom="lg">
            OpenAI Demo
          </Text>

          {/* Chat Section */}
          <Box marginBottom="xxl">
            <Text variant="h_4_medium" marginBottom="md">
              Chat with GPT
            </Text>

            <Box backgroundColor="primary_light" padding="md" borderRadius="md" marginBottom="md">
              <Text marginBottom="xs">Enter your message:</Text>
              <TextInput
                style={styles.textInput}
                value={chatInput}
                onChangeText={setChatInput}
                placeholder="Type your message here..."
                multiline
                numberOfLines={3}
              />
            </Box>

            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleChat}
              disabled={chatMutation.isPending}
            >
              <Text style={styles.buttonText}>{chatMutation.isPending ? 'Sending...' : 'Send Message'}</Text>
            </TouchableOpacity>

            {chatResponse && (
              <Box backgroundColor="secondary_light" padding="md" borderRadius="md" marginTop="md">
                <Text variant="body_helper_medium" color="grey_dark" marginBottom="xs">
                  Response:
                </Text>
                <Text>{chatResponse}</Text>
              </Box>
            )}
          </Box>

          {/* Image Generation Section */}
          <Box marginBottom="xxl">
            <Text variant="h_4_medium" marginBottom="md">
              Generate Image with DALL-E
            </Text>

            <Box backgroundColor="primary_light" padding="md" borderRadius="md" marginBottom="md">
              <Text marginBottom="xs">Enter image prompt:</Text>
              <TextInput
                style={styles.textInput}
                value={imagePrompt}
                onChangeText={setImagePrompt}
                placeholder="Describe the image you want to generate..."
                multiline
                numberOfLines={3}
              />
            </Box>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleImageGeneration}
              disabled={imageMutation.isPending}
            >
              <Text style={styles.buttonText}>{imageMutation.isPending ? 'Generating...' : 'Generate Image'}</Text>
            </TouchableOpacity>

            {imageUrl && (
              <Box backgroundColor="secondary_light" padding="md" borderRadius="md" marginTop="md">
                <Text variant="body_helper_medium" color="grey_dark" marginBottom="xs">
                  Generated Image URL:
                </Text>
                <Text fontSize={12} color="primary">
                  {imageUrl}
                </Text>
                {/* You can add an Image component here to display the image */}
              </Box>
            )}
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#3B5BE4',
  },
  secondaryButton: {
    backgroundColor: '#2BBA99',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
