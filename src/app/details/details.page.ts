import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { BoatService } from '../services/boat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Boat } from '../entity/boat';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  boat: Boat = { id: null, name: '', type: '', loa: 0, beam: 0, draft: 0};

  constructor(public api: BoatService,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public route: ActivatedRoute,
              public router: Router) {}

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getBoat();
  }

  async getBoat() {
    if (this.route.snapshot.paramMap.get('id') == null) {
      this.warning('Must choose a boat from the list');
    } else {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      await this.api.getBoat(this.route.snapshot.paramMap.get('id'))
        .subscribe(res => {
          console.log(res);
          this.boat = res;
          loading.dismiss();
        }, err => {
          console.log(err);
          loading.dismiss();
        });
    }
  }

  async delete(id) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.api.deleteBoat(id)
      .subscribe(res => {
        loading.dismiss();
        this.router.navigate([ '/list' ]);
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  toEdit(idBoat){
    this.router.navigate(['/edit', { id: idBoat } ]);
  }

  toList(idBoat){
    this.router.navigate(['/list']);
  }

  async warning(msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['']);
          }
        }
      ]
    });

    await alert.present();
  }

}
