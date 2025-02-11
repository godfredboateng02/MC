import AsyncStorage from '@react-native-async-storage/async-storage';
import CommunicationController from './CommunicationController';
import DB from './DB';


export default class Storage {
     sid = null
     uid = null
     oid = null
     mid = null
     
    

    static async getSid(){
        if (this.sid != null){
            return this.sid
        }
        let sid = await AsyncStorage.getItem('sid')
        if (sid != null){
            this.sid = sid
            return this.sid
        }
        await this.registrazione()
        await this.getSid()
    }

    static async getUid(){
        if (this.uid != null){
            return this.uid
        }
        let uid = await AsyncStorage.getItem('uid')
        if (uid != null){
            this.uid = uid
            return this.uid
        }
        await this.registrazione()
        await this.getUid()
    }

    static async registrazione(){
        let credenziali = await CommunicationController.signUp()
        this.sid = credenziali.sid
        this.uid = credenziali.uid
        await AsyncStorage.setItem('sid', JSON.stringify(this.sid))
        await AsyncStorage.setItem('uid', JSON.stringify(this.uid))
    }

    static async getOid(){
        if (this.oid == null){
            this.oid = await AsyncStorage.getItem('oid')
        }
        return this.oid
    }

    static async setOid(oid){
        this.oid = oid
        await AsyncStorage.setItem('oid', JSON.stringify(oid))
    }

    static async getMid(){
        if (this.mid == null){
            this.mid = await AsyncStorage.getItem('mid')
        }
        return this.mid
    }

    static async setMid(mid){
        this.mid = mid
        await AsyncStorage.setItem('mid',JSON.stringify(mid))
    }

    static async getImage(mid, version) {
        let image = await DB.getImage(mid, version)
        if (image == "NOT_FOUND"){
            // image = await CommunicationController.getMenuImage(mid)
            image = await this.immagine(mid)    
            console.log("presa da rete")   
            await DB.addImage(mid, version, image)
        }else if (image == "VERSION_MISMATCH"){
            // image = await CommunicationController.getMenuImage(mid)
            image = await this.immagine(mid)    
            console.log("presa da rete")   
            await DB.updateImage(mid, version, image)
        }
        return image
    }
    
}