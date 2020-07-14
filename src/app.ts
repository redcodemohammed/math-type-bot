import "./bot";
import { createServer } from "http";
createServer((req, res) => res.end("Hello World")).listen(process.env.PORT);
