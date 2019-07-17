import { DrinkType } from './../../dto/DrinkType';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'create-new-wheel',
  templateUrl: './create-new-wheel.page.html',
  styleUrls: ['./create-new-wheel.page.scss'],
})
export class CreateNewWheelPage implements OnInit {

  /*
    ToDo:
      1.) User will select drinks and their probabilities, this will dynamically fill the selectedDrinks array
      2.) Once finish is clicked we will call the createNewWheel method, which will create the Wheel object
          with the above array
      3.) we will get the currently stored wheels
      4.) add new wheel to the storage
      
  */

  private selectedDrinks: DrinkType[] = [];

  constructor() { }

  ngOnInit() {
  }

  createNewWheel(){

  }

}
