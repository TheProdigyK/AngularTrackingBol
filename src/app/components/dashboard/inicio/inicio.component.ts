import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  center = {lat: -16.529263586728273, lng: -68.1513189385239};
  zoom = 18;
  display?: google.maps.LatLngLiteral;
  constructor() { }

  ngOnInit(): void {
  }
  initMap(): void{

  }

}
