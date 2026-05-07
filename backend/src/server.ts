import { app } from "./app";

const port = Number(process.env.PORT ?? 4000);

app.listen(port, () => {
  console.log(`College discovery API listening on http://127.0.0.1:${port}`);
});
