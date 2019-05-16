import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { BoatService } from '../services/boat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Boat } from '../entity/boat';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  boatForm: FormGroup;
  boat: Boat = new Boat();

  constructor(public api: BoatService,
              public loadingController: LoadingController,
              public alertController: AlertController,
              public route: ActivatedRoute,
              public router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.boatForm = this.formBuilder.group({
      name: [null, Validators.required],
      type: [null, Validators.required],
      loa: [null, Validators.required],
      beam: [null, Validators.required],
      draft: [null, Validators.required],
    });
  }

  async onFormSubmit(form) {
    this.boat.name = form.name;
    this.boat.type = form.type;
    this.boat.loa = form.loa;
    this.boat.beam = form.beam;
    this.boat.draft = form.draft;
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.api.addBoat(this.boat)
      .subscribe(res => {
          loading.dismiss();
          this.router.navigate(['/list']);
        }, (err) => {
          console.log(err);
          loading.dismiss();
        });
  }

}
