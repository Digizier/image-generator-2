export interface WebhookResponse {
  image: string;
}

export interface ImageHistoryItem {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: number;
}

export interface ApiError {
  message: string;
}