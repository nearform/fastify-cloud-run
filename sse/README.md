# Cloud Run Server Sent Events HTTP/2 + Fastify

This Fastify application serves Server Sent Events requests using only the HTTP/2 cleartext (h2c) protocol (it does not support upgrading from HTTP/1.1).

It is provided for testing end-to-end HTTP/2 capabilities on Cloud Run.

## Deploying to Cloud Run

You can use the `gcloud` SDK:

```sh
git clone https://github.com/nearform/fastify-cloud-run.git
cd fastify-cloud-run/sse
gcloud beta run deploy fastify-sse --use-http2 --source=.
```

> You may need to specify additional options to the command based on how your Cloud Shell is configured

**Cleanup:** Remove the `fastify-sse` Service you deployed from Cloud Run
using the [Cloud Console](https://console.cloud.google.com/run).

## Testing locally

1. Check out this repository and navigate to this directory

1. Start the server locally:

   ```sh
   npm install
   npm start
   ```

## Verifying sse over h2c

1.  After the server starts, make a request using `curl` and use
    `--http2-prior-knowledge` to prevent upgrading from HTTP/1.1 (which is
    intentionally not supported by this program).

    ```sh
    curl -v -N --http2-prior-knowledge http://localhost:3000
    ```

    **Note:** If you have deployed on Cloud Run, you can replace `localhost:3000` with your Cloud Run service URL.

1.  The `curl` output should indicate HTTP/2 is used:

    ```text
    * Connection state changed (MAX_CONCURRENT_STREAMS == 4294967295)!
    < HTTP/2 200
    < date: Mon, 25 Jan 2021 23:01:07 GMT
    <
    2021-01-25T23:01:07.594Z
    2021-01-25T23:01:08.595Z
    ```

Since this server intentionally doesn't support upgrading from HTTP/1.1,
performing the same query without the `--http2-prior-knowledge` option makes
curl to use HTTP/1, which fails as expected.
