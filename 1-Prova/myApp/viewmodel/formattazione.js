export default class formattazione {
    static extractTime(stringa){
        let stringhe = stringa.split("T");
        let dataRaw = stringhe[0].split("-");
        let data = dataRaw[2] + "/" + dataRaw[1] + "/" + dataRaw[0];
        let oraRaw = stringhe[1].split(":")[0];
        let ora = oraRaw[0] + ":" + oraRaw[1];
        return {Data : data, Ora : ora};
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