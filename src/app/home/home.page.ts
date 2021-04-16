import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { NavigationExtras, Router } from '@angular/router'; 
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { User } from '../shared/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // providers:[LocalNotifications],
})
export class HomePage {
  userID;
  userProfile = {
    "name": localStorage.getItem('Name'),
    "email": localStorage.getItem('email'),
    "lname": localStorage.getItem('LName')
  };
  User: User;
  public show = false;
  avatar: any;
  medicineList = [];
  msg:string;
  name:string;
  lname:string;
  email:string;
  filterTerm: string;
  selectedItem: any;
  isDataLoaded: boolean = false;
  today: number;
  myList;
  zeroList = false ;
  constructor(private firebaseService:FirebaseService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    public database: AngularFirestore,
    public loadingController: LoadingController,
     public router: Router,
     private toastController:ToastController,
     private localNotifications:LocalNotifications
     ) { }
     
  async ngOnInit(){
    this.name=this.userProfile.name
    this.lname=this.userProfile.lname
    this.email=this.userProfile.email
    this.userID = localStorage.getItem('userID');
    console.log(this.name,this.lname, this.email)
    console.log(this.userProfile.name)
    this.getTime();
    this.sendNotification()
    this.sendNotification1()
    this.sendNotification2()
    
    this.firebaseService.read_meds(this.userID).subscribe(data => {
      this.medicineList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Description: e.payload.doc.data()['Description'],
          Interval: e.payload.doc.data()['Interval'],
          Start: e.payload.doc.data()['Start'],
          Finish: e.payload.doc.data()['Finish'],
        };
      })
      console.log(this.medicineList);
    });
 
  }

  getallLists(){
    this.firebaseService.getLists(this.userID).subscribe(res => {
      this.myList = res ;      
      if(res.length !== 0){
        this.zeroList = true ;
        console.log(this.myList);
      }
    });
  }

  sendNotification(){
    this.localNotifications.schedule({ 
      id: 1,
      text: "Hello Nicky please take your 8AM medicine.",
      title: 'It is time!', 
      trigger: { 
        every: {
          hour: 8,
          minute: 0
        } ,
        count: 1,
      } 
    });
  }
  sendNotification1(){
    this.localNotifications.schedule({ 
      id: 1,
      text: "Hello Nicky please take your 12PM medicine.",
      title: 'It is time!', 
      trigger: { 
        every: {
          hour: 12,
          minute: 0
        } ,
        count: 1,
      } 
    });
  }

  sendNotification2(){
    this.localNotifications.schedule({ 
      id: 1,
      text: "Hello Nicky please take your 7PM medicine.",
      title: 'It is time!', 
      trigger: { 
        every: {
          hour: 19,
          minute: 0
        } ,
        count: 1,
      } 
    });
  }

  getItem(id) {
    this.firebaseService.getMed(id)
      .subscribe((item) => {
        this.selectedItem = item;
        console.log(item)
        let navigationExtras: NavigationExtras = {
          state: {
            post: this.selectedItem,
          }
        };
        this.router.navigate(['detail'], navigationExtras);
      
      })
  }

  delete(id){
    return this.firebaseService.delete_med(id)
  }

  async deleteItem(id) {
    let alert = this.alertCtrl.create({
        message: 'Are you sure you want to permanently delete this record?',
        buttons: [
            {
                text: 'No',
                handler: () => {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Yes',
                handler: () => {
                 this.delete(id)
                }
            }
        ]
    })
    ;(await alert).present()
  }

  getTime(){
    let day = new Date()
    let time = day.getHours();
    let date=day.getTime()
    
    if(time>=6 && time<12) {
     this.msg= 'GOOD MORNING'
     console.log(date)
     this.today=date
    }
    else if(time>+12 && time<18) {
     this.msg= 'GOOD AFTERNOON'
     this.today=date
    }
    else {
     this.msg= 'GOOD EVENING'
     console.log(date)
     this.today=date
    }
  }

   //Get user profile details from firestore
   getDetails(id) {
    this.database.collection('users').doc(id).valueChanges().subscribe(res => {
      this.User = res;
      localStorage.setItem('email', this.User.email);
      localStorage.setItem('Name', this.User.firstName);
      localStorage.setItem('LName', this.User.lastName);
      localStorage.setItem('Number', this.User.phone);
      // this.avatar = this.AvatarImage(this.User.firstName, 40);
      // localStorage.setItem('avatar', this.avatar)
      this.show = true;

    })
  }
  
  logout(){
    return this.firebaseService.logout();
  }
  

}
