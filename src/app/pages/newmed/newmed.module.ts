import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewmedPageRoutingModule } from './newmed-routing.module';

import { NewmedPage } from './newmed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewmedPageRoutingModule
  ],
  declarations: [NewmedPage]
})
export class NewmedPageModule {}
