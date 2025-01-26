"use client";

import { useEffect } from "react";

interface WebSocketMessage {
  [key: string]: any;
}

export const useWebSocket = (
  url: string,
  onMessage: (data: WebSocketMessage) => void
): void => {
  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    // ws.onerror = (error: Event) => {
    //   console.error("WebSocket error:", error);
    // };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    return () => {
      ws.close();
    };
  }, [url, onMessage]);
};
