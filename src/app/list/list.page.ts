import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BoatService } from '../services/boat.service';
import { Boat } from '../entity/boat';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  // List of Boats
  boats: Boat[] = [];


  constructor(public api: BoatService,
              public loadingController: LoadingController,
              public router: Router,
              public route: ActivatedRoute) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getBoats();
  }

  async getBoats() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.api.getBoats()
      .subscribe(res => {
        this.boats = res;
        console.log(this.boats);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boats, event.previousIndex, event.currentIndex);
  }

  toDetails(idBoat){
    this.router.navigate(['/details', { id: idBoat } ]);
  }

  toAdd(){
    this.router.navigate(['/add' ]);
  }
}
