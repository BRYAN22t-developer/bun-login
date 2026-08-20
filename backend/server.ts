import { app } from "./app";

const PORT = parseInt(process.env.PORT!);

function createServer(port: number) {
  const server = app.listen(port, () => {
    console.log(`Runing server on port: http://localhost:${PORT}`)
  });
  return server;
}

export const server = createServer(PORT);
