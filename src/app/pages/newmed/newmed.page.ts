import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

interface MedicineData {
  Name: string;
  Description:string;
  Interval:number;
  Start:Date;
  Finish:Date,
  Time1:Date,
  Time2:Date,
  Time3:Date,
  User:any;
}

@Component({
  selector: 'app-newmed',
  templateUrl: './newmed.page.html',
  styleUrls: ['./newmed.page.scss'],
})
export class NewmedPage implements OnInit {
  medicineData: MedicineData;
  medicineForm: FormGroup;
  Name: string;
  Description:string;
  Interval:number;
  Start:Date;
  Finish:Date;
  Time1:Date;
  Time2:Date;
  Time3:Date;
  Quantity:any;
  userID;
  userName;
  data: any;


  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private navCtrl:NavController,
    private router:Router,
  ) {
    this.userID = localStorage.getItem('userID');
    this.userName = localStorage.getItem('Name');
    console.log(this.userID, this.userName)
    this.medicineData = {} as MedicineData;
  }

  ngOnInit() {
    this.medicineForm= this.fb.group({
      Name: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Interval: ['', [Validators.required]],
      Start: ['', [Validators.required]],
      Finish: ['', [Validators.required]],
      Time1: [''],
      Time2: [''],
      Time3: [''],
      User:[]
    })

    
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Medicine recorded successfully!',
      color: 'success',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
  

  async Loader() {
    const loading = await this.loadingController.create({
      message: 'SAVING MEDICINE...',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed! after 2 Seconds', { role, data });
  }
  CreateRecord() {
    console.log(this.medicineForm.value);
    this.Loader()
    let data = {
      "Name": this.Name,
      "Description": this.Description,
      "Interval": this.Interval,
      "Start": this.Start,
      "Finish":this.Finish,
      "Quantity":this.Quantity,
      "userID": this.userID,
      "createdBy": this.userName
    };
    
    this.firebaseService.create_med(data).then(resp => {
     
      this.presentToast();
      this.clearList();
    })
      .catch(error => {
        console.log(error);
      });
  }

  clearList() {
    this.Name=null;
    this.Description = null;
    this.Interval = null;
    this.Start= null;
    this.Finish= null;
    this.Quantity= null;
     
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_med(rowID);
  }
}
