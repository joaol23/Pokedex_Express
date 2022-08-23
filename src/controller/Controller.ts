import { Exception } from "../Exception/Exception.js";
import { Request } from "express"

export class Controller {
    business: any;
    data: any;
    require: Array<string>;
    requireMain: Array<string>;
    namespace: string;

    constructor() {
        const controllerClass = this.constructor.name;
        const business = controllerClass.replace('Controller', 'Business');
        const nameFile = controllerClass.replace('Controller', '');
        this.business = {};
        this.data = [];
        this.require = [];
        this.namespace = this.getNamespace();
        import(`../business/${this.namespace}${nameFile}.js`).then(response => {
            new response[business]();
            this.business = new response[business]();
        });
    }

    getNamespace(): string {
        return '';
    }

    setData(data: any) {
        this.data = data;
    }

    validateParams() {
        if (!this.require) {
            return true;
        }

        const check = this.require.filter(field => field != "" ? !this.data.hasOwnProperty(field) : false)
        if (check.length > 0) {
            const msgError = `Parâmetros necessários não encontrados: ${check.join(', ')}`;
            throw new Exception(400, msgError, false);
        }
        return true;
    }

    setRequire() {
        this.require = this.requireMain;
    }

    firtStepsController(req: Request, parameter: 'body' | 'query') {
        this.setData(req[parameter]);
        this.setRequire();
        this.validateParams();
    }
}