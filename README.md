# lineBot-serverless-lambda
Serverless frameworkを使ってAWS Lambda(API Gateway)を作成します。
TypeScriptで書いているので、 [@line/bot-sdk]()の型が出てきて快適にコードが書けます。

## 実行方法

### install
```
git clone https://github.com/merutin/lineBot-serverless-lambda
cd lineBot-serverless-lambda
npm install
```

### localでの実行
serverless.tsの22行目あたりにある `CHANNEL_ACCESS_TOKEN` と `CHANNEL_SECRET` をそれぞれLINEのMessagingAPI設定とチャンネル基本設定から取得して設定してください。

```
npm run dev
```

serverless offlineが、http://localhost:3000/local で起動します。
LINEのMessaging APIとして設定する場合は[ngrok](https://ngrok.com/)などを利用して外部からアクセスできるように設定してください。

## deploy
`npm run deploy:dev` でdev環境に、 `npm run deploy:prod` でprod環境を作成してデプロイします。
先にAWSのconfigを設定してから実行してください。

```
npm run deploy:dev
```