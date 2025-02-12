/*

export default class CommunicationController {
    static BASE_URL = "https://develop.ewlab.di.unimi.it/mc/2425/";
    static sid = "3UjfJEE2ukhoqWBqw0mbwVeMJXFy6XIVsgj6bXCOkQsMvyfl87vC4PLeXRMzYqNX"; //TODO: find a way to set the sid
    
  
    static async genericRequest(endpoint, verb, queryParams, bodyParams) {
      console.log("genericRequest called");
  
      const queryParamsFormatted = new URLSearchParams(queryParams).toString();
      const url = this.BASE_URL + endpoint + "?" + queryParamsFormatted;
  
      console.log("Sending " + verb + " request to: " + url);
  
      let fetchData = {
        method: verb,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      if (verb !== "GET") {
        fetchData.body = JSON.stringify(bodyParams);
      }
  
      let httpResponse;
      try {
        httpResponse = await fetch(url, fetchData);
      } catch (error) {
        // This means that the fetch request failed.
        // The request could not be sent or the server did not respond.
        console.error("Error during fetch request: ", error);
        throw error;
      }
  
      const status = httpResponse.status;
      console.log("HTTP response status: ", status);
      if (status === 200) {
        // 200 means that the request was successful.
        // The server responded with the data requested in JSON format.
        let deserializedObject = await httpResponse.json();
        return deserializedObject;
      } else if (status === 204) {
        // 204 means that the server has successfully processed the request
        // but that there is no content to send back.
        return null;
      } else {
        // The server responded with an error status.
        const errorObject = await httpResponse.json();
        console.error("Error message from the server:", errorObject);
        throw errorObject;
      }
    }
  
    static async genericGetRequest(endpoint, queryParams) {
      console.log("genericGetRequest called");
      return await this.genericRequest(endpoint, "GET", queryParams, {});
    }

    static async signUp(){
      let endpoint = "user"
      return await this.genericRequest(endpoint, "POST", {}, {})
    }
  
    static async getUserInfo(uid){
        let endpoint = "user/" + uid;
        let queryParams = { sid: this.sid };
        //console.log("getUserInfo called with endpoint: ",endpoint, " and queryParams: ", queryParams);
        return await this.genericGetRequest(endpoint, queryParams);
    }

    static async putUserInfo(uid, bodyParams){
        let endpoint = "user/" + uid;
        let queryParams = {sid: this.sid, firstName: bodyParams.firstName, lastName: bodyParams.lastName, cardFullName: bodyParams.cardFullName, cardNumber: bodyParams.cardNumber, cardExpireMonth: bodyParams.cardExpireMonth, cardExpireYear: bodyParams.cardExpireYear, cardCVV: bodyParams.cardCVV, orderStatus: bodyParams.orderStatus};
        //console.log("putUserInfo called with endpoint: ",endpoint, " and queryParams: ", queryParams);
        return await this.genericRequest(endpoint, "PUT", queryParams, bodyParams);
    }

    static async getMenus(){
        let endpoint = "menu";
        let queryParams = { sid: this.sid, lat: 45.4642, lng: 9.1900 };
        console.log("getMenus called with endpoint: ",endpoint, " and queryParams: ", queryParams);
        return await this.genericGetRequest(endpoint, queryParams);
    }

    static async getMenuImage(mid){
        let endpoint = "menu/" + mid + "/image";
        let queryParams = { sid: this.sid, mid: mid };
        //console.log("getMenuImage called with endpoint: ",endpoint, " and queryParams: ", queryParams);
        return await this.genericGetRequest(endpoint, queryParams);
    }

    static async getMenuDetails(mid){
      let endpoint = "menu/"+mid
      let queryParams = {sid: this.sid, lat: 45.4642, lng: 9.1900, mid: this.mid }
      //console.log("getMenuDetails called with endpoint: ",endpoint," and queryParams: ",queryParams);
      return await this.genericGetRequest(endpoint,queryParams)
    }

    static async postOrder(mid, posizione){
      let endpoint = "menu/"+mid+"/buy"
      let queryParams = {mid}
      let bodyParams = {sid: this.sid, deliveryLocation: posizione}
      return await this.genericRequest(endpoint, "POST", queryParams, bodyParams)
    }
    static async getOrderStatus(oid){
      let endpoint = "order/" + oid 
      let queryParams = { sid: this.sid, oid: oid };
     // console.log("getMenuImage called with endpoint: ",endpoint, " and queryParams: ", queryParams);
      return await this.genericGetRequest(endpoint, queryParams);
  }
}

*/

import storage from "./storage";
import location from "./location";

export default class CommunicationController {
    static BASE_URL = "https://develop.ewlab.di.unimi.it/mc/2425/";
  
