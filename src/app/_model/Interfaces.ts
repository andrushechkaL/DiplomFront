





export interface QuizModel {
  quizId : number;
  question : String;
  specializationId : number;
  answerQuizs: AnswerKey[];
}


export interface AnswerKey {
  answerId: number;
  insideId : number;
  answer: String;
  question_id : number;
}

export interface Subject {
  idSubject: number;
  subject: string;
  title: string;
  score: number;
}

export interface UserInputMarks {
  student_id: number;
  physics: number;
  dm: number;
  math_analysis: number;
  linear_algebra: number;
  algorithmization_programming: number;
  english: number;
  history: number;
  ukr_language: number;
  fp: number;
}

export interface UserInputQuiz {
  student_id: number;
  quiz_id: number;
  quiz_answer: number;
  specialization_id : number;
}

export interface Status {
  id: number;
  status: boolean;
}

export interface User {
  student_id: number;
  name: string;
  surname: string;
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export interface Result {
  student_id: string;
  name: string;
  surname: string;
  studentsResultSpecialization: ResultSpecialization;
  studentsResultMarks: ResultUserMarks;
  studentsResultMarksMap: studentsResultMarksMap;
  studentResultQuizMap: studentResultQuizMap;
  studentsResultQuiz: Array<UserInputQuiz>;

}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export interface ResultSpecialization {
  studentSpecializationId: number;
  studentId: number;
  systemAnalysisAndManagement: number;
  systemAnalysisFinancialMarket: number;
  artificialIntelligenceSystems: number;
  intelligentServiceOrientedDistributedComputing: number;
}

export interface ResultUserMarks {
  student_id: number;
  students_result_id: number;
  physics: number;
  dm: number;
  math_analysis: number;
  linear_algebra: number;
  algorithmization_programming: number;
  english: number;
  history: number;
  ukr_language: number;
  fp: number;
}

export interface studentsResultMarksMap {
  physics: number;
  dm: number;
  math_analysis: number;
  linear_algebra: number;
  algorithmization_programming: number;
  english: number;
  history: number;
  ukr_language: number;
  fp: number;
}

export interface studentResultQuizMap {
  systemAnalysisAndManagement: number;
  systemAnalysisFinancialMarket: number;
  artificialIntelligenceSystems: number;
  intelligentServiceOrientedDistributedComputing: number;
}

export interface PieChartData {
  title: string;
  name: string;
  y: number;
}

export interface FinalResult {
  id: number;
  studentId: number;
  systemAnalysisAndManagement: number;
  systemAnalysisFinancialMarket: number;
  artificialIntelligenceSystems: number;
  intelligentServiceOrientedDistributedComputing: number;
}

export interface Description {
  title: string;
  name: string;
  description: string;
}
