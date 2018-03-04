import { Component } from '@angular/core';

import { HelpPage } from '../help/help';
import { OptionsPage } from '../options/options';
import { HomePage } from '../home/home';

import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HelpPage;
  tab2Root = HomePage;
  tab3Root = OptionsPage;

  constructor(private alertCtrl: AlertController) {}

  presentAbout() {
    let alert = this.alertCtrl.create({
      title: 'About Ai Team ❤',
      subTitle: '   ',
      message: 'We are a group of four girls in STEM and Business majors who identified a need and sought out to create a solution to address that need. The creation of LocGo originated from us wanting to have an app that could help us and anyone else navigate inside a building.',
      buttons: ['Dismiss']

    });
    alert.present();
  }


}
