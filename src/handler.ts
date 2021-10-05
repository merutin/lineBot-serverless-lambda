import "source-map-support/register";

import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Client, ClientConfig, WebhookEvent } from "@line/bot-sdk";

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.CHANNEL_SECRET,
};

export const lineTest: APIGatewayProxyHandlerV2<string> = async (event) => {
  const body: WebhookEvent = JSON.parse(event.body);

  // reply only text message
  if (body.type === "message" && body.message.type === "text") {
    const client = new Client(clientConfig);
    await client.replyMessage(body.replyToken, {
      type: "text",
      text: body.message.text,
    });
  }

  return "OK";
};