    static async genericRequest(endpoint, verb, queryParams, bodyParams) {
      console.log("genericRequest called");
  
      const queryParamsFormatted = new URLSearchParams(queryParams).toString();
      const url = this.BASE_URL + endpoint + "?" + queryParamsFormatted;
  
      console.log("Sending " + verb + " request to: " + url);
  
      let fetchData = {
        method: verb,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      if (verb !== "GET") {
        fetchData.body = JSON.stringify(bodyParams);
      }
  
      let httpResponse;
      try {
        httpResponse = await fetch(url, fetchData);
      } catch (error) {
        // This means that the fetch request failed.
        // The request could not be sent or the server did not respond.
        console.error("Error during fetch request: ", error);
        throw error;
      }
  
      const status = httpResponse.status;
      console.log("HTTP response status: ", status);
      if (status === 200) {
        // 200 means that the request was successful.
        // The server responded with the data requested in JSON format.
        let deserializedObject = await httpResponse.json();
        return deserializedObject;
      } else if (status === 204) {
        // 204 means that the server has successfully processed the request
        // but that there is no content to send back.
        return null;
      } else {
        // The server responded with an error status.
        const errorObject = await httpResponse.json();
        console.error("Error message from the server:", errorObject);
        throw errorObject;
      }
    }
  
    static async genericGetRequest(endpoint, queryParams) {
      console.log("genericGetRequest called");
      return await this.genericRequest(endpoint, "GET", queryParams, {});
    }

    static async signUp(){
      let endpoint = "user"
      return await this.genericRequest(endpoint, "POST", {}, {})
    }
  
    static async getUserInfo(){
      let uid =  await storage.getUid()
      let sid =  await storage.getSid()
      //rconsole.log("getUserInfo:",sid,uid)
      let endpoint = "user/"+uid
      let queryParams = {sid: sid}
      //console.log("getUserInfo called with endpoint: ",endpoint, " and queryParams: ", queryParams);
      return await this.genericGetRequest(endpoint, queryParams);
    }

    

    static async putUserInfo(bodyParams){
        let uid =  await storage.getUid()
        let sid = await storage.getSid()
        let endpoint = "user/" + uid
        
        //let queryParams = {sid: await storage.getSid(), firstName: bodyParams.firstName, lastName: bodyParams.lastName, cardFullName: bodyParams.cardFullName, cardNumber: bodyParams.cardNumber, cardExpireMonth: bodyParams.cardExpireMonth, cardExpireYear: bodyParams.cardExpireYear, cardCVV: bodyParams.cardCVV, orderStatus: bodyParams.orderStatus};
        //console.log("putUserInfo called with endpoint: ",endpoint, " and queryParams: ", queryParams);
        bodyParams = {...bodyParams, sid: "AjIIWbICEQTRglNw2jBoHLBbgcwptYg13LNxQcBteL3DKfFyfyo2BNxJx8u2vTUD"}
        //console.log("bodyparams",bodyParams)
        return await this.genericRequest(endpoint, "PUT", {}, bodyParams);
    }

    static async getMenus(){
        let endpoint = "menu";
        let queryParams = { sid: await storage.getSid(), lat: await location.getLat(), lng:  await location.getLng() };
        //console.log("getMenus called with endpoint: ",endpoint, " and queryParams: ", queryParams);
        return await this.genericGetRequest(endpoint, queryParams);
    }

    static async getMenuImage(mid){
        let endpoint = "menu/" + mid + "/image";
        let queryParams = { sid: await storage.getSid(), mid: mid };
        //console.log("getMenuImage called with endpoint: ",endpoint, " and queryParams: ", queryParams);
        return await this.genericGetRequest(endpoint, queryParams);
    }

    static async getMenuDetails(mid){
      let endpoint = "menu/"+mid
      let queryParams = {sid: await storage.getSid(), lat: await location.getLat(), lng: await location.getLng() , mid: this.mid }
      //console.log("getMenuDetails called with endpoint: ",endpoint," and queryParams: ",queryParams);
      return await this.genericGetRequest(endpoint,queryParams)
    }

    static async postOrder(mid){
      let endpoint = "menu/"+mid+"/buy"
      let queryParams = {}
      let lat = await location.getLat(true)
      let lng = await location.getLng(true)
      console.log("lat e lng da postOrder",lat,lng)
      let bodyParams = {sid: await storage.getSid(), deliveryLocation: {lat: lat, lng: lng}}
      return await this.genericRequest(endpoint, "POST", queryParams, bodyParams)
    }
    static async getOrderStatus(oid){
      let endpoint = "order/" + oid 
      let queryParams = { sid: await storage.getSid(), oid: oid };
     // console.log("getMenuImage called with endpoint: ",endpoint, " and queryParams: ", queryParams);
      return await this.genericGetRequest(endpoint, queryParams);
  }


  }