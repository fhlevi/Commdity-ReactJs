import Stein from 'config/configStein';

class Komoditas extends Stein {
    saveDataKomoditas(data) {
        return this.Stein.append('list', [data])
    }

    getDataKomoditas() {
        return this.Stein.read('list')
    }
}

export default Komoditas;