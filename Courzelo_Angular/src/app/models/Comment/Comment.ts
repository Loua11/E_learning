export class Comment {
    idComment?: string;
    message?: string;
    datecomment?: Date;

    constructor(idComment?: string, message?: string,  datecomment?: Date) {
        this.idComment = idComment;
        this.message = message;
        this.datecomment = datecomment;
      }
}