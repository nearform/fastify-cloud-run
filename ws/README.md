# Cloud Run Web sockets + Fastify

This Fastify application serves Web sockets requests.

It is provided for testing Web sockets capabilities on Cloud Run.

## Deploying to Cloud Run

You can use the `gcloud` SDK:

```sh
git clone https://github.com/nearform/fastify-cloud-run.git
cd fastify-cloud-run/ws
gcloud beta run deploy fastify-ws --source=.
```

> You may need to specify additional options to the command based on how your Cloud Shell is configured

**Cleanup:** Remove the `fastify-ws` Service you deployed from Cloud Run
using the [Cloud Console](https://console.cloud.google.com/run).

## Testing locally

1. Check out this repository and navigate to this directory

1. Start the server locally:

   ```sh
   npm install
   npm start
   ```

## Verifying ws

1. After the server starts, make a request using `websockat` or another Web socket client.

   ```sh
   websocat ws://localhost:3000
   ```

   **Note:** If you have deployed on Cloud Run, you can replace
   `localhost:3000` with your Cloud Run service URL and use an online Web socket client like

1. The sample Web socket server works as the echo command, type something in the terminal and it should respond with the same:

   ```text
   hello↵
   hello
   world↵
   world
   ```
