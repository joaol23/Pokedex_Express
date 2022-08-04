import express from 'express';
import path from 'path';
import * as url from 'url';
import { routePokemon } from './routes/Pokemons.js';
import { PORT } from './config/Config.js';
import { routeLogin } from './routes/Login.js';
import { routeFavorite } from './routes/Favorites.js';
import { saveLog } from './lib/Log.js';

<<<<<<< HEAD:src/app.ts
const app: express.Application = express();
app.use(express.json())
app.set('view engine', 'ejs');


app.use(function(req, res, next) {
    next(); 
})
=======
const app = express();
app.use(express.json())
>>>>>>> 5c91093a2d48ca7d716899e199b3158a1cd5d572:app.js

routePokemon(app);
routeLogin(app);
routeFavorite(app);

app.listen(process.env.PORT || PORT, () => {
    saveLog("A api foi iniciada. Servidor rodando na porta " + PORT, 'general');
});
