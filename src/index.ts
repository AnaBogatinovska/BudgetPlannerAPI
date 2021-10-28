import app from "./app";

const port: string | number = process.env.PORT || 3000;

app.listen(port, (): void => {
  console.log(`Listening to port: ${port}`);
});
