import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

/**
 * Generated class for the BuildingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buildings',
  templateUrl: 'buildings.html',
})
export class BuildingsPage {

  roomNum = "";
  searchQuery: string = '';
  items: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public ViewCtrl: ViewController, private alertCtrl: AlertController) {
        this.initializeItems();
  }
  public closeModal(){
    this.ViewCtrl.dismiss();
  }
  initializeItems() {
    //Implemented all UWM buildings to test searching 11/4
    this.items = ['Alumni House (AH)','Alternative Fuels Emissions Testing Lab (ALT)', 'Architecture & Urban Planning Building (AUP)',
    'Art Building (ART)', 'Arts Center (AC)', 'Arts Center Lecture Hall (ACL)', 'Bolton (BOL)', 'Cambridge Commons (CAMB)',
    'Chapman Hall (CHA)', 'Chemistry Building (CHM)', 'Continuing Education Plankinton Building (CEP)', 'Cozzens & Cudahy Research Center (CCRC)',
    'Curtin Hall (CRT)', 'Cunningham Hall (CUN)', 'Electrical Substation East (ESE)', 'Enderis Hall (END)', 'Engelmann Hall (ENG)',
    'Engineering & Mathematical Sciences (EMS)', 'FairView Audiology Clinic (FRVW)', 'Garland Hall (GAR)', 'Global Water Center (GWC)',
    'Golda Meir Library (GML)','Great Lakes Research Facility (GLRF)', 'Greene Hall (GRH)', 'Greene Museum (GRM)','Grounds Building (GRD)',
    'Heating Plant (HP)', 'Hefter Conference Center (HCC)', 'Holton Hall (HLT)', 'Honors House (HON)', 'Innovation Campus Accelerator Building (ICAB)',
    'Johnston Hall (JOH)', 'Kenilworth Square Apartments (KSA)', 'Kenilworth Square East (KSE)', 'Kenwood Interdisciplinary Research Complex (KEN)',
    'Klotsche Center (KC)', 'Lamphan Hall (LAP)', 'Lubar (LUB)', 'Mellencamp Hall (MEL)', 'Merrill Hall (MER)', 'Mitchell Hall','Music Building (MUS)',
    'Norris Health Center (NHC)', 'Northwest Quadrant (NWQ)', 'Pavilion (PAV)', 'Pearse Hall (PER)', 'Physics Hall (PHY)', 'Purin Hall (PUR)',
    'RiverView Residence Hall (RVW)', 'Sabin Hall (SAB)', 'Sandburg Hall (SAN)','Saukville Field Station (SFS)', 'Theatre Building (THR)',
    'Transit Bus Shelter (TBS)', 'UWM Union (UN)', 'University Services & Research Building (USR)', 'Vogel Hall (VOG)', 'Zelazo Center (ZEL)',
    'Zilber School of Public Health (ZSPF)'
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);})
    }
  }

  itemSelected(item){
      let data = item.toString();
      let buildN = data;
      let prompt = this.alertCtrl.create({
        title: 'Specify a Room #?',
        message: "",
        inputs: [
          {
            name: 'RoomNumber',
            placeholder: '(optional)'
          },
        ],
        buttons: [
          {
          text: 'No',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
          {
            text: 'Yes',
            handler: data => {
              if(data!=null)this.roomNum=data.RoomNumber.toString();
              //console.log(this.roomNum);
            }
          }
        ]
      });
      prompt.setMessage(buildN);
      prompt.present();
      prompt.onDidDismiss(data => {
        this.ViewCtrl.dismiss(buildN+"`"+this.roomNum);
      });

  }

}
