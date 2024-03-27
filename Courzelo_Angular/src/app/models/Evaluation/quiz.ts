import { Question } from "./question";

export class Quiz {


    idquiz?: string;
    description?: string;
    duration? : number;
    maxScore?: number;
    questions?: Question[];

  
      
   
  }

  export interface QuestionReference {
    $ref: string;
    $id: {
      $oid: string;
    };
  }
  
  export interface QuizWithQuestionReferences extends Omit<Quiz, 'questions'> {
    questions: QuestionReference[];
  }