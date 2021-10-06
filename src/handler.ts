import "source-map-support/register";

import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import {
  Client,
  ClientConfig,
  LINE_SIGNATURE_HTTP_HEADER_NAME,
  validateSignature,
  WebhookEvent,
} from "@line/bot-sdk";

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
  channelSecret: process.env.CHANNEL_SECRET,
};

export const lineTest: APIGatewayProxyHandlerV2<string> = async (event) => {
  const body: WebhookEvent = JSON.parse(event.body);

  const signature =
    event.headers[LINE_SIGNATURE_HTTP_HEADER_NAME] ??
    // 検証は何故かheaderの値が違う
    event.headers["X-Line-Signature"];

  if (!validateSignature(event.body, clientConfig.channelSecret, signature)) {
    console.log("invalid access");
    return "NG";
  }

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
