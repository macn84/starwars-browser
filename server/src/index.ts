import { app } from './app';
import { config } from './config';

app.listen(config.PORT, () => {
  console.log(
    `[server] Running in ${config.NODE_ENV} mode on port ${config.PORT}`,
  );
});
