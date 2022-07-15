export class Controller {
    constructor() {
        const controllerClass = this.constructor.name;
        const business = controllerClass.replace('Controller', 'Business');
        const nameFile = controllerClass.replace('Controller', '');
        
        import(`../business/${nameFile}.js`).then(response => {
            this.business = new response[business];
        });
    }

}