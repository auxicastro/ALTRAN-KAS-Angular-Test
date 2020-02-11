import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable, timer } from 'rxjs';
import { WheatherDataService } from "./../service/wheather-data.service";

@Component({
  selector: 'app-render-temperature',
  templateUrl: './render-temperature.component.html',
  styleUrls: ['./render-temperature.component.css']
})
export class RenderTemperatureComponent implements OnInit {
  
  private subscription: Subscription;
  /* El componente debe refrescar las temperaturas de las ciudades y actualizarlas en Store cada 3 min. */
  every3Minutes: Observable<number> = timer(0, 180000);
  /* ciudades requeridas */
  dataInit = ['Santiago','Buenos Aires','Lima','Sao Paulo, Brazil'];
  data=[];
  historicoCity = [];

  constructor(
    private wheatherDataService: WheatherDataService,
    private router: Router
  ) {}


  ngOnInit(): void {
  this.subscription = this.every3Minutes.subscribe((seconds) => {
      this.reloadData();
    })
  }

  reloadData() {
    this.data = [];
    let self = this;
    this.dataInit.forEach(function (city) { 
      let d = {city:city,name:'',lat:0,lon:0,temp:[]};
      let current = self.checkSavedData(city);
      if (!current){
        self.getLatLon(d);
      }else{
        self.setLatLon(d, current);
        self.getTemp(d);
      }
    });  
  }
  /* 
  * verifica datos en storage 
  * @city:string
  */
  checkSavedData(city:string){
    let wheatherData = this.wheatherDataService.getWheatherDataFromStorage();
    if (wheatherData === null) { return null; }
    let found = wheatherData.filter(element => element.city === city);
    if (Array.isArray(found) && found.length) {
      return found[0];
    }
  }
  /* 
  * obtiene latitud y longitud de la ciudad  (subscribe to API)
  * @d:object
  */
  getLatLon(d){ 
    let self = this;
    this.wheatherDataService.getLatLon(d.city)
      .subscribe(data => {
        let result = data.Results[0]
        this.setLatLon(d, result);
        this.getTemp(d);
      }, error => console.log(error));
  }
  /* 
  * actualiza el objeto data
  * @d:object, @result:object
  */
  setLatLon(d, result){
    d.name = result.name;
    d.lat = result.lat;
    d.lon = result.lon;
  }
  /* 
  * obtiene temperatura de la ciudad (subscribe to API)
  * @d:object
  */
  getTemp(d){
    let self = this;
    this.wheatherDataService.getTemp(d.lat, d.lon)
      .subscribe(data => {
        d.temp=[{'celsius':data.main.temp, 'date':new Date()}];
        self.saveResp(d);
      }, error => console.log(error));
  }
  /* 
  * actualiza el objeto data
  * actualiza storage
  * @d:object
  */
  saveResp(d){ //console.log(d);
    this.data.push(d);
    this.wheatherDataService.setWheatherData(d);
  }
  /* 
  * evento click para visualizar historial de temperaturas
  */
  handleClick(city) {
    this.getHistorico(city);
  }
  /* 
  * obtiene historial de temperatura por ciudad
  */
  getHistorico(city) {
    this.historicoCity = this.wheatherDataService.getWheatherHistoricoDataCity(city);
  }

  ngOnDestroy(): void {
  this.subscription.unsubscribe();
  }

}