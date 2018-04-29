import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
//import * as jKstra from '../../../jKstra/jKstra.js';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { pmarker } from '../../models/pmarker/pmarker.interface';
import jKstra  from '../../jKstra/jKstra';

import {Geolocation} from '@ionic-native/geolocation';
import { BuildingsPage } from '../buildings/buildings';

declare var google:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 destination="";

  @ViewChild('map') mapElement;
  pos: any;
  myMark: any;
  marker=[];

  map: any;
  myMap: any;

  mapBounds: any;
  mapMinZoom: any;
  mapMaxZoom: any;
  //paths: AngularFireList<pmarker[]>;

  dbRef:AngularFireList<any>;
  paths:Observable<pmarker[]>;


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public fdb: AngularFireDatabase, public geolocation: Geolocation, public alertCtrl: AlertController) {

    //TODO If user clicks on a building, use that input to point at that node
    this.dbRef = this.fdb.list('uwm/bolton/bolf1');
    this.paths = this.dbRef.valueChanges();
    //this.floorMarkersRef$.suscribe(x => console.log(x));

    this.geolocation.getCurrentPosition().then((position) =>{
      this.pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log("GET initial position");
    }).catch((error)=>{console.log("BAD!")});

  }

  ionViewDidLoad(){
    this.initMap();
  }

