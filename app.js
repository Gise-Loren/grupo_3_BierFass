const express = require("express");

const path = require("path");

const app = express();


app.use(express.static('public'));


app.get("/home",(req,res) => res.sendFile(path.join(__dirname,"views/home.html")))

app.get("/ageDate",(req,res) => res.sendFile(path.join(__dirname,"views/ageDate.html")))

app.get("/",(req,res) => res.sendFile(path.join(__dirname,"views/prueba.html")))

app.get("/catalogo",(req,res) => res.sendFile(path.join(__dirname,"views/productos.html")))

app.get("/catalogo/artesanal",(req,res) => res.sendFile(path.join(__dirname,"views/artesanal.html")))

app.get("/catalogo/andes-Origen",(req,res) => res.sendFile(path.join(__dirname,"views/andes-origen.html")))

app.get("/catalogo/patagonia",(req,res) => res.sendFile(path.join(__dirname,"views/patagonia.html")))

app.get("/catalogo/quilmes",(req,res) => res.sendFile(path.join(__dirname,"views/quilmes.html")))

app.get("/catalogo/imperial",(req,res) => res.sendFile(path.join(__dirname,"views/imperial.html")))

app.get("/carrito",(req,res) => res.sendFile(path.join(__dirname,"views/carrito.html")))

app.get("/login",(req,res) => res.sendFile(path.join(__dirname,"views/login.html")))

app.get("/register",(req,res) => res.sendFile(path.join(__dirname,"views/register.html")))

app.get("/clasica",(req,res) => res.sendFile(path.join(__dirname,"views/descripcion.html")));

app.listen(4000,()=> console.log("Servidor corriendo en el puerto 4000"))

