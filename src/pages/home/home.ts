import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { pmarker } from '../../models/pmarker/pmarker.interface'

declare var google:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement;
  map: any;
  //paths: AngularFireList<pmarker[]>;

  dbRef:AngularFireList<any>;
  paths:Observable<pmarker[]>;


  constructor(public navCtrl: NavController, public fdb: AngularFireDatabase) {

//If user clicks on a building, use that input to point at that node
    this.dbRef = this.fdb.list('uwm/bolton/bolf1');
    this.paths = this.dbRef.valueChanges();
    //this.floorMarkersRef$.suscribe(x => console.log(x));
  }

  ionViewDidLoad(){
    this.initMap();
  }

//map initial centering
  initMap(){
    let latLng = new google.maps.LatLng(43.077040, -87.881529);
    let mapOptions ={
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      fullscreenControl: false,
      zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
      streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        }
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  reCenter(){
    this.map.setCenter(new google.maps.LatLng(43.077040, -87.881529));
  }

  goTo(){

  }

}
