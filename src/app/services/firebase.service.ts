import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
interface MedicineData {
  Name: string;
  Description:string;
  Quantity:string;
  Interval:number;
  Start:Date;
  Finish:Date,
  
}
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collectionName = 'Medicine';
  userID;
  allLists: any;
  constructor(
    private firestore: AngularFirestore,
    private af: AngularFireAuth,
    private nav:Router,
    private toastController:ToastController
  ) { }

  create_med(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  read_meds(id) {
    return this.firestore.collection(this.collectionName, ref=>{
      return ref.where('userID','==', id)
    }).snapshotChanges();
  }
  getLists(id) {
    this.allLists = this.firestore.collection<MedicineData>(this.collectionName, ref => {
      return ref.where('userID', '==', id)
    })
    return this.allLists.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
  });
}
  getMed(id) {
    return this.firestore.collection(this.collectionName).doc(id).valueChanges();
  }
  update_med(id, todo: MedicineData) {
    this.firestore.collection(this.collectionName).doc(id).update(todo)
    .then(() => {
      // this.router.navigate(['/todo-list']);
    }).catch(error => console.log(error));;
  }

  delete_med(id) {
    this.firestore.collection(this.collectionName).doc(id).delete();
  }

  register(email: string, password: any) {
    return this.af.createUserWithEmailAndPassword(email, password)
  }
  createUserProfile(data, id) {
    return this.firestore.collection('users').doc(id).set(data)
  }

  // login process
  login(email: any, password: any) {
    return this.af.signInWithEmailAndPassword(email, password);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You logged out!',
      color: 'danger',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
  //log out process
  logout() {
    this.af.signOut().then(
      () => {
        // localStorage.clear();
        this.presentToast();
        this.nav.navigate(['/login']);
      },
      error => {
        console.log(error);
      }
    );
  }

  //get the user profile
  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
    });
  }

}