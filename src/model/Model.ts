import fs from 'fs';
import * as fetch from 'node-fetch';


export class Model {
    async getData(path: string, isReturnArray: boolean) {
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

<<<<<<< HEAD:src/model/Model.ts
    async getDataByUrl(url: string) {
=======
    async getId(path){
        let data = await this.getData(path, true);
        return data.length < 1 ? 1 : this.getNextIdFromData(data);
    }

    getNextIdFromData(data){
        let highestId = Math.max(...data.map(eachData => eachData.id));
        return highestId + 1;
    }
    
    async getDataByUrl(url){
>>>>>>> 5c91093a2d48ca7d716899e199b3158a1cd5d572:model/Model.js
        return await fetch(url);
    }
}
