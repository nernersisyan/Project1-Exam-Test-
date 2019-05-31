import {Component, OnInit} from '@angular/core';
import {TestsService} from '../shared/tests.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  form1: FormGroup;    //inputs
  form2: FormGroup;    //radioButtons
  tests: any = [];     //all tests
  item;                //the number of the test chosen by Math.random
  data = [];           //the array where the chosen test was pushed
  bool1 = false;       //start button boolean
  bool2 = false;       //fieldset boolean
  bool3 = true;        //finish button boolean
  bool4 = false;       //timer boolean
  answers = [];        //all the answers of the person
  showAnswers = [];    //array with /' Տրվել է Ճիշտ պատասխան'/' Պատասխան նշված չի եղել'/' Տրվել է սխալ պատասխան'
  printAnswer = false; //printAnswer boolean
  counter = 0;         //points of the person
  m = 30;               //minutes of the timer
  s = 0;               //second of the timer
  name;                //name of the person
  surname;             //surname of the person
  fathersName;         //father's name of the person
  orgName;             //organization the person represents


  constructor(private testsService: TestsService) {
  }

  ngOnInit() {
    this.testsService.getTests().subscribe((d) => {
      this.tests = d;
    });

    this.form1 = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      fathersName: new FormControl('', Validators.required),
      organizationName: new FormControl('', Validators.required)
    });

    this.form2 = new FormGroup({
      radioJan0: new FormControl(),
      radioJan1: new FormControl(),
      radioJan2: new FormControl(),
      radioJan3: new FormControl(),
      radioJan4: new FormControl(),
      radioJan5: new FormControl(),
    });
  }

  start() {
    let k = this.tests.length - 1;
    this.item = Math.round(k * Math.random());
    this.data.push(this.tests[this.item]);
    this.bool1 = true;
    this.bool3 = false;
  }

  finish() {
    this.bool2 = true;
    this.bool3 = true;
    for (let i = 0; i < this.data[0].length; i++) {
      this.answers.push(this.form2.get('radioJan' + i).value);
    }

    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i] == this.data[0][i].rightAnswer) {
        this.showAnswers.push(' Տրվել է Ճիշտ պատասխան');
        this.counter++;
      }
      else if (this.answers[i] === null)
        this.showAnswers.push(' Պատասխան նշված չի եղել');
      else
        this.showAnswers.push(' Տրվել է սխալ պատասխան');
    }

    this.bool4 = true;
    this.printAnswer = true;
    this.printTest();
    this.getData();
  }


  timer() {
    let stop = setInterval(() => {
      if (this.m > 0 && this.s === 0) {
        this.s = 60;
        this.m--;
      }
      this.s--;
      if (this.m === 0 && this.s === 0) {
        this.finish();
        this.bool2 = true;
        this.bool4 = true;
        clearInterval(stop);
        this.printTest();
        this.getData();
      }
    }, 1000);
  }

  dangerTime() {
    if (this.m < 3) {
      return true;
    }
  }

  printTest() {
    setTimeout(() => {
      window.print();
    }, 1000);
  }

  getData() {
    this.testsService.addData(this.name, this.surname, this.fathersName, this.orgName, this.item, this.counter, this.showAnswers).subscribe();
  }
}
