import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateNewWheelPage } from './create-new-wheel.page';

const routes: Routes = [
  {
    path: '',
    component: CreateNewWheelPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateNewWheelPage]
})
export class CreateNewWheelPageModule {}
