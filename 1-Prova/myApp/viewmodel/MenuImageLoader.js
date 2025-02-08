import CommunicationController from "../model/CommunicationController";

export async function fetchImage (menu) {
    const imagePrefix = "data:image/png;base64,";
    //console.log("Menu2:",mid);

    let uri = undefined
    console.log("Menu-->",menu.mid);
    try{
        uri = await CommunicationController.getMenuImage(menu.mid);
        //console.log("URI:",uri);
        return imagePrefix+""+uri.base64;
    }catch(error){  
        console.log("Error:",error);
        return error;
    }
    
}