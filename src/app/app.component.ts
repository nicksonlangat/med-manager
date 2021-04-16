import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { timer } from 'rxjs';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { User } from './shared/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers:[StatusBar, SplashScreen],
})
export class AppComponent {
  check: any;
  showSplash=true;
  constructor(private statusBar: StatusBar,
    public database: AngularFirestore,
     private platform:Platform,
      private router:Router,  private splashScreen:SplashScreen,
       private storage: NativeStorage) {
  this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    this.statusBar.backgroundColorByHexString('#041E42');
    this.splashScreen.hide();
    if (this.platform.is('cordova')) {
    } else {
    }
    timer(3000).subscribe(() => this.showSplash = false)
    const onboarded = await this.storage.getItem('myitem')
    .then(data => this.check=data,
      error => console.error(error)
    );
    console.log('tara',this.check);
    if (onboarded) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/onboarding']);
    }
  }
}
