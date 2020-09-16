import { Component, OnInit } from '@angular/core';
import {AnswerKey, QuizModel, Status, UserInputQuiz} from "../_model/Interfaces";
import {ControllerService} from "../_service/controller.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {


  quizList: QuizModel[] = [] as QuizModel[]; /*[
    {
      quizId: 0,
      question: "Добре ви вмієте знаходити рішення проблемі в предметній області?",
      specializationId: 1,
      answerQuizs:
        [
          {"answerId": 0,"insideId": 0, "answer": "Дуже погано", "question_id": 6},
          {"answerId": 1, "insideId": 1, "answer": "Погано", "question_id": 6},
          {"answerId": 2, "insideId": 2, "answer": "Добре", "question_id": 6},
          {"answerId": 3, "insideId": 3, "answer": "Дуже добре", "question_id": 6}
        ]
    },/*
    {
      quizId: 1,
      question: "Як ви дивитесь на можливість аналізувати різноманітні системи?",
      specializationId: 2,
      answerQuizs:
        [
          {"answerId": 0,"insideId": 0, "answer": "Дуже погано", "question_id": 7},
          {"answerId": 1, "insideId": 1, "answer": "Погано", "question_id": 7},
          {"answerId": 2, "insideId": 2, "answer": "Добре", "question_id": 7},
          {"answerId": 3, "insideId": 3, "answer": "Дуже добре", "question_id": 7}
        ]
    },
    {
      quizId: 2,
      question: "Як у Вас розвинуте критичне мислення?",
      specializationId: 3,
      answerQuizs:
        [
          {"answerId": 0,"insideId": 0, "answer": "Дуже погано", "question_id": 8},
          {"answerId": 1, "insideId": 1, "answer": "Погано", "question_id": 8},
          {"answerId": 2, "insideId": 2, "answer": "Добре", "question_id": 8},
          {"answerId": 3, "insideId": 3, "answer": "Дуже добре", "question_id": 8}
        ]
    },
    // {
    //   quizId: 1,  question: "Inventor of java?", anslistobj: [{"answerId": 0, "answer":"Nayan.c"}, {"answerId": 1, "answer": "Ärmesh"}, {"answerId": 2, "answer":"Denish Richie"}, {"answerId": 3, "answer":"Kiran.DY"}]
    // },
    // {
    //   quizId: 2,  question: "how is java?", anslistobj: [{"answerId": 0, "answer":"Easy"}, {"answerId": 1, "answer": "Difficult"}, {"answerId": 2, "answer":"moderate"}, {"answerId": 3, "answer":"nonoe"}]
    // },
    // {
    //   quizId: 3,  question: "Inventor of cprogram?", anslistobj: [{"answerId": 0, "answer":"a"}, {"answerId": 1, "answer": "b"}, {"answerId": 2, "answer":"c"}, {"answerId": 3, "answer":"d"}]
    // } ,
    // {
    //   quizId: 4,  question: "Last question?", anslistobj: [{"answerId": 0, "answer":"1"}, {"answerId": 1, "answer": "2"}, {"answerId": 2, "answer":"3"}, {"answerId": 3, "answer":"4"}]
    // }
  ];*/

  questionId: number;
  question: String;
  specializationId: number;
  option: AnswerKey[];
  i: number = 0;
  quizLength: number;
  UserInput: UserInputQuiz[] = [] as UserInputQuiz[];
  answerCount: number = 0;
  status: Status[] = [] as Status[];
  index: number;


  constructor(private controllerService: ControllerService) {

    this.loadPage();
  }

  ngOnInit(): void {
    this.loadPage();
  }



  loadPage() {
    this.controllerService.getQuizs().subscribe(data => {
      this.quizList = data;
      // for (let i = 0; i < data.length; i++) {
      //   this.quizList[i].quizId = i;
      // }
      console.log(this.quizList);
      console.log(this.quizList.length);
      this.questionId = this.quizList[0].quizId
      this.question = this.quizList[0].question;
      this.specializationId = this.quizList[0].specializationId;
      this.option = this.quizList[0].answerQuizs;
      this.i = 0;
      this.quizLength = this.quizList.length;


      for (let i = 0; i <= this.quizList.length; i++) {
        this.status.push({id:i,status:false})
      }



    });
  }




  /******************************************************** */
  next() {
    if (this.i === this.quizLength-1) {
      --this.i;
    }
    ++this.i;
    this.question = this.quizList[this.i].question;
    this.specializationId = this.quizList[this.i].specializationId;
    this.option = this.quizList[this.i].answerQuizs;
    this.questionId = this.quizList[this.i].quizId;
  }
  previous() {
    --this.i;
    this.question = this.quizList[this.i].question;
    this.specializationId = this.quizList[this.i].specializationId;
    this.option = this.quizList[this.i].answerQuizs;
    this.questionId = this.quizList[this.i].quizId;
  }
  open(id: number){
    console.log(id);
    this.question = this.quizList[id-1].question;
    this.specializationId = this.quizList[id-1].specializationId;
    this.option = this.quizList[id-1].answerQuizs;
    this.questionId = this.quizList[id-1].quizId;
    this.i = id-1;
  }

  /********************************************************* */



  check(e, id: number, answer: String, questionId, specializationId : number, insideId : number) {

    if (e.target.checked) {

      let id: number = +sessionStorage.getItem("id");
      console.log(id);
      let tmp = { "student_id": id, "quiz_id": questionId, "quiz_answer": (insideId+1), "specialization_id" : specializationId };
      let flag = true;
      this.replaceDuplicate(tmp,flag);
      if (this.answerCount < this.quizLength) {
        this.next();
      }
    }
    console.log(this.UserInput);
  }

  replaceDuplicate(tmp: UserInputQuiz, flag:boolean) {

    console.log("Duplicate: tmp = " + tmp.quiz_id);
    loop:
    if (flag) {
      for (let i of this.UserInput) {
        console.log("Loop: i = " + i.quiz_id);
        if (i.quiz_id === tmp.quiz_id) {
          this.index = this.UserInput.indexOf(i);
          console.log("index: this.index = " + this.index);
          this.UserInput.splice(this.index,1,tmp);
          flag = true;
          break loop;
        }
      }
      flag = false;

    }

    if (flag === false) {
      this.UserInput.push(tmp);
      this.answerCount = this.UserInput.length;
      for (let i of this.status) {
        if (i.id === tmp.quiz_id) {
          this.status[i.id]= {id:i.id,status:true};
        }
      }
    }
  }

  submit(){
    this.controllerService.sendTest(this.UserInput).subscribe( data => {
      console.log(data);
    });
  }
}
