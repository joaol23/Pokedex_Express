import { Business } from '../Business.js';

export class MemesTextBusiness extends Business {
    constructor() {
        super();
    }

    getNamespace(): string {
        return 'memes/'
    }
}