//map initial centering
  initMap(){
  let defStyle =[
    //turn all feats off first beacause JS doesn't have setIndoorEnabled(false) as of 3/7/2018
  {"stylers": [{"visibility": "off"}]},
  {
    "featureType": "transit",
    "stylers":[{"visibility": "on"},]
  },
  {
    "featureType": "water",
    "stylers":[{"visibility": "on"},]
  },
  {
    "featureType":"administrative",
    "stylers": [{"visibility": "on"}]
  },
  {
    "featureType": "road",
    "stylers":[{"visibility": "on"},]
  },
  {//needed for library outline to show up
    "featureType": "poi",
    "elementType": "geometry",
    "stylers":[{"visibility": "on"}]
  },
  {//add  {"color":"#ff0051"} to stylers to "flatten" roof
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers":[{"visibility": "on"}]
  }
];

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
              //console.log(zoom + "/" + x + "/" + y + ".png");
              if (mapBounds.intersects(tileBounds) && (mapMinZoom <= zoom) && (zoom <= mapMaxZoom)){
                return "assets/tiles/" + zoom + "/" + x + "/" + y+ ".png";
            }

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


    let myMap = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    myMap.addListener("projection_changed", function() {
    myMap.overlayMapTypes.insertAt(0, maptiler);

    });

/*
*  CODE below are hard face values & not from database.
*  TODO 4/29/18: Sammie needs SQLite for her algorithms. As of current, IaOng's codes are not fully dependent on Firebase.
*  We can proceed with SQLite if Sammie is familiar with it to a good enough degree for May 1st Expo
*/


    // define nodes
    // TODO read nodes information from database
    //
    let myGraph = new jKstra.Graph();
    let n = [];
    n.push(myGraph.addVertex({id:0,x:1196,y:280}));
    n.push(myGraph.addVertex({id:1,x:1196,y:368}));
    n.push(myGraph.addVertex({id:2,x:1196,y:473}));
    n.push(myGraph.addVertex({id:3,x:1196,y:649}));
    n.push(myGraph.addVertex({id:4,x:1196,y:854}));
    n.push(myGraph.addVertex({id:5,x:1196,y:1048}));
    n.push(myGraph.addVertex({id:6,x:1196,y:1277}));
    n.push(myGraph.addVertex({id:7,x:1196,y:1390}));
    n.push(myGraph.addVertex({id:8,x:1196,y:1570}));
    n.push(myGraph.addVertex({id:9,x:1196,y:1800}));
    n.push(myGraph.addVertex({id:10,x:1196,y:1850}));
    n.push(myGraph.addVertex({id:11,x:1196,y:2045}));
    n.push(myGraph.addVertex({id:12,x:1196,y:2134}));
    n.push(myGraph.addVertex({id:13,x:1082,y:2134}));
    n.push(myGraph.addVertex({id:14,x:1196,y:2507}));
    n.push(myGraph.addVertex({id:15,x:1075,y:2769}));
    n.push(myGraph.addVertex({id:16,x:937,y:1800}));
    n.push(myGraph.addVertex({id:17,x:860,y:1800}));
    n.push(myGraph.addVertex({id:18,x:575,y:1800}));
    n.push(myGraph.addVertex({id:19,x:505,y:1800}));
    //
    myGraph.addEdgePair(n[0], n[1], 88);
    myGraph.addEdgePair(n[1], n[2], 105);
    myGraph.addEdgePair(n[2], n[3],176);
    myGraph.addEdgePair(n[3], n[4],205);
    myGraph.addEdgePair(n[4], n[5],194);
    myGraph.addEdgePair(n[5], n[6],229);
    myGraph.addEdgePair(n[6], n[7],113);
    myGraph.addEdgePair(n[7], n[8],180);
    myGraph.addEdgePair(n[8], n[9],230);
    myGraph.addEdgePair(n[9], n[10],50);
    myGraph.addEdgePair(n[10], n[11],195);
    myGraph.addEdgePair(n[11], n[12],89);
    myGraph.addEdgePair(n[12], n[13],114);
    myGraph.addEdgePair(n[12], n[14],450);
    myGraph.addEdgePair(n[14], n[15],114);

    myGraph.addEdgePair(n[9], n[16],200);
    myGraph.addEdgePair(n[16], n[17],77);
    myGraph.addEdgePair(n[17], n[18],285);
    myGraph.addEdgePair(n[18], n[19],70);

    // myGraph.addEdgePair(n[], n[],);
    // myGraph.addEdgePair(n[], n[],);
    // myGraph.addEdgePair(n[], n[],);
    // myGraph.addEdgePair(n[], n[],);
    // myGraph.addEdgePair(n[], n[],);
    // myGraph.addEdgePair(n[], n[],);
    // myGraph.addEdgePair(n[0], n[2], 8);
    // myGraph.addEdgePair(n[0], n[3], 16);
    // myGraph.addEdgePair(n[1], n[3], 10);
    // myGraph.addEdgePair(n[2], n[3], 7);
    // myGraph.addEdgePair(n[3], n[4], 5);
    // myGraph.addEdgePair(n[2], n[4], 4);
    // global jKstra //
    // ////
    //
    //  Find the shortest path
    //
    var opt = { flagKey: '_dijkstra' };
    var dijkstra = new jKstra.algos.Dijkstra(myGraph, opt);
    //var dijkstra = new jKstra.algos.BidirectionalDijkstra(myGraph,opt);

    const options = {
        edgeCost: e => e.data
    };
    let source=n[13];
    let dest=n[18];
    var path = dijkstra.shortestPath(source,dest, options);
    if (path != null)
    {
      let node;
      //console.log(path[0].from);
      let pathList=[];
      for(var p of path){
        node = p.from;
        pathList.push(map2LatLong(node.data.x,node.data.y));
      }
      pathList.push(map2LatLong(dest.data.x,dest.data.y));
      let myPath = new google.maps.Polyline({
          path: pathList,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
      });
      myPath.setMap(myMap);
    }
    //console.log(pathList);
    console.log(path.map(function (e) { return e.from.data.id; }).join());
//
//   draw polyline
//
      // let path = dijkstra.shortestPath(n[0],n[4],options);
      // alert(path.map(function (e) { return e.data;}));

      let pathCoordinates = [
          { lat: 43.076331, lng: -87.881091 },//node1
          { lat: 43.076305, lng: -87.881091 },//node2
          { lat: 43.076274, lng: -87.881091 },//node3
          { lat: 43.076221, lng: -87.881091 },//node4
          { lat: 43.076160, lng: -87.881091 },//node5
          { lat: 43.076102, lng: -87.881091 },//node6
          { lat: 43.076033, lng: -87.881091 },//node7
          { lat: 43.076000, lng: -87.881091 },//node8
          { lat: 43.075946, lng: -87.881091 },//9
          { lat: 43.075880, lng: -87.881091 },//10
          { lat: 43.075862, lng: -87.881091 },//11
          { lat: 43.075804, lng: -87.881091 },//12
          { lat: 43.075777, lng: -87.881091 }//13
      ];
      let myPath = new google.maps.Polyline({
          path: pathCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
      });

//Polyline in Hallway 200C
      let pathCoordinates2 = [
          { lat: 43.075887, lng: -87.881091 },//10
          { lat: 43.075887, lng: -87.881197 },//17
          { lat: 43.075887, lng: -87.881229 },//18
          { lat: 43.075887, lng: -87.881346 },//19
          { lat: 43.075887, lng: -87.881374 }//20
      ];
      let myPath2 = new google.maps.Polyline({
          path: pathCoordinates2,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
      });


      for (var node of n){
        let circle = new google.maps.Circle({
          strokeColor: '#0000ff',
          strokeOpacity: .08,
          fillColor: '#ff00ff',
          fillOpacity: .5,
          map: myMap,
          radius:.25,
          title:node.data.id,
          center: map2LatLong(node.data.x,node.data.y)
        });
        addInfoWindow(myMap,circle,'Hello');
      }


//Create "user" marker -- id is set to 0
this.myMark = new google.maps.Marker({
  position: this.pos,
  map: myMap,
  id: 0,
  icon: {
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: "#0a7777",
        scale: 3
    },
});

//Update "user" marker location
this.geolocation.watchPosition().subscribe((position) => {
  this.pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  console.log("WATCH & UPDATE position");
  this.myMark.setPosition(this.pos);
});


    //set global ref to map for ext. helper methods
    this.map = myMap;
}

  goToMyPos(){
      this.map.setCenter(this.pos);

      var toVerify;

      let alert = this.alertCtrl.create({
        title: 'What level are you on?',
        message: 'Valid Inputs: B, G, number digits',
        enableBackdropDismiss: false,
        inputs: [
          {
            name: 'level',
            placeholder: 'Specify floor level'
          },
        ],
        buttons: [
          {
              text: 'OK',
              handler: data => {
                  console.log(JSON.stringify(data)); //to see the object
                  toVerify = data.level.toString().trim();

                  if( toVerify == "B" || toVerify == "b" || toVerify =="g" || toVerify == "G" || parseFloat(data.level) == toVerify){
                    console.log("Valid input!");
                    //TODO This will need to speak to the database to let us bring up the relevant info to display on myMap
                  }
                  else{
                    //alert will not close unless it gets valid input
                    return false;
                  }
              }
          }
        ],
      });
      alert.present();
  }

  reCenter(){
    //This is to be the "Campus Map View"
    this.map.setCenter(new google.maps.LatLng(43.077040, -87.881529));
    this.map.setZoom(15);
  }

  goTo(button){
    //Allows for input of desination currently
    //TODO Will need to allow for input of source also

    let destinationModal = this.modalCtrl.create('BuildingsPage');
    destinationModal.onDidDismiss(data => {
      //on modal close, retreive data  --- & set button text to it
      if(data!=null)this.destination=data.toString();
      console.log(this.destination);
    });
    destinationModal.present();
  }

}

function map2LatLong(x:number,y:number)
{
  let lat = -2.98778e-7*(y-2761)+43.075590;
  let long = 4.09334e-7*(x-171)-87.881511;
  //console.log({lat:lat,lng:long});
  return {lat:lat,lng:long};
  //return new google.maps.LatLng(lat,long);
}

function addInfoWindow(map,marker, message) {
//console.log(marker);
            var infoWindow = new google.maps.InfoWindow({
                content: message
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(map, marker);
            });
        }
