
import CommunicationController from "../model/CommunicationController";
import storage from "../model/storage";


export default class gestioneOrdini{


    static async effettuaOrdine(mid){
        console.log("Acquisto effettuato");
        let ordine = await CommunicationController.postOrder(mid)
        await storage.setOid(ordine.oid)
        await storage.setMid(mid)
    }

    static async lastOrderMenu(){
        let mid = await storage.getMid()
        console.log("mid",mid)
        let menu = await CommunicationController.getMenuDetails(mid)
        let risposta = {}
        risposta.Nome = menu.name
        risposta.Prezzo = menu.price
        risposta.Descrizione = menu.shortDescription
        risposta.Immagine = await storage.getImage(mid, menu.imageVersion)
        return risposta
    }
}
