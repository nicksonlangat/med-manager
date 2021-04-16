import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  providers:[Storage],
})
export class OnboardingPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private router: Router, private storage:NativeStorage) { }

  ngOnInit() {
  }

  next() {
    this.slides.slideNext();
  }
  finishAppOnboarding() {
    this.storage.setItem('myitem', {property: 'true'})
     .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
    this.router.navigate(['/home']);
  }
}
