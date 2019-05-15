import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { BoatService } from '../services/boat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Boat } from '../entity/boat';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {


  boatForm: FormGroup;
  boat: Boat;


  constructor(public api: BoatService,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public route: ActivatedRoute,
              public router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getBoat(this.route.snapshot.params['id']);
    this.boatForm = this.formBuilder.group({
      name: [null, Validators.required],
      type: [null, Validators.required],
      loa: [null, Validators.required],
      beam: [null, Validators.required],
      draft: [null, Validators.required]
    });
  }

  async onFormSubmit(form) {
    this.boat.name = form.name;
    this.boat.type = form.type;
    this.boat.loa = form.loa;
    this.boat.beam = form.beam;
    this.boat.draft = form.draft;
    await this.api.updateBoat(this.boat.id, this.boat)
      .subscribe(res => {
        this.router.navigate(['/details', { id: res.id } ]);
      }, (err) => {
        console.log(err);
      }
    );
  }

  async getBoat(id) {
    if(this.route.snapshot.paramMap.get('id') == null) {
      this.warning('Must choose a boat from the list');
    } else {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      await this.api.getBoat(id)
        .subscribe(data => {
          this.boat = data;
          this.boatForm.setValue({
            name: data.name,
            type: data.type,
            loa: data.loa,
            beam: data.beam,
            draft: data.draft
          });
          loading.dismiss();
        }, err => {
          console.log(err);
          loading.dismiss();
        });
    }
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
