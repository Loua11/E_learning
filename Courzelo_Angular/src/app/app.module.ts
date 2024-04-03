import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackComponent } from './back/back.component';
import { FrontComponent } from './front/front.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { FooterrComponent } from './footerr/footerr.component';
import { HeaderrComponent } from './headerr/headerr.component';
import { LoginComponent } from './login/login.component';
import { AddclaimComponent } from './Claim/addclaim/addclaim.component';
import { AllclaimsComponent } from './Claim/allclaims/allclaims.component';
import { ShowclaimComponent } from './Claim/showclaim/showclaim.component';
import { UpdateclaimComponent } from './Claim/updateclaim/updateclaim.component';
import { AddClassComponent } from './Class/add-class/add-class.component';
import { AllClassComponent } from './Class/all-class/all-class.component';
import { DetailClassComponent } from './Class/detail-class/detail-class.component';
import { UpdateClassComponent } from './Class/update-class/update-class.component';
import { AddCommentComponent } from './Comment/add-comment/add-comment.component';
import { AllCommentComponent } from './Comment/all-comment/all-comment.component';
import { DetailCommentComponent } from './Comment/detail-comment/detail-comment.component';
import { UpdateCommentComponent } from './Comment/update-comment/update-comment.component';
import { AddCourseComponent } from './Course/add-course/add-course.component';
import { AllCourseComponent } from './Course/all-course/all-course.component';
import { DetailCourseComponent } from './Course/detail-course/detail-course.component';
import { UpdateCourseComponent } from './Course/update-course/update-course.component';
import { AddEventComponent } from './Event/addevent/addevent.component';
import { AlleventsComponent } from './Event/allevents/allevents.component';
import { ShoweventComponent } from './Event/showevent/showevent.component';
import { UpdateeventComponent } from './Event/updateevent/updateevent.component';
import { AddLessonComponent } from './Lesson/add-lesson/add-lesson.component';
import { AllLessonComponent } from './Lesson/all-lesson/all-lesson.component';
import { DetailLessonComponent } from './Lesson/detail-lesson/detail-lesson.component';
import { UpdateLessonComponent } from './Lesson/update-lesson/update-lesson.component';
import { AddModuleComponent } from './Module/add-module/add-module.component';
import { AllModuleComponent } from './Module/all-module/all-module.component';
import { DetailModuleComponent } from './Module/detail-module/detail-module.component';
import { UpdateModuleComponent } from './Module/update-module/update-module.component';
import { AddProgramComponent } from './Program/add-program/add-program.component';
import { AllProgramComponent } from './Program/all-program/all-program.component';
import { DetailProgramComponent } from './Program/detail-program/detail-program.component';
import { UpdateProgramComponent } from './Program/update-program/update-program.component';
import { AddPublicationComponent } from './Publication/add-publication/add-publication.component';
import { DetailPublicationComponent } from './Publication/detail-publication/detail-publication.component';
import { PublicationComponent } from './Publication/publication/publication.component';
import { UpdatePublicationComponent } from './Publication/update-publication/update-publication.component';
import { AddquestionComponent } from './Question/addquestion/addquestion.component';
import { AllquestionsComponent } from './Question/allquestions/allquestions.component';
import { ShowquestionComponent } from './Question/showquestion/showquestion.component';
import { UpdatequestionComponent } from './Question/updatequestion/updatequestion.component';
import { AddquizComponent } from './Quiz/addquiz/addquiz.component';
import { AllquizzesComponent } from './Quiz/allquizzes/allquizzes.component';
import { ShowquizComponent } from './Quiz/showquiz/showquiz.component';
import { UpdatequizComponent } from './Quiz/updatequiz/updatequiz.component';
import { AddspeakerComponent } from './Speaker/addspeaker/addspeaker.component';
import { AllspeakersComponent } from './Speaker/allspeakers/allspeakers.component';
import { ShowspeakerComponent } from './Speaker/showspeaker/showspeaker.component';
import { UpdatespeakerComponent } from './Speaker/updatespeaker/updatespeaker.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { EvaluationManagementComponent } from './evaluation-management/evaluation-management.component';
import { ForumManagementComponent } from './forum-management/forum-management.component';
import { TestComponent } from './test/test.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StartquizComponent } from './Quiz/startquiz/startquiz.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import { TestquizComponent } from './Quiz/testquiz/testquiz.component';
import { InstructionComponent } from './Quiz/instruction/instruction.component';



@NgModule({
  declarations: [
    AppComponent,
    BackComponent,
    FrontComponent,
    TeacherDashboardComponent,
    FooterrComponent,
    HeaderrComponent,
    LoginComponent,

  AllClassComponent,
  AddClassComponent,
  AddCommentComponent,
  AllCommentComponent,

  AllClassComponent,
    AllCourseComponent,
    AddCourseComponent,

    AllLessonComponent,
    AddLessonComponent,
    AddModuleComponent,
    AllModuleComponent,
    PublicationComponent,
    AddPublicationComponent,
    AddProgramComponent,
    AllProgramComponent,
    UpdateClassComponent,

    DetailClassComponent,
    UpdateProgramComponent,
    DetailProgramComponent,
    DetailPublicationComponent,
    UpdatePublicationComponent,
    DetailModuleComponent,
    UpdateModuleComponent,
    UpdateLessonComponent,
    DetailLessonComponent,
    DetailCourseComponent,
    UpdateCourseComponent,
    DetailCommentComponent,
    UpdateCommentComponent,

    AddEventComponent,
    AlleventsComponent ,
    ShoweventComponent,
    AddspeakerComponent,
    AllspeakersComponent,
    AddquizComponent,
    AddquestionComponent,
    AllquestionsComponent,
    AllquizzesComponent,
    ShowspeakerComponent,
    ShowquizComponent,
    NotfoundComponent,
    ShowquestionComponent,
    UpdatespeakerComponent,
    UpdatequizComponent,
    UpdatequestionComponent,
    UpdateeventComponent,
    AddclaimComponent,
    ShowclaimComponent,
    AllclaimsComponent,
    UpdateclaimComponent,
    SidebarComponent,
    UserManagementComponent,
    CourseManagementComponent,
    EventManagementComponent,
    EvaluationManagementComponent,
    ForumManagementComponent,
    TestComponent,
    StartquizComponent,
    TestquizComponent,
    InstructionComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDividerModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
