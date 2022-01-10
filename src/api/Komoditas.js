import Stein from 'config/configStein';

class Komoditas extends Stein {
    saveDataKomoditas(data) {
        return this.Stein.append('list', [data])
    }

    getDataKomoditas() {
        return this.Stein.read('list')
    }

    getDataSize() {
        return this.Stein.read('option_size')
    }

    getDataCity() {
        return this.Stein.read('option_area')
    }
}

export default Komoditas;