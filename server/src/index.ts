// This is the entry point for the server — the first file that runs when you start the app.
// Its only job is to tell the server to start listening for incoming web requests.
// We keep this file as small as possible so that tests can import `app` directly
// without accidentally starting a real server on a real port.

import { app } from './app';
import { config } from './config';

// Start the server and begin accepting requests on the configured port.
// Once running, it prints a confirmation message so you know it's alive.
app.listen(config.PORT, () => {
  console.log(
    `[server] Running in ${config.NODE_ENV} mode on port ${config.PORT}`,
  );
});
