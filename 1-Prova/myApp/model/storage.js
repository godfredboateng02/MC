import AsyncStorage from '@react-native-async-storage/async-storage';
import CommunicationController from './CommunicationController';
import DB from './DB';

export default class Storage {
    static sid = null;
    static uid = null;
    static oid = null;
    static mid = null;

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
        if (this.oid == null) {
            let oid = await AsyncStorage.getItem('oid');
            this.oid = oid ? JSON.parse(oid) : null;
        }
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

    static async getImage(mid, version) {
        let image = await DB.getImage(mid, version);
        if (image == "NOT_FOUND") {
            image = await this.immagine(mid);
            console.log("presa da rete");
            await DB.addImage(mid, version, image);
        } else if (image == "VERSION_MISMATCH") {
            image = await this.immagine(mid);
            console.log("presa da rete");
            await DB.updateImage(mid, version, image);
        }
        return image;
    }
}