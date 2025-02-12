export default class formattazione {
    static extractTime(stringa){
        let stringhe = stringa.split("T");
        let dataRaw = stringhe[0].split("-");
        let data = dataRaw[2] + "/" + dataRaw[1] + "/" + dataRaw[0];
        let oraRaw = stringhe[1].split(":")[0];
        let ora = oraRaw[0] + ":" + oraRaw[1];
        return {data : data, ora : ora};
    }


    static showImage(image){
        return "data:image/png;base64," + image;
    }
    
    static tempoRimanente(expectedTime){ 
        let data1 = new Date(expectedTime);
        let data2 = new Date().toISOString();
        let differenzaMs = Math.abs(data1 - data2);
        return Math.ceil(differenzaMs / 1000 / 60); // 60.000 ms = 1 minuto
    }
}