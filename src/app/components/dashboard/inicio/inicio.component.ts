import { UserI } from './../../../models/user.interface';
import { VehiculoI } from './../../../models/vehiculo.interface';
import { RealtimeI } from './../../../models/realtime.interface';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnChanges {
  center = {lat: -16.529263586728273, lng: -68.1513189385239};
  zoom = 12;
  display?: google.maps.LatLngLiteral;

  login_data: any = [];
  vehicles_data: any = [];

  list_latlon: any[] = [];
  options:any = [];

  markers:any = [];

  constructor(private vehiclesService: VehiclesService) {}
  
  
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  marker = {
    position: {lat: -16.529263586728273, lng: -68.1513189385239},
  }
  //marker = {
  //  position: {lat: -16.561770,lng: -68.215810}
  //}
  

  getdata(){
    /*
    this.vehiclesService.apikey.subscribe(
      login_data => {
        console.log(login_data);
        this.login_data = login_data
        
      }
    )*/
    const headerDict = {
      'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJzb2Z0dGVrSldUIiwic3ViIjoicGVkcm8yMDIxIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY0MzQ5MzI4OCwiZXhwIjoxNjc1MDI5Mjg4fQ.ex0RW8DA_m1Vis0hNlqcTmrEI1dglhq0XDkWRNaJ9vJFqQwnTtESHaQ7q0zyq7xhUKeEk214Zo6L1JTkrXq9KQ",
      'User-T': '1',
    }
    this.vehiclesService.getVehicles(headerDict).subscribe(
      (data) => {
        console.log(data);
        this.set_markers(data)

      }
    );
    
  }

  set_markers(data: VehiculoI[]){

    const headerDict = {
      'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJzb2Z0dGVrSldUIiwic3ViIjoicGVkcm8yMDIxIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY0MzQ5MzI4OCwiZXhwIjoxNjc1MDI5Mjg4fQ.ex0RW8DA_m1Vis0hNlqcTmrEI1dglhq0XDkWRNaJ9vJFqQwnTtESHaQ7q0zyq7xhUKeEk214Zo6L1JTkrXq9KQ",
      'User-T': '1',
    }
    
    let url: string = 'http://amuyutec.xyz/tiempoReal-0.0.1/dispositivo/datos/' + data[1].ccid
    let msg = '(latitud=-16.561770,longitud=-68.215810,imei=0000010000001Z)'
    this.list_latlon.push({
      position: {
        Lat: this.create_marker(msg).position.Lat,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      }
    });
      this.vehiclesService.getRealTime(headerDict, url).subscribe(
        (realtime) => {
          /*
          this.list_latlon.push({
            position: {
              Lat: this.create_marker(realtime.mensaje).position.Lat,
              Lng: this.create_marker(realtime.mensaje).position.Lng
            }
          });
          */
          var options = { icon: data[0].imagen}
          this.options.push(options)
          console.log(realtime)
          console.log(this.list_latlon)
        }
    )
    

  }

  create_marker(message: string){
    //placa 5155-AAA
    let split_message = message.split('=');
    let lat = parseFloat(split_message[1].split(',',1)[0]);
    let lng = parseFloat(split_message[2].split(',',1)[0]);
    let marker = {position: {Lat: lat, Lng: lng}};
    console.log(marker)
    return marker;




  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngOnInit(): void {
    this.getdata()
    this.addMarker()
    
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
