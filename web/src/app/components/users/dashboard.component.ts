import { Component, ElementRef, ViewChild, NgZone, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
// import { get } from 'scriptjs';
// declare var klokantech;
// declare var google: any;
import { google } from 'google-maps';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // google maps zoom level
  // tslint:disable-next-line: no-inferrable-types
  zoom: number = 10;
  google: google;
  lat: number = 22.64536871990425;
  lng: number = 88.36807332534022;
  public searchControl: FormControl;
  @ViewChild('search', { static: true }) public searchElementRef: ElementRef;

  markers: marker[] = [
    {
      lat: 22.64536871990425,
      lng: 88.36807332534022,
      label: 'A',
      draggable: true,
      color: 'red',
      type: 'Medicine',
      number: 200
    },
    {
      lat: 22.64536871990425,
      lng: 88.30807332534022,
      label: 'B',
      draggable: false,
      color: 'blue',
      type: 'Water',
      number: 350
    },
    {
      lat: 22.589169494195684,
      lng: 88.41088771820068,
      label: 'C',
      draggable: true,
      color: 'green',
      type: 'Food',
      number: 400
    },
    {
      lat: 22.24536871990425,
      lng: 88.10807332534022,
      label: 'B',
      draggable: false,
      color: 'yellow',
      type: 'Others',
      number: 100
    },
  ];

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
  }
  ngOnInit() {
    // set google maps defaults
    this.zoom = 15;
    /* this.latitude = 39.8282;
    this.longitude = -98.5795; */

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    // this.recenterMap()

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }
  mapReady(event) {
    console.log(event);
    this.setCurrentPosition();
  }
  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 15;
        console.log(this.lat, this.lng);
      });
    }
  }

  getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude + (0.0000000000100 * Math.random());
        this.lng = position.coords.longitude + (0.0000000000100 * Math.random());
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  // mapLoad(map) {
  //   this.renderGeolocationControl(map);
  // }

  // renderGeolocationControl(map) {
  //   get('https://cdn.klokantech.com/maptilerlayer/v1/index.js', () => {
  //     const geoloccontrol = new klokantech.GeolocationControl(map, 18);
  //     console.log(geoloccontrol);
  //   });
  // }


}

// just an interface for type safety.
// tslint:disable-next-line: class-name
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  color?: string;
  type?: string;
  number?: number;
}
