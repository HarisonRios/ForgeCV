import { createApp } from "./app";
import { env } from "./config/env";
import { disconnectPrisma } from "./shared/prisma/prisma";

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`ForgeCV API running on port ${env.PORT}`);
});

async function shutdown(signal: string) {
  console.log(`Received ${signal}. Shutting down ForgeCV API...`);

  server.close(async () => {
    await disconnectPrisma();
    process.exit(0);
  });
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});
