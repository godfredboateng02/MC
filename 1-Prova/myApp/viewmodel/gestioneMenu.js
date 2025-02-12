import CommunicationController from "../model/CommunicationController"
import Storage from "../model/storage";

export default class gestioneMenu {

    static async lista(){
        let raw = await CommunicationController.getMenus();
        let lista =[];
        raw.forEach(element => {
            lista.push({
                Mid: element.mid,
                Nome: element.name,
                Descrizione: element.shortDescription,
                Prezzo: element.price,
                Tempo: element.deliveryTime,
                Immagine: Storage.getImage(element.mid, element.imageVersion)
            })
        });
        return lista;
    }

    static async menuDetail(mid){
        let raw = await CommunicationController.getMenuDetail(mid);
        let risposta = {};
        risposta.Nome = raw.name;
        risposta.Prezzo = raw.price;
        risposta.Descrizione = raw.longDescription;
        risposta.Tempo = raw.deliveryTime;
        risposta.Immagine = Storage.getImage(mid, raw.imageVersion);
        return risposta;
    }


}