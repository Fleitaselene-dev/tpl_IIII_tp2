import express from "express"
import morgan from "morgan"
import cors from "cors"

const app = express()
const Port = 5000

app.use(express.json())
app.use(morgan("dev"))
app.use(express.static("client"));
app.use(cors({
  origin: "http://localhost:5173", 
  methods: "GET,POST",
}
));

const usuariosValidos = ["Selene", "Mauricio", "Lautaro", "Tatiana", "Jose", "Marcos", "Carlos", "Milagros"]; 
app.get('/validar/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    if (usuariosValidos.includes(nombre)) {
        res.json({ isValid: true });
    } else {
        res.json({ isValid: false, message: 'El Nombre no es válido' });
        
    }
});

app.get('/saludo/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    res.send(`Hola, ${nombre}!`);
    });



app.listen(Port, ()=>{
    console.log(`Servidor corriendo en http://localhost:${Port}`)
})