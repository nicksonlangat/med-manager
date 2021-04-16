// register.page.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { HomePage } from 'src/app/home/home.page';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers:[HomePage],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;
  data: User ;
  constructor(
    private navCtrl: NavController,
    private fireApi: FirebaseService,
    private formBuilder: FormBuilder,
    private navigation:Router,
    private app:HomePage,
    private toastController:ToastController,
  ) {
    this.registerForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['',Validators.required],
      phone:['',Validators.required],
      password:['',Validators.required],
   
  });
   }

  ngOnInit() {
    
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Registration complete!',
      color: 'success',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  register(){
    this.data = this.registerForm.value;
    console.log(this.data)
    this.fireApi.register(this.data.email,this.data.password).then(res => {
      localStorage.setItem('userID',res.user.uid);
      this.fireApi.createUserProfile(this.data,res.user.uid).then(succ => {
        this.clear();
        this.app.getDetails(res.user.uid);
        this.navigation.navigate(["/login"]);
        this.presentToast();
      }).catch(
        err => {
          console.log(err) 
        })
    }).catch(error => {
      console.error(error);
    });
  }

  clear(){
    this.data.email = null;
    this.data.password = null;
    this.data.phone = null;
    this.data.firstName = null;
    this.data.lastName = null ;
}
  

}
