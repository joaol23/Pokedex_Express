import { Model } from "../Model.js";

export class MemesTextModel extends Model {

    getPath(): string {
        return 'database/memes/memes-text.json'
    }
}