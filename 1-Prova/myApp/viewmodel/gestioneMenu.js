import CommunicationController from "../model/CommunicationController"
import Storage from "../model/storage";

export default class gestioneMenu {

    static async lista(){
        let raw = await CommunicationController.getMenus();
        let lista =[];
        //COMMENTO (GB): dava problemi inserire tutto sottto al posto della variabile i
        let i = await Storage.getImage(element.mid, element.imageVersion)
        raw.forEach(element => {
            lista.push({
                Mid: element.mid,
                Nome: element.name,
                Descrizione: element.shortDescription,
                Prezzo: element.price,
                Tempo: element.deliveryTime,
                Immagine:  i
            })
        });
        //TO-DO remove
        console.log(lista[0])
        return lista;
    }

    //COMMENTO (GB): mancava l'await dentro lo Storage
    static async menuDetail(mid){
        let raw = await CommunicationController.getMenuDetails(mid);
        let risposta = {};
        risposta.Nome = raw.name;
        risposta.Prezzo = raw.price;
        risposta.Descrizione = raw.longDescription;
        risposta.Tempo = raw.deliveryTime;
        risposta.Immagine = await Storage.getImage(mid, raw.imageVersion);
        return risposta;
    }


}