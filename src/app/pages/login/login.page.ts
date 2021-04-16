import { Component, OnInit  } from '@angular/core';
import { LoadingController, ToastController,MenuController,  } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage implements OnInit {

//Variables
    shouldHeight = document.body.clientHeight + 'px';
    loading: any;
    errorCode: any;
    errorMessage: any;
    user ;
    passwordType: string = 'password';
    passwordIcon: string = 'eye-off';
    backButtonSubscription ;
    showSplash = true ;
    unread = [] ;
    phonenumber: string;
//objects

      public data: { email: any; password: any } = {
        email: null,
        password: null
      };

 
  constructor(
    public firestore: FirebaseService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public navCtrl: Router,
    public menuCtrl: MenuController,
    public fauth: AngularFireAuth,
    public location: Location,
    public ref : AppComponent,
  ) {
    
  }
 
  ngOnInit() {
  
  }
 // hide password btn
      
        hideShowPassword() {
          this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
          this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
      }
  
// redirect to home if logged in before
        redirect(){
          const id = localStorage.getItem('userID');
          if(id !== null){
            this.navCtrl.navigate(['/home']);
          }
        }

        async presentToast() {
          const toast = await this.toastController.create({
            message: 'You are logged in!',
            color: 'success',
            position: 'top',
            duration: 2000
          });
          toast.present();
        }

        submit() {
          this.firestore.login(this.data.email, this.data.password).then(
            resp => {
            console.log(resp)
            this.navCtrl.navigate(['/home']);
            this.presentToast();
            },
            () => {
              this.loading.dismiss();
              console.log('wrong email and password match','bottom');
              
            }
          );
        }
  
}
