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
        try{
            let data = await this.getData(path, true);
            if(data.length < 1)
            {
                return 1
            }
            else{
                let highestId = 0;
                data.map((d)=>{
                    if(d.id > highestId){
                        highestId = d.id;
                    }
                })

                return highestId + 1
            }

        }
        catch(error){
            console.log(error)
        }
    }
    
    async getDataByUrl(url){
        return await fetch(url);
    }
}
