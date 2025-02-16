import CommunicationController from "../model/CommunicationController";

export async function LoadLoader (){
    console.log("caricamento dei dati...")

    let menus = undefined

    menus = CommunicationController.getMenus.then(menuList)
}

