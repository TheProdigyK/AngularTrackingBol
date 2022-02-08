import { UserI } from './../../../models/user.interface';
import { VehiculoI } from './../../../models/vehiculo.interface';
import { RealtimeI } from './../../../models/realtime.interface';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { RealtimeService } from 'src/app/services/realtime.service';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, concatMap, interval } from 'rxjs';
import { from as observableFrom } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnChanges {
  center = {lat: -16.529263586728273, lng: -68.1513189385239};
  zoom = 10;
  display?: google.maps.LatLngLiteral;

  loginData: any = [];
  
  list_latlon: any = [];
  options:any = [];

  markers:any = [];
  loadMarkers: Promise<boolean> = Promise.resolve(true);

  private bounds?: google.maps.LatLngBounds;
  private image?: string;
  private div?: HTMLElement;
  
  currentUser: UserI;
  constructor(private vehiclesService: VehiclesService, private realtimeService: RealtimeService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  
  
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  marker = {
    position: {lat: -16.529263586728273, lng: -68.1513189385239},
  }
  
  create_marker(message: string){
    //placa 5155-AAA
    let split_message = message.split('=');
    let lat = split_message[1].split(',',1)[0]
    let lng = split_message[2].split(',',1)[0]
    var myLatlng = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));
    let marker = {position: {lat: myLatlng.lat(), lng: myLatlng.lng()}};
    console.log(marker)
    return marker;

  }
  
  vehiclesFunction(headerDict: any){
    this.vehiclesService.getVehicles(headerDict).subscribe(
      vehicles_data => {
        console.log(vehicles_data)
        
        interval(5000).subscribe(() => {
          this.realtimeFunction(headerDict, vehicles_data)
        })
        
        //this.realtimeFunction(headerDict, vehicles_data)
        
      }
    )
  }

  realtimeFunction(headerDict: any, vehicles_data: VehiculoI[]){
    console.log('entry')
    let img_url: string = ''
    let vec = []
    vec.push(vehicles_data[1])
    observableFrom(vec).pipe(
      concatMap(entry => {
        console.log(entry);
        img_url = entry.imagen
        let ccid_ = '8959102072074357364'
        return this.realtimeService.getRealTime(headerDict, 'http://amuyutec.xyz/tiempoReal-0.0.1/dispositivo/datos/' + entry.ccid
        )})
    ).subscribe(
      realtime => {
        //console.log(response)
        var icon = {
          url: img_url + '#custom_marker', // url + image selector for css
          scaledSize: new google.maps.Size(64, 64), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0.5, 0.5), // anchor 0.5
          
        };

        for (const i in this.list_latlon.length){
          if(this.list_latlon[i] == parseFloat(realtime.id_dispositivo)){
            this.list_latlon.splice(i, 1)
          }
        }
       
        this.list_latlon.push({
          position: {
            lat: this.create_marker(realtime.mensaje).position.lat,
            lng: this.create_marker(realtime.mensaje).position.lng,
          },
          options: {
            icon: icon,
          },
          id: parseFloat(realtime.id_dispositivo),
        });
        
        
      },
      error => console.log(error),
      () => console.info("ALL REQUEST DONE!!")
    )
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngOnInit(): void {
    
    console.log(this.currentUser)
    
    const headerDict = {
      'Authorization': this.currentUser.respuesta,
      'User-T': this.currentUser.id_persona.toString(),
    }
    this.vehiclesFunction(headerDict);
    
  }
  initMap(): void{
    
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    })
  }


}
