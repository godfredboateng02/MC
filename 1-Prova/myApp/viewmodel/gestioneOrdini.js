
import CommunicationController from "../model/CommunicationController";
import storage from "../model/storage";
import formattazione from "./formattazione";


export default class gestioneOrdini{


    static async effettuaOrdine(mid){
        console.log("Acquisto effettuato");
        let ordine = await CommunicationController.postOrder(mid)
        //console.log(ordine.curretPosition)
        await storage.setRistorante({lat: ordine.curretPosition.lat, lng: ordine.curretPosition.lng})
        await storage.setOid(ordine.oid)
        await storage.setMid(mid)
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
            console.log("NON in PRE orderstatus")
             raw = await CommunicationController.getOrderStatus(8444)
             console.log("NON in POST orderstatus")
        } catch (error) {
            console.log("errore in orderstatus",error)
        }
    
        //TO-DO: TOGLILO
        console.log("-->",raw)
        let risposta = {};
        risposta.Stato = raw.status;
        
        risposta.Partenza = await storage.getRistorante();
        risposta.Destinazione = raw.deliveryLocation;
        risposta.Drone = raw.curretPosition;
        console.log("pre-risposta",risposta)
        if (raw.status === "ON_DELIVERY"){
            risposta.Tempo = formattazione.tempoRimanente(raw.expectedDeliveryTimestamp);
        }else{
            risposta.Tempo = null;
            risposta.Consegnato = formattazione.extractTime(raw.deliveryTimestamp);
        }
        console.log("risposta",risposta)
        return risposta;
    }
}
