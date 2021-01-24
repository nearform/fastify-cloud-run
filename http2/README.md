# Cloud Run HTTP/2 + Fastify

This Fastify application serves requests using only the HTTP/2 cleartext (h2c)
protocol (it does not support upgrading from HTTP/1.1).

It is provided for testing end-to-end HTTP/2 capabilities on Cloud Run.

## Deploying to Cloud Run

You can use the `gcloud` SDK:

```sh
git clone https://github.com/nearform/fastify-cloud-run.git
cd fastify-cloud-run/http2
gcloud beta run deploy fastify-http2 --use-http2 --source=.
```

> You may need to specify additional options to the command based on how your Cloud Shell is configured

**Cleanup:** Remove the `fastify-http2` Service you deployed from Cloud Run
using the [Cloud Console](https://console.cloud.google.com/run).

## Testing locally

1. Check out this repository and navigate to this directory

1. Start the server locally:

   ```sh
   npm install
   npm start
   ```

## Verifying h2c

> HTTP/2 is only supported in browsers when using HTTPS. When running locally over HTTP, you won't be able to open the localhost url in your browser.

1.  After the server starts, make a request using `curl` and use
    `--http2-prior-knowledge` to prevent upgrading from HTTP/1.1 (which is
    intentionally not supported by this program).

    ```sh
    curl -v --http2-prior-knowledge localhost:3000
    ```

    **Note:** If you have deployed on Cloud Run, you can replace `localhost:3000` with your Cloud Run service URL.

1.  The `curl` output should indicate HTTP/2 is used:

    ```text
    < HTTP/2 200
    < content-type: text/plain; charset=utf-8
    < content-length: 32
    < date: Fri, 08 Jan 2021 18:13:06 GMT

    {"hello":"world","httpVersion":"2.0"}
    ```

Since this server intentionally doesn't support upgrading from HTTP/1.1,
performing the same query without the `--http2-prior-knowledge` option makes
curl to use HTTP/1, which fails as expected.
