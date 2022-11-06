import fs from 'fs';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fetch = require('node-fetch');


export class Model {
    path : string = '';

    async getData(isReturnArray: boolean, especificKey = '') {
        try {
            let data = await fs.readFileSync(this.getPath());
            if (especificKey != '') {
                return (data.length == 0) ? [] : (await JSON.parse(data.toString()))[especificKey];
            }

            if (isReturnArray) {
                return (data.length == 0) ? [] : (await JSON.parse(data.toString()));
            }

            return (data.length == 0) ? {} : (await JSON.parse(data.toString()));
        } catch (err) {
            throw new Error(err)
        }
    }

    getPath(): string { return this.path }

    setPath(path: string): void { this.path = path; }

    async insertData(data: any, reWriteFile = false) {
        try {
            if (reWriteFile) {
                return await fs.writeFileSync(this.getPath(), JSON.stringify(data, null, 4));
            }

            return await fs.appendFileSync(this.getPath(), JSON.stringify(data, null, 4));
        } catch (err) {
            throw new Error(err)
        }
    }

    async getNextId() {
        try {
            const data = await this.getData(false);
            return data.nextId;
        }
        catch (err) {
            throw new Error(err)
        }
    }

    async getId() {
        try {
            let data = await this.getData(true);
            return data.length < 1 ? 1 : this.getNextIdFromData(data);
        }
        catch (err) {
            throw new Error(err)
        }
    }

    getNextIdFromData(data: any) {
        try {
            let highestId = Math.max(...data.map((eachData: { id: Number }) => eachData.id));
            return highestId + 1;
        }
        catch (err) {
            throw new Error(err)
        }
    }

    async getDataByUrl(url: string) {
        try {
            return await fetch(url);
        }
        catch (err) {
            throw new Error(err)
        }
    }
}
