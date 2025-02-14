import AsyncStorage from '@react-native-async-storage/async-storage';
import CommunicationController from './CommunicationController';
import DB from './DB';

export default class Storage {
    static sid = null;
    static uid = null;
    static oid = null;
    static mid = null;
    static ristorante = null;
    static consegna = null;
    static pagina = null;
    static parametri = null;

    static async getPagina() {
        if (this.pagina == null) {
            let pagina = await AsyncStorage.getItem('pagina');
            this.pagina = pagina ? JSON.parse(pagina) : "Home";
        }
        return this.pagina;
    }

    static async setPagina(pagina) {
        this.pagina = pagina;
        await AsyncStorage.setItem('pagina', JSON.stringify(pagina));
    }

    static async getParametri() {
        if (this.parametri == null) {
            let parametri = await AsyncStorage.getItem('parametri');
            this.parametri = parametri ? JSON.parse(parametri) : null;
        }
        return this.parametri;
    }

    static async setParametri(parametri) {
        this.parametri = parametri;
        await AsyncStorage.setItem('parametri', JSON.stringify(parametri));
    }

    static async getSid() {
        if (this.sid != null) {
            return this.sid;
        }
        let sid = await AsyncStorage.getItem('sid');
        if (sid != null) {
            this.sid = JSON.parse(sid);
            return this.sid;
        }
        await this.registrazione();
        return await this.getSid();
    }

    static async getUid() {
        if (this.uid != null) {
            return this.uid;
        }
        let uid = await AsyncStorage.getItem('uid');
        if (uid != null) {
            this.uid = JSON.parse(uid);
            return this.uid;
        }
        await this.registrazione();
        return await this.getUid();
    }

    static async registrazione() {
        let credenziali = await CommunicationController.signUp();
        this.sid = credenziali.sid;
        this.uid = credenziali.uid;
        console.log("registrazione", this.uid, this.sid);
        await AsyncStorage.setItem('sid', JSON.stringify(this.sid));
        await AsyncStorage.setItem('uid', JSON.stringify(this.uid));
    }

    static async getOid() {
        console("storage OID1",this.oid)
        if (this.oid == null) {
            let oid = await AsyncStorage.getItem('oid');
            this.oid = oid ? JSON.parse(oid) : null;
        }
        console("storage OID",this.oid)
        return this.oid;
    }

    static async setOid(oid) {
        this.oid = oid;
        await AsyncStorage.setItem('oid', JSON.stringify(oid));
    }

    static async getMid() {
        if (this.mid == null) {
            let mid = await AsyncStorage.getItem('mid');
            this.mid = mid ? JSON.parse(mid) : null;
        }
        return this.mid;
    }

    static async setMid(mid) {
        this.mid = mid;
        await AsyncStorage.setItem('mid', JSON.stringify(mid));
    }

    static async getRistorante() {
        if (this.ristorante == null) {
            let ristorante = await AsyncStorage.getItem('ristorante');
            this.ristorante = ristorante ? JSON.parse(ristorante) : null;
        }
        return this.ristorante;
    }

    static async setRistorante(mid) {
        let risposta = await CommunicationController.getMenuDetails(mid);
        let ristorante = {};
        ristorante.lat = risposta.location.lat;
        ristorante.lng = risposta.location.lng;

        this.ristorante = ristorante;
        console.log("setRistorante lat,lng : ", this.ristorante.lat," ", this.ristorante.lng);
        await AsyncStorage.setItem('ristorante', JSON.stringify(this.ristorante));
    }

    static async getImage(mid, version) {
        let image = await DB.getImage(mid, version);
        if (image == "NOT_FOUND") {
            raw = await CommunicationController.getMenuImage(mid);
            image = raw.base64
            console.log("presa da rete");
            await DB.addImage(mid, version, image);
        } else if (image == "VERSION_MISMATCH") {
            raw = await CommunicationController.getMenuImage(mid);
            image = raw.base64
            console.log("presa da rete");
            await DB.updateImage(mid, version, image);
        }
        return image;
    }

    static async inConsegna() {
        if (this.consegna == null) {
            let consegna = await AsyncStorage.getItem('consegna');
            this.consegna = consegna ? JSON.parse(consegna) : false;
        }
        return this.consegna;
    }

    static async setConsegna(consegna) {
        this.consegna = consegna;
        await AsyncStorage.setItem('consegna', JSON.stringify(consegna));
    }
}