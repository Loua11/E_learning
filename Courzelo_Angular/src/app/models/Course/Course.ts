export class Course {
    idCourse?: string;
    title?: string;
    content?: string;
    datecourse?: Date;

    constructor(idCourse?: string, title?: string,content?:string, datecourse?: Date) {
        this.idCourse = idCourse;
        this.title = title;
        this.datecourse = datecourse;
      }
}