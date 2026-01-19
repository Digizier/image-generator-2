import { WebhookResponse } from '../types';

const WEBHOOK_URL = 'https://digizier11.app.n8n.cloud/webhook-test/123';

/**
 * Sends the text prompt to the N8N webhook and expects an image URL in response.
 */
export const generateImageFromWebhook = async (text: string): Promise<string> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // We send the text under the key "text" or "prompt". 
      // Standardizing on "text" based on typical webhook expectations.
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Webhook error: ${response.status} ${response.statusText}`);
    }

    const data: WebhookResponse = await response.json();

    if (!data.image) {
      throw new Error('Invalid response structure: "image" property missing.');
    }

    return data.image;
  } catch (error) {
    console.error('Image generation failed:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while contacting the webhook.');
  }
};