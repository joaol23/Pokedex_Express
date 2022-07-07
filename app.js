import express from 'express';
import path from 'path';
import * as url from 'url';
import { routePokemon } from './routes/pokemons.js';
import { PORT } from './config/config.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

app.use(express.static(path.join(__dirname, "views/public")));

app.set('view engine', 'ejs');
app.get("/", (req, res) => {
    res.render('index', {});
})

app.get("/login", (req, res) => {
    res.render('curriculo', {});
})

routePokemon(app);

app.listen(PORT, () => {
    console.log('Servidor rodando na porta ' + PORT);
});
