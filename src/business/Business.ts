export class Business {
    model: any;
    constructor() {
        const businessClass = this.constructor.name;
        const model = businessClass.replace('Business', 'Model');
        const nameFile = businessClass.replace('Business', '');

        import(`../model/${nameFile}.js`).then(response => {
            new response[model]();
            this.model = new response[model]();
        });
    }

    addDataToArray(data: any, ArrayData: any[]) {
        ArrayData.push(data);
        return ArrayData;
    }

    async addIdToObject(data: any, path: string){
        let id = await this.model.getId(path);        
        data["id"] = id;
        return data;
    }

    async getData(path: string, isReturnArray: boolean) {
        return await this.model.getData(path, isReturnArray);
    }

    async insertData(path: string, data: any, reWriteFile: boolean) {
        return await this.model.insertData(path, data, reWriteFile)
    }

    getOffset(page: number, limit: number) {
        page = page || 1;
        const offSetPage = (page - 1) * limit;
        return offSetPage;
    }
}