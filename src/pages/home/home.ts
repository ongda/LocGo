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
  myMap: any;
  mapBounds: any;
  mapMinZoom: any;
  mapMaxZoom: any;
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
    let latLng = new google.maps.LatLng(43.076, -87.8813);

     let mapBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(43.075520, -87.881581),
        new google.maps.LatLng(43.076417, -87.880939));
    let mapMinZoom = 18;
    let mapMaxZoom = 25;



    let mapOptions ={
      center: latLng,
      zoom: 19,
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
    //let maptiler = new google.maps.ImageMapType({
    let maptiler = new google.maps.ImageMapType({
          getTileUrl: function (coord, zoom) {

              let proj = myMap.getProjection();
              let z2 = Math.pow(2, zoom);
              let tileXSize = 256 / z2;
              let tileYSize = 256 / z2;
              let tileBounds = new google.maps.LatLngBounds(
                  proj.fromPointToLatLng(new google.maps.Point(coord.x * tileXSize, (coord.y + 1) * tileYSize)),
                  proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * tileXSize, coord.y * tileYSize))
              );
              let y = coord.y;
              let x = coord.x >= 0 ? coord.x : z2 + coord.x
              console.log(zoom + "/" + x + "/" + y + ".png");
              if (mapBounds.intersects(tileBounds) && (mapMinZoom <= zoom) && (zoom <= mapMaxZoom))
                  return "../../../assets/tiles/" + zoom + "/" + x + "/" + y + ".png";
              else
                  return "https://www.maptiler.com/img/none.png";
          },
          tileSize: new google.maps.Size(256, 256),
          maxZoom: 25,
          minZoom: 18,
          isPng: true,
          name: 'Bolton',
          opacity: 1.0
      });




    //this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let myMap = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    myMap.addListener("projection_changed", function() {
      //let a=0/0;
      //alert("projection:"+myMap.getProjection());
      //map.mapTypes.set('mymap',maptiler);
      myMap.overlayMapTypes.insertAt(0, maptiler);

    });
//    map.setMapTypeId('roadmap');
    //this.map.overlayMapTypes.insertAt(0, maptiler);

//
//   draw polyline
//

      let pathCoordinates = [
          { lat: 43.075590, lng: -87.881511 },
          { lat: 43.075670, lng: -87.881485 },
          { lat: 43.075670, lng: -87.881085 },
          { lat: 43.076309, lng: -87.881085 },
          { lat: 43.076397, lng: -87.880976 }
      ];
      let myPath = new google.maps.Polyline({
          path: pathCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
      });

      myPath.setMap(myMap);




  //   google.maps.event.addListenerOnce(map,
  //     function(){
  //       console.log('ttttt');
  //       alert('hi');
  //     }
  //   );
  }

  reCenter(){
    this.map.setCenter(new google.maps.LatLng(43.077040, -87.881529));
  }

  goTo(){

  }

}
