import fs from 'fs';

export class Model {
    async getData(path, isArray) {
        let data = await fs.readFileSync(path);
        if (isArray) {
            return (users.length == 0) ? [] : (await JSON.parse(data));
        }

        return (await JSON.parse(data));
    }

    async insertData(path, data, reWriteFile = false) {
        if (reWriteFile) {
            return await fs.writeFileSync(path, JSON.stringify(data, null, 4));
        }

        return await fs.appendFileSync(path, JSON.stringify(data, null, 4));
    }
}
