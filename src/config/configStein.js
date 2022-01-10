import SteinStore from 'stein-js-client';

class ConfigStein {
    constructor() {
        this.Stein = new SteinStore(process.env.REACT_APP_API_MAIN)
    }
}

export default ConfigStein;