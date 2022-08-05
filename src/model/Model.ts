import fs from 'fs';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fetch = require('node-fetch');


export class Model {
    async getData(path: string, isReturnArray: boolean) {
        try {
            let data = await fs.readFileSync(path);
            if (isReturnArray) {
                return (data.length == 0) ? [] : (await JSON.parse(data.toString()));
            }

            return (data.length == 0) ? {} : (await JSON.parse(data.toString()));
        } catch (err) {
            console.log(err)
        }
    }

    async insertData(path: string, data: any, reWriteFile = false) {
        try {
            if (reWriteFile) {
                return await fs.writeFileSync(path, JSON.stringify(data, null, 4));
            }

            return await fs.appendFileSync(path, JSON.stringify(data, null, 4));
        } catch (err) {
            console.log(err)
        }
    }

    async getId(path: string) {
        try {
            let data = await this.getData(path, true);
            return data.length < 1 ? 1 : this.getNextIdFromData(data);
        }
        catch (err) {
            console.log(err)
        }
    }

    getNextIdFromData(data: any) {
        try {
            let highestId = Math.max(...data.map((eachData: { id: Number }) => eachData.id));
            return highestId + 1;
        }
        catch (err) {
            console.log(err)
        }
    }

    async getDataByUrl(url: string) {
        try {
            return await fetch(url);
        }
        catch (err) {
            console.log(err)
        }
    }

    async deleteDataById(id: number) {

    }
}
