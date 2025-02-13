import CommunicationController from "../model/CommunicationController";
import storage from "../model/storage";
import formattazione from "./formattazione";

export default class gestioneAccount {

    static async getUserData(){
        let risposta = undefined
        try{
            risposta = await CommunicationController.getUserInfo();
        }catch(error){
            console.log("errore da getUser:",error)
        }
        
        let userData = {};
        userData.Nome = risposta.firstName;
        userData.Cognome = risposta.lastName;
        //console.log("getUserData",userData,"risposta",risposta)
        if (risposta.cardFullName == null) {
            userData.Carta = null;
        } else {
            userData.Carta = {}
            userData.Carta.Titolare = risposta.cardFullName;
            userData.Carta.Numero = risposta.cardNumber.slice(-4);
            userData.Carta.Mese = risposta.cardExpireMonth;
            userData.Carta.Anno = risposta.cardExpireYear;
        }
        //console.log("userData",userData.Carta)
        return userData;
    }

    static async updateUserCard(card){
        //console.log("updateUser",card)
        let identity = await this.getUserData();
        //console.log("userData",identity)
        let bodyParams = {
            cardFullName: card.Carta.Titolare,
            cardNumber: card.Carta.Numero,
            cardExpireMonth: card.Carta.Mese,
            cardExpireYear: card.Carta.Anno,
            cardCVV: card.Carta.Cvv,
            firstName: identity.Nome,
            lastName: identity.Cognome
        }
        //console.log("updateUser2",bodyParams)
        await CommunicationController.putUserInfo(bodyParams);
    }

    static async updateUserName(identity){
        let dati = await CommunicationController.getUserInfo();
        let bodyParams = {
            cardFullName: dati.cardFullName,
            cardNumber: dati.cardNumber,
            cardExpireMonth: dati.cardExpireMonth,
            cardExpireYear: dati.cardExpireYear,
            cardCVV: dati.cardCVV,
            firstName: identity.Nome,
            lastName: identity.Cognome,
        }
        CommunicationController.putUserInfo(bodyParams);
    }



    static async lastOrderTime(){
        let oid = await storage.getOid();
        if (oid == null){
            return null;
        }
        let risposta = await CommunicationController.getOrderStatus(oid);
        return formattazione.extractTime(risposta.creationTimestamp);
    }


}