import CommunicationController from "../model/CommunicationController";

export async function LoadLoader (){
    console.log("caricamento dei dati...")

    let menus = undefined

    menus = CommunicationController.getMenus.then(menuList)
}

/*useEffect(() => {
        setTextToShow('componente montato');
        CommunicationController.getMenus().then((menuList) => {
          setMenuList(menuList);
          setTextToShow('dati caricati');
        }).then(() => {
          setTextToShow('dati caricati e visualizzati');
        });
    
      }, []);*/