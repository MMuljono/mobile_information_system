import express from "express";
import router from "./routes";
import cors from "cors";
import config from "./config/config";

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);
app.listen(config.server.port, () => {
  console.log(`App ist running on port:--> ${process.env.PORT_SERVER}`);
});
