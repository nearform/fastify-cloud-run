# Fastify on Google Cloud Run

This repository contains examples of running a Fastify server on Google Cloud Run using the new features announced in [Introducing WebSockets, HTTP/2 and gRPC bidirectional streams for Cloud Run
](https://cloud.google.com/blog/products/serverless/cloud-run-gets-websockets-http-2-and-grpc-bidirectional-streams).

- [http2](http2) shows how to run Fastify over HTTP/2
- [sse](sse) shows how to send Server Sent Events over HTTP/2
- [ws](ws) shows how to run a Web sockets server
- [whiteboard](whiteboard) a more complex example of using WebSockets to implement a collaborative whiteboard
