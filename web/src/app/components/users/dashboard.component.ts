import { Component, TemplateRef, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import { CrisisInfoService } from '../../services/crisisInfo.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  modalRef: BsModalRef;
  saveCrisisInfo: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _crisisInfoService: CrisisInfoService,
    private alertService: AlertService,
    private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  get f() { return this.saveCrisisInfo.controls; }
  ngOnInit() {
    this.saveCrisisInfo = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      location: ['', Validators.required],
      subject: ['', Validators.required],
      comment: ['', Validators.required]

    });
  }
  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.saveCrisisInfo.invalid) {
      return;
    }

    this.loading = true;
    console.log(this.saveCrisisInfo.value);
    this.modalRef.hide();
    this._crisisInfoService.add(this.saveCrisisInfo.value)
      .pipe(first())
      .subscribe(
        data => {
          //this.router.navigate([this.returnUrl]);
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
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
