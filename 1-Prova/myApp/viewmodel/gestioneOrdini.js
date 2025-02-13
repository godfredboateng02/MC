
import CommunicationController from "../model/CommunicationController";
import storage from "../model/storage";
import formattazione from "./formattazione";


export default class gestioneOrdini{


    static async effettuaOrdine(mid){
        console.log("Acquisto effettuato");
        let ordine = await CommunicationController.postOrder(mid)
        await storage.setRistorante({lat: ordine.curretPosition.lat, lng: ordine.curretPosition.lng})
        await storage.setOid(ordine.oid)
        await storage.setMid(mid)
    }

    static async lastOrderMenu(){
        let mid = await storage.getMid()
        if (mid === null){
            return null
        }
        console.log("mid",mid)
        let menu = await CommunicationController.getMenuDetails(mid)
        let risposta = {}
        risposta.Nome = menu.name
        risposta.Prezzo = menu.price
        risposta.Descrizione = menu.shortDescription
        risposta.Immagine = await storage.getImage(mid, menu.imageVersion)
        return risposta
    }

    static async orderStatus(){
        let oid = await storage.getOid()
        if (oid === null){
            return null
        }
        let raw = await CommunicationController.getOrderStatus(oid)
        let risposta = {};
        risposta.Stato = raw.status;
        risposta.Partenza = await storage.getRistorante();
        risposta.Destinazione = raw.deliveryLocation;
        risposta.Drone = raw.curretPosition;
        if (raw.status === "ON_DELIVERY"){
            risposta.Tempo = formattazione.tempoRimanente(raw.expectedDeliveryTimestamp);
        }else{
            risposta.Tempo = null;
            risposta.Consegnato = formattazione.extractTime(raw.deliveryTimestamp);
        }
        return risposta;
    }
}
