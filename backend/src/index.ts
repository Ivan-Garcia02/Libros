// mongod --dbpath /home/ivan/mongodb-data/
import { app } from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(+PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});