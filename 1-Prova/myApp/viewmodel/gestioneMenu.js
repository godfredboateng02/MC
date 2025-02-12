import CommunicationController from "../model/CommunicationController"
import Storage from "../model/storage";

export default class gestioneMenu {

    static async lista(){
        let raw = await CommunicationController.getMenus();
        let lista =[];
        //COMMENTO (GB): dava problemi inserire tutto sottto al posto della variabile i
        for (const element of raw) {
            let i = await Storage.getImage(element.mid, element.imageVersion);
            lista.push({
                Mid: element.mid,
                Nome: element.name,
                Descrizione: element.shortDescription,
                Prezzo: parseFloat(element.price).toFixed(2),
                Tempo: element.deliveryTime,
                Immagine:  i
            })
        };
        return lista;
    }

    //COMMENTO (GB): mancava l'await dentro lo Storage
    static async menuDetail(mid){
        let raw = await CommunicationController.getMenuDetails(mid);
        let risposta = {};
        risposta.Nome = raw.name;
        risposta.Prezzo = parseFloat(raw.price).toFixed(2),
        risposta.Descrizione = raw.longDescription;
        risposta.Tempo = raw.deliveryTime;
        risposta.Immagine = await Storage.getImage(mid, raw.imageVersion);
        return risposta;
    }


}