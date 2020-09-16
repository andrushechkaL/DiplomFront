import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QuizModel, User, UserInputMarks, UserInputQuiz} from "../_model/Interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(private http: HttpClient) { }


  getQuizs() : Observable<QuizModel[]> {
    return this.http.get<QuizModel[]>("http://localhost:8080/getQuiz");
  }

  sendTest(data: UserInputQuiz[]) {
    // const body = {"student_id": 3, quiz_id}
    // student_id, quiz_id, quiz_answer,specialization_id
    console.log("Service log " + data[0].student_id);

    return this.http.post(`http://localhost:8080/addStudentQuizResult`,data);
  }

  sendMarks(data: UserInputMarks) {
    return this.http.post(`http://localhost:8080/addStudentMark`,data);
  }

  // studentAuthorization(data: User) {
  //   return this.http.get<User>('http://localhost:8080/addStudent', data)
  // }

  studentAuthorization(data: User) {
    return this.http.get(`http://localhost:8080/studentAuthorization?name=${data.name}&surname=${data.surname}`);
  }

  getStudentResult(id: number) {
    return this.http.get(`http://localhost:8080/checkRule?id=${id}`);
  }

  showFinalResult(id: number) {
    return this.http.get(`http://localhost:8080/getFinalResult?id=${id}`);
  }

}
