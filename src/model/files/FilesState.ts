import { Model } from "../Model.js";

export class FilesStateModel extends Model {

    getPath() : string{
        return 'database/files-state.json'
    }

    getPathState(): string {
        return 'database/lib/states.json'
    }

    getPathCities(): string {
        return 'database/lib/cities.json'
    }
}