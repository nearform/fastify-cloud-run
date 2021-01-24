# Fastify WebSocket Whiteboard

This Fastify WebSocket Whiteboard uses websockets to send and receive message to draw line on the whiteboard.

It is provided for testing Web sockets capabilities on Cloud Run.

## Deploying to Cloud Run

You can use the `gcloud` SDK:

```sh
git clone https://github.com/nearform/fastify-cloud-run.git
cd fastify-cloud-run/whiteboard
gcloud beta run deploy fastify-websocket-whiteboard --source=.
```

> You may need to specify additional options to the command based on how your Cloud Shell is configured

**Cleanup:** Remove the `fastify-websocket-whiteboard` Service you deployed from Cloud Run
using the [Cloud Console](https://console.cloud.google.com/run).

## Testing locally

1. Start the local server locally:

   ```sh
   npm install
   npm start
   ```

1. Open a browser window and navigate to http://localhost:3000

## Verifying whiteboard websocket implementation

Open multiple instances of the application in different browser windows and check that drawing on one window sends the lines to all other open windows
