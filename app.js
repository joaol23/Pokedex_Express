import express from 'express';
import path from 'path';
import * as url from 'url';
import { routePokemon } from './routes/Pokemons.js';
import { PORT } from './config/Config.js';
import { routeLogin } from './routes/Login.js';
import { routeFavorite } from './routes/Favorites.js';
import { saveLog } from './lib/Log.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
app.use(express.static(path.join(__dirname, "views/public")));
app.use(express.json())
app.set('view engine', 'ejs');


app.use(function(req, res, next) {
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

app.listen(process.env.PORT || PORT, () => {
    saveLog("A api foi iniciada. Servidor rodando na porta " + PORT, 'general');
});
