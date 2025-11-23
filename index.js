//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

//ESTA FUE MI MANERA DE RESOLVERLO
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const port = 3000;
// const app = express();
// var contra = "";
// var password = "ILoveProgramming";
// app.use(bodyParser.urlencoded({ extended: true }));

// //sendFile envia a leer el archivo, pero si coloco solo res.send, o que va a enviar es texto
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });

// app.post("/check", (req, res) => {
//   contra = req.body["password"];
//   console.log("la contraseña que ingresó el usuario fue: " + contra);
//   if (contra === password) {
//     res.sendFile(__dirname + "/public/secret.html");
//   } else {
//     console.log("contraseña incorrecta");
//     res.sendFile(__dirname + "/public/index.html");
//   }
// });

// app.listen(3000, () => {
//   console.log("El server está corriendo en el port: " + port);
// });

//OTRA MANERA DE HACER ES ESTA

//con esta solucion creamos un middleware el cual nos ayuda a pre-process si la contraseña escrita es correcta o no, y ya una vez sea validada
// nos direcciona a la siguiente ruta(endpoint): /check.
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();
var autorizado = false;
app.use(bodyParser.urlencoded({ extended: true }));

function Autorizacion(req, res, next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    autorizado = true;
  }
  next();
}

app.use(Autorizacion);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (autorizado) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    console.log("contraseña incorrecta");
    res.sendFile(__dirname + "/public/index.html");
    //Alternatively res.redirect("/"); con este podemos reidreccionarlo a otro endpoint
  }
});

app.listen(3000, () => {
  console.log("El server está corriendo en el port: " + port);
});
