export class Business {
    constructor() {
        const businessClass = this.constructor.name;
        const model = businessClass.replace('Business', 'Model');
        const nameFile = businessClass.replace('Business', '');

        import(`../model/${nameFile}.js`).then(response => {
            this.model = new response[model];
        });
    }

    addDataToArray(data, ArrayData) {
        ArrayData.push(data);
        return ArrayData;
    }

    async addIdToObject(data, path){
        let id = await this.model.getId(path);        
        data["id"] = id;
        return data;
    }

    async getData(path, isReturnArray) {
        return await this.model.getData(path, isReturnArray);
    }

    async insertData(path, data, reWriteFile) {
        return await this.model.insertData(path, data, reWriteFile)
    }

    getOffset(page, limit) {
        page = page || 1;
        const offSetPage = (page - 1) * limit;
        return offSetPage;
    }
}