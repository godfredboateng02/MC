
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
        let mid = storage.getMid()
        let menu = await CommunicationController.getMenuDetails(mid)
        let risposta = {}
        risposta.Nome = menu.name
        risposta.Prezzo = menu.price
        risposta.Descrizione = menu.shortDescription
        risposta.Immagine = await storage.getImage(mid, menu.imageVersion)
    }
}
