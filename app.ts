import express from 'express';
import path from 'path';
import * as url from 'url';
import { routePokemon } from './routes/Pokemons';
import { PORT } from './config/Config';
import { routeLogin } from './routes/Login';
import { routeFavorite } from './routes/Favorites';
import { saveLog } from './lib/Log';

const app: express.Application = express();
app.use(express.json())
app.set('view engine', 'ejs');


app.use(function(req, res, next) {
    next(); 
})

routePokemon(app);
routeLogin(app);
routeFavorite(app);

app.listen(process.env.PORT || PORT, () => {
    saveLog("A api foi iniciada. Servidor rodando na porta " + PORT, 'general');
});
