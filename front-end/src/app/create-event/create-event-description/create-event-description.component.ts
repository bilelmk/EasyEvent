import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Coordinate } from '../../shared/classes/Coordinate';
import { Event }  from '../../shared/classes/Event' ;
import { EventService} from '../../shared/services/http/event.service';
import { LanguageService } from '../../shared/services/interne/language.service';
import * as L from 'leaflet';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CreateEventService } from '../../shared/services/interne/create-event.service';

@Component({
  selector: 'app-create-event-description',
  templateUrl: './create-event-description.component.html',
  styleUrls: ['./create-event-description.component.scss']
})
export class CreateEventDescriptionComponent implements OnInit {

  map ;
  marker ;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  // imagePreview ;

  smallIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });

  descriptionForm : FormGroup ;
  currentEvent = new Event ;

  constructor(private eventService : EventService , private router : Router , private languageService  : LanguageService ,
              private createEventService : CreateEventService) { }

  ngOnInit() {
    // init description form
    this.descriptionForm = new FormGroup({
      'name' : new FormControl(null , Validators.required ),
      'description' : new FormControl(null , Validators.required ),
      'end_date' : new FormControl(null , Validators.required ),
      'start_date' : new FormControl(null , Validators.required ),
      'attendees_number' : new FormControl(null , Validators.required ),
    });

    // Get exist event and update form
    if(this.createEventService.getMyEvent()){
      this.currentEvent = this.createEventService.getMyEvent() ;
      this.udpdateForm() ;
    }
    this.createMap();
  }

  // Add description to event var in event service and move on to the plan page
  addDesciption() {

    // Get Coodinate
    let coordinate = new Coordinate ;
    coordinate.longitude = this.marker.getLatLng().lng ;
    coordinate.latitude = this.marker.getLatLng().lat;

    // Create new event and set attributes
    let event : Event = this.descriptionForm.value ;
    event.coordinate = coordinate ;

    this.createEventService.addDescription(event) ;
    this.router.navigate(['/main/create_event/create-event-plan']);
  }


  // set min date of end date
  minDate() {
    if(this.descriptionForm.value.start_date){
      return this.descriptionForm.value.start_date
    }
    else {
      return null ;
    }
  }


  // update the form with event data if exist
  udpdateForm(){
    this.descriptionForm.setValue({
      'name' : this.currentEvent.name,
      'description' : this.currentEvent.description,
      'end_date' : this.currentEvent.end_date,
      'start_date' : this.currentEvent.start_date,
      'attendees_number' :this.currentEvent.attendees_number,
    });

  }


  createMap() {
    let coordinate ;
    if(this.createEventService.getMyEvent()){
      coordinate = {
        lat: this.currentEvent.coordinate.latitude,
        lng: this.currentEvent.coordinate.longitude
      }
    }
    else{
      coordinate = {
        // Tunis coordinate
        lat: 36.786967,
        lng: 10.184326,
      }
    }

    const zoomLevel = 10;
    this.map = L.map('map', {
      center: [coordinate.lat, coordinate.lng],
      zoom: zoomLevel
    });
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 0,
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    mainLayer.addTo(this.map);

    this.map.addEventListener('click' , (e) => this.setMarkerCoordinate(e))

    this.marker = L.marker([coordinate.lat, coordinate.lng], { icon: this.smallIcon });
    this.marker.addTo(this.map)
  }


  setMarkerCoordinate(event :any){
    this.marker.setLatLng([event.latlng.lat, event.latlng.lng])
  }

  onPickImage(event : any){
    this.imageChangedEvent = event;

  }


  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    let name  = 'image' + (Date.now()) ;
    let file = this.dataURLtoFile(this.croppedImage , name ) ;
    let image = new FormData ;
    image.append('image' , file ) ;
    this.eventService.image = image  ;
  }

  // function to convert base64 to file
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  imageLoaded() { console.log( "imageLoaded" ) }

  cropperReady() { console.log( "cropperReady" ) }

  loadImageFailed() { console.log( "loadImageFailed" ) }

}
