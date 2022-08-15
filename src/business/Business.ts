export class Business {
    model: any;
    nextId: number;
    constructor() {
        const businessClass = this.constructor.name;
        const model = businessClass.replace('Business', 'Model');
        const nameFile = businessClass.replace('Business', '');
        this.nextId = 0;

        import(`../model/${nameFile}.js`).then(response => {
            new response[model]();
            this.model = new response[model]();
        });
    }

    insertDateTime(data: any, nameIndex: string) {
        data[nameIndex] = new Date();
        return data;
    }

    addDataToArray(data: any, ArrayData: any[]) {
        ArrayData.push(data);
        return ArrayData;
    }

    async addIdToObject(data: any, path: string) {
        if (await this.verifyHasNextId(path)) {
            const newId = await this.model.getNextId(path);
            data["id"] = newId;
            await this.updateNextId(path, newId);
            return data;
        }
        let id = await this.model.getId(path);
        data["id"] = id;
        return data;
    }

    async updateNextId(path: string, oldNext: number | string) {
        const data = await this.model.getData(path, false);
        data.nextId = (oldNext as number) + 1;
        this.nextId = (oldNext as number) + 1;
        await this.model.insertData(path, data, true)
    }

    async verifyHasNextId(path: string): Promise<boolean> {
        const data = await this.model.getData(path, false);

        if (!(typeof data === 'object')) {
            return false;
        }

        if (!data.hasOwnProperty('nextId')) {
            return false;
        }

        return true;
    }

    async getData(path: string, isReturnArray: boolean, especificKey = '') {
        return await this.model.getData(path, isReturnArray, especificKey);
    }

    async insertData(path: string, data: any, reWriteFile: boolean, nameEspecificKey = '') {
        if (nameEspecificKey != '') {
            let newData = { nextId: await this.model.getNextId(path) };
            newData[nameEspecificKey as keyof typeof newData] = data;
            return await this.model.insertData(path, newData, reWriteFile)
        }

        return await this.model.insertData(path, data, reWriteFile)
    }

    getDataByParameter(parameter: string, data: Array<any>, valueParameter: string | number, singleItem = false) {
        if (singleItem) {
            return data.find(eachData => eachData[parameter] == valueParameter);
        }

        return data.filter(eachData => eachData[parameter] == valueParameter);
    }

    getIndexDataByParameter(parameter: string, data: Array<any>, valueParameter: string | number) {
        return data.findIndex(eachData => eachData[parameter] == valueParameter);
    }

    getOffset(page: number, limit: number) {
        page = page || 1;
        const offSetPage = (page - 1) * limit;
        return offSetPage;
    }

    updateData(data: Array<any>, newData: any, index: number) {
        Object.keys(newData).map((eachValue: string) => {
            if (data[index].hasOwnProperty(eachValue)) {
                data[index][eachValue] = newData[eachValue];
            }
        })
        return data;
    }
}