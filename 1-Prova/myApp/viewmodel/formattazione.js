export default class formattazione {
    static extractTime(stringa) {
        const date = new Date(stringa);
      
        // Formatta la data
        const dataOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const dataFormattata = new Intl.DateTimeFormat('it-IT', dataOptions).format(date);
      
        // Formatta l'ora
        const oraOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
        const oraFormattata = new Intl.DateTimeFormat('it-IT', oraOptions).format(date);
      
        return { Data: dataFormattata, Ora: oraFormattata };
      }


    static showImage(image){
        return "data:image/png;base64," + image.slice(8,-1);
    }
    
    static tempoRimanente(expectedTime){ 
        let data1 = new Date(expectedTime);
        let data2 = new Date(); // Usa direttamente un oggetto Date
        let differenzaMs = Math.abs(data1 - data2);
        let t = Math.ceil(differenzaMs / (1000 * 60)); // Converte millisecondi in minuti
        console.log("tempo rimanente:", t);
        return t;
    }
}