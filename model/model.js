import fs from 'fs';

export class Model {
    async getData(path, isArray) {
        let data = await fs.readFileSync(path);
        if (isArray) {
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
        try{
            let data = await this.getData(path, false);
            if(data.length > 0)
            {
                let highestId = 0;
                data.map((d)=>{
                    if(d.id > highestId){
                        highestId = d.id;
                    }
                })

                return highestId + 1
            }

            return 1
        }
        catch(error){
            console.log(error)
        }
    }
}
