import express from 'express';
import path from 'path';
import * as url from 'url';
import { routePokemon } from './routes/pokemons.js';
import { PORT } from './config/config.js';
import { routeLogin } from './routes/login.js';
import { routeFavorite } from './routes/favorites.js';
import { saveLog } from './lib/log.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
app.use(express.static(path.join(__dirname, "views/public")));
app.use(express.json())
app.set('view engine', 'ejs');


app.use(function(req, res, next) {
    saveLog(`Endpoint usado : ${req.url} ${Object.keys(req.body).length === 0 ? '' : `body : ${JSON.stringify(req.body)}` }`, 'endpoint');
    next(); 
})

app.get("/", (req, res) => {
    res.render('index', {});
})

app.get("/login", (req, res) => {
    res.render('curriculo', {});
})

routePokemon(app);
routeLogin(app);
routeFavorite(app);

app.listen(PORT, () => {
    saveLog("A api foi iniciada. Servidor rodando na porta " + PORT, 'general');
    console.log('Servidor rodando na porta ' + PORT);
});
