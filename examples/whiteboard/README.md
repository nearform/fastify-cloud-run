# Fastify WebSocket Whiteboard

This Fastify WebSocket Whiteboard uses websockets to send and receive message to draw line on the whiteboard.

It is provided for testing Web sockets capabilities on Cloud Run.

## Testing locally

1. Check out this repository and navigate to the ws directory

1. Start the ws server locally:

```sh
npm install
npm start 
```

1. Open the index.html from this folder as it connects to the ws server

## Verifying whiteboard ws implementation

1. After the server starts and you open multiple instances of the html page 

1. Draw a line in one of the opened instaces and observe how the lines get drawn on the others too
