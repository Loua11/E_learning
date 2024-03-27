export class Claim {
    idclaim?: string;
    title?: string;
    dateclaim?: Date;
    typeclaim?: TypeClaim;
    status?: Status;
  
}
  
  export enum TypeClaim {
    Technical_Problem = 'Technical_Problem',
    Score='Score',
    Course_Content='Course_Content'
  }

  
  export enum Status {
    InProgress = 'InProgress',
    Pending= 'Pending',
    Resolved ='Resolved'
  }
  