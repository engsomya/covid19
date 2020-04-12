import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // google maps zoom level
  // tslint:disable-next-line: no-inferrable-types
  zoom: number = 10;

  lat: number = 22.64536871990425;
  lng: number = 88.36807332534022;

  markers: marker[] = [
    {
      lat: 22.64536871990425,
      lng: 88.36807332534022,
      label: 'A',
      draggable: true
    },
    {
      lat: 22.64536871990425,
      lng: 88.30807332534022,
      label: 'B',
      draggable: false
    },
    {
      lat: 22.589169494195684,
      lng: 88.41088771820068,
      label: 'C',
      draggable: true
    }
  ];
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
    console.log(`clicked the marker: ${label || index}`)
  }
}

// just an interface for type safety.
// tslint:disable-next-line: class-name
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
