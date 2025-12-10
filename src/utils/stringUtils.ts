import { API_URL, API_URL_LT, API_URL_LV, API_URL_CR, WAYBILL_URL, WAYBILL_URL_LT, WAYBILL_URL_LV, WAYBILL_URL_CR } from "@env";
import { loadString } from "./appStorage";

export const truncateText = (input: string,oldSize:number,newSize:number) => {
    return input?.length > oldSize ? `${input.substring(0, newSize)}..` : input;
  };


  export const getBaseUrl =async ()=>{
    const selectRegion = await loadString("base_url");
    if(selectRegion){
      if(selectRegion==="Latvia"){
      return API_URL_LV;
      }
      else if(selectRegion==="Lithuania"){
        return API_URL_LT;
      }
      else if(selectRegion==="Croatia"){
        return API_URL_CR;
      }
    }
    return API_URL;
  }


  export const getWayBillBaseUrl =async ()=>{
    const selectRegion = await loadString("base_url");
    if(selectRegion){
     if(selectRegion==="Latvia"){
    return WAYBILL_URL_LV;
     }
     else if(selectRegion==="Lithuania"){
      return WAYBILL_URL_LT;
     }
     else if(selectRegion==="Croatia"){
      return WAYBILL_URL_CR;
     }
    }
    return WAYBILL_URL;
  }