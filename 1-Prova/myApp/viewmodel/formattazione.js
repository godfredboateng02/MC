export default class formattazione {
    static extractTime(stringa){
        let stringhe = stringa.split("T");
        let dataRaw = stringhe[0].split("-");
        let data = dataRaw[2] + "/" + dataRaw[1] + "/" + dataRaw[0];
        let ora = stringhe[1].split(".")[0];
        return {data : data, ora : ora};
    }


    static showImage(image){
        return "data:image/png;base64," + image;
    }
}