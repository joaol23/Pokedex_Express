import fs from 'fs';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fetch = require('node-fetch');


export class Model {
    async getData(path: string, isReturnArray: boolean) {
        // console.log(fs.readFile(path, (data) => { }))
        let data = await fs.readFileSync(path);
        if (isReturnArray) {
            return (data.length == 0) ? [] : (await JSON.parse(data.toString()));
        }

        return (data.length == 0) ? {} : (await JSON.parse(data.toString()));
    }

    async insertData(path: string, data: any, reWriteFile = false) {
        if (reWriteFile) {
            return await fs.writeFileSync(path, JSON.stringify(data, null, 4));
        }

        return await fs.appendFileSync(path, JSON.stringify(data, null, 4));
    }

    async getId(path: string) {
        let data = await this.getData(path, true);
        return data.length < 1 ? 1 : this.getNextIdFromData(data);
    }

    getNextIdFromData(data: any) {
        let highestId = Math.max(...data.map((eachData: { id: Number }) => eachData.id));
        return highestId + 1;
    }

    async getDataByUrl(url: string) {
        return await fetch(url);
    }
}
