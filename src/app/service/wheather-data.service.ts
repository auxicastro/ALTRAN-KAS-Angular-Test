import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WheatherDataService {

  private storeItem = 'wheatherData';
  private baseUrlWheather = 'https://api.openweathermap.org/data/2.5/weather?'; //lat=35&lon=139
  private apiKeyOpenweathermap = 'ab8a7e462e6457145cf66f8ff856f13b';
  
  private baseUrlCityData = 'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?'; 
  private apiKeyRapidapi = '3fb5e9e169msh35a4280205a8812p13efcfjsna99b1833cdea';
  

  constructor(private http: HttpClient) { }

  /* 
  * obtiene latitud y longitud de una ciudad (API)
  * @city_name:string 
  */
  getLatLon(city_name: string): Observable<any> {
    const headers = new HttpHeaders({'x-rapidapi-key': `${this.apiKeyRapidapi}`});
    const encodedUrl = encodeURI(city_name); //escape para por ejemplo Buenos Aires
    return this.http.get(`${this.baseUrlCityData}location=${encodedUrl}`,{headers:headers});
  }
  /* 
  * obtiene temperatura en celsius (API)
  * @lat:number, @lon:number
  */
  getTemp(lat: number, lon:number): Observable<any> {
    return this.http.get(`${this.baseUrlWheather}lat=${lat}&lon=${lon}&appid=${this.apiKeyOpenweathermap}&units=metric`);
  }
  /* 
  * controla si guarda || actualiza data en store
  * @data:object
  */
  setWheatherData(data){
    let historico = this.getWheatherDataFromStorage();
    let historicoCity = this.getWheatherHistoricoDataCity(data.city);
    if (historicoCity.length) {
      historico.map(element => {
        if (element.city === data.city && data.temp[0]){ element.temp.push(data.temp[0]); }
      });
    }else { 
      historico = historico || [];
      historico.push(data); 
    }
    return this.setWheatherDataToStorage(historico);
  }
  /* 
  * guarda data en store
  * @data:object
  */
  setWheatherDataToStorage(data){
    return localStorage.setItem(this.storeItem, JSON.stringify(data));
  }
  /* 
  * obtiene historico de una ciudad
  * @city:string
  */
  getWheatherHistoricoDataCity(city) {
    let historico = this.getWheatherDataFromStorage();
    let historicoCity = [];
    if (historico){
      let found = historico.filter(element => element.city === city);
      if (Array.isArray(found) && found.length) {
        historicoCity = found;
      }
    }
    return historicoCity; 
  }
  /* 
  * obtiene data de store
  */
  getWheatherDataFromStorage(){
    let checkedjson = [];
    try {
      checkedjson = JSON.parse(localStorage.getItem(this.storeItem));
    } catch (e) { console.log('error', e); }
    return checkedjson 
  }
  /* 
  * elimina data de store
  */
  removeWheatherDataFromStorage(){
    return localStorage.removeItem(this.storeItem);
  }
  
}