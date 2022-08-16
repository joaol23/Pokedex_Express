import express from 'express';
import { routePokemon } from './routes/Pokemons.js';
import { PORT } from './config/Config.js';
import { routeLogin } from './routes/Login.js';
import { routeFavorite } from './routes/Favorites.js';
import { saveLog } from './lib/Log.js';
import { routeGrades } from './routes/Grades.js';
import { routeMenu } from './routes/Menu.js';

const app: express.Application = express();
app.use(express.json())

routePokemon(app);
routeLogin(app);
routeFavorite(app);
routeGrades(app);
routeMenu(app);

app.listen(process.env.PORT || PORT, () => {
    saveLog("A api foi iniciada. Servidor rodando na porta " + PORT, 'general');
});
