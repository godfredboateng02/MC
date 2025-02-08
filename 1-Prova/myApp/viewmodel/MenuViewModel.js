import CommunicationController from "../model/CommunicationController";

export async function fetchMenu (){
    console.log("caricamento dei dati del..")

    let menus = undefined
    try {
        menus = await CommunicationController.getMenus()
    } catch (error) {
        return "errore",error
    }
    return menus
}

export async function fetchMenuDetails(mid) {
    try {
        menuDetailed = await CommunicationController.getMenuDetails(mid)
    } catch (error) {
        return "errore",error
    }
    
}