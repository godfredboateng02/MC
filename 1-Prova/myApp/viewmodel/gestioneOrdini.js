
import CommunicationController from "../model/CommunicationController";
import storage from "../model/storage";
import formattazione from "./formattazione";


export default class gestioneOrdini{

    static async consegnaInCorso(){
        let consegna = await storage.inConsegna()
        return consegna
        
    }

    static async effettuaOrdine(mid){
        await storage.setConsegna(true)
        console.log("Acquisto effettuato");
        let ordine = undefined
        try{
            ordine = await CommunicationController.postOrder(mid)
        }catch(error){
            console.log("errore in effettuaOrdine",error)
            await storage.setConsegna(false)
        }
        
        //console.log(ordine.curretPosition)
        await storage.setRistorante(mid)
        await storage.setOid(ordine.oid)
        await storage.setMid(mid)
        let stato = await this.orderStatus()
        return stato
    }

    static async lastOrderMenu(){
        let mid = await storage.getMid()
        //TO-DO: toglilo!!!!!!!
        //mid = 63
        if (mid === null){
            return null
        }
        console.log("mid",mid)
        let menu = await CommunicationController.getMenuDetails(mid)
        let risposta = {}
        risposta.Nome = menu.name
        risposta.Prezzo = parseFloat(menu.price).toFixed(2),
        risposta.Descrizione = menu.shortDescription
        risposta.Immagine = await storage.getImage(mid, menu.imageVersion)
        return risposta
    }

    static async orderStatus(){
        let oid = undefined
        try {
            oid = await storage.getOid()
        } catch (error) {
            console.log("da orderStatus",error)
        }
        
        console.log("PRE-->",oid)
        if (oid === null){
            return null
        }

        //PROBLEMA CON L'ULTIMO ORDINE oid hard-coded
        let raw = undefined
        try {
            console.log("NON in PRE orderstatus",oid)
            raw = await CommunicationController.getOrderStatus(oid)
            console.log("NON in POST orderstatus",raw)
        } catch (error) {
            console.log("errore in orderstatus",error)
        }
    
        //TO-DO: TOGLILO
        console.log("-->",raw)
        let risposta = {};
        risposta.Stato = raw.status;
        
        risposta.Partenza = await storage.getRistorante();
        risposta.Destinazione = raw.deliveryLocation;
        risposta.Drone = raw.currentPosition;
        console.log("pre-risposta",risposta)
        if (raw.status === "ON_DELIVERY"){
            risposta.Tempo = formattazione.tempoRimanente(raw.expectedDeliveryTimestamp);
        }else{
            risposta.Tempo = formattazione.extractTime(raw.deliveryTimestamp);
        }
        console.log("risposta",risposta)
        return risposta;
    }


    static async confermaConsegna(){
        await storage.setConsegna(false)
    }
}
