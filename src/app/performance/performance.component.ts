import { Component, OnInit } from '@angular/core';
import {Subject, UserInputMarks} from "../_model/Interfaces";
import { FormGroup, FormControl } from '@angular/forms';
import {ControllerService} from "../_service/controller.service";

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  // quizForm: FormGroup;
  performanceForm: FormGroup;

  subjects: Subject [] = [
    { idSubject: 1,subject: "math_analysis", title: 'Математичний аналіз', score: 0 },
    { idSubject: 2,subject: "dm", title: 'Дискретна математика', score: 0 },
    { idSubject: 3,subject: "physics", title: 'Фізика', score: 0 },
    { idSubject: 4,subject: "linear_algebra", title: 'Лінійна алгебра', score: 0 },
    { idSubject: 5,subject: "algorithmization_programming", title: 'Алгоритмізація і програмування', score: 0 },
    { idSubject: 6,subject: "english", title: 'Англійська', score: 0 },
    { idSubject: 7,subject: "history", title: 'Історія', score: 0 },
    { idSubject: 8,subject: "fp", title: 'Фізичне виховання', score: 0 },
    { idSubject: 9,subject: "ukr_language", title: 'Українська мова', score: 0 },
  ]

  result: Subject[] = [] as Subject[];
  conditionShow: boolean = false;
  conditionSuccessful: boolean = false;
  // resultFirst: UserInputQuiz[] = [] as UserInputQuiz[];


  // questions: Question [] = [
  //   { idQuestion: 0, question: 'Which one you chose', answers: [ { idAnswer: 0, answer: 'One' }, { idAnswer: 1, answer: 'Two' }, { idAnswer: 2, answer: '1' }, { idAnswer: 3, answer: '2' } ] },
  //   { idQuestion: 1, question: 'Only test', answers: [ { idAnswer: 0, answer: 'Three' }, { idAnswer: 1, answer: 'Four' }, { idAnswer: 2, answer: '3' }, { idAnswer: 3, answer: '4' } ]},
  // ];

  disable: boolean = false;

  constructor(private controllerService: ControllerService) {
    let groupSubject = {};
    this.subjects.forEach(subject => {
      groupSubject[subject.subject] = new FormControl('');
    })
    this.performanceForm = new FormGroup(groupSubject);
    this.performanceForm.valueChanges.subscribe((changeObj: any) => { this.disable = this.performanceForm.valid})
  }

  //quizForm = new FormGroup({

  //});

  ngOnInit(): void {


    // let group={};
    // this.questions.forEach(question => {
    //   group[question.idQuestion]=new FormControl('');
    // })
    // this.quizForm = new FormGroup(group);


  }
///////////////////////////////////////////////////////////////////////////////////
//   onSubmit() {
//     let tmp = this.quizForm.value;
//     console.log(tmp)
//     let i = 0
//     for (let key in tmp){
//
//       let obj = { idQuestion: i, idAnswer: key, answer: tmp[key] }
//       console.log(obj)
//        this.resultFirst.push(obj);
//       i++;
//     }
//     //let tmp = {idSubject: 0, title: 'test', score: 20};
//     console.log(this.resultFirst);
//     // console.log(this.quizForm.value)
//   }
///////////////////////////////////////////////////////////////////////////////////
  Save() {
    let data: UserInputMarks = this.performanceForm.value;
    data.student_id = +sessionStorage.getItem("id");
    console.log(data);
    this.controllerService.sendMarks(data).subscribe( data => {
      console.log(data);
    });

    // let i = 0
    //   for (let key in tmp){
    //     let obj = { idSubject: i, title: key, score: tmp[key] }
    //     this.result.push(obj);
    //     i++;
    //    }
    // console.log(this.result);

    }





}
