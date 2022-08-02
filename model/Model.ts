import fs from 'fs';
import fetch from 'node-fetch';


export class Model {
    async getData(path, isReturnArray) {
        let data = await fs.readFileSync(path);
        if (isReturnArray) {
            return (data.length == 0) ? [] : (await JSON.parse(data.toString()));
        }

        return (data.length == 0) ? {} : (await JSON.parse(data.toString()));
    }

    async insertData(path, data, reWriteFile = false) {
        if (reWriteFile) {
            return await fs.writeFileSync(path, JSON.stringify(data, null, 4));
        }

        return await fs.appendFileSync(path, JSON.stringify(data, null, 4));
    }

    async getDataByUrl(url) {
        return await fetch(url);
    }
}
    