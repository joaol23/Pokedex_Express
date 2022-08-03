import fs from 'fs';
import fetch from 'node-fetch';


export class Model {
    async getData(path, isReturnArray) {
        let data = await fs.readFileSync(path);
        if (isReturnArray) {
            return (data.length == 0) ? [] : (await JSON.parse(data));
        }

        return (await JSON.parse(data));
    }

    async insertData(path, data, reWriteFile = false) {
        if (reWriteFile) {
            return await fs.writeFileSync(path, JSON.stringify(data, null, 4));
        }

        return await fs.appendFileSync(path, JSON.stringify(data, null, 4));
    }

    async getId(path){
        let data = await this.getData(path, true);
        console.log(data.length)
        return data.length < 1 ? 1 : this.getNextIdFromData(data);
    }

    getNextIdFromData(data){
        console.log(data)
        let highestId = Math.max(...data.map(eachData => eachData.id));
        console.log(highestId)
        return highestId + 1;
    }
    
    async getDataByUrl(url){
        return await fetch(url);
    }
}
