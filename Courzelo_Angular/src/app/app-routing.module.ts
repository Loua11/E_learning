import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackComponent } from './back/back.component';
import { FrontComponent } from './front/front.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
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
import { SidebarComponent } from './sidebar/sidebar.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { EvaluationManagementComponent } from './evaluation-management/evaluation-management.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { ForumManagementComponent } from './forum-management/forum-management.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path:"back",component:BackComponent},
  {path:"front",component:FrontComponent},
  {path:"login",component:LoginComponent},
  {path:"teacher",component:TeacherDashboardComponent},
  { path: 'classe', component: AllClassComponent },
  { path: 'addClass', component: AddClassComponent },
{path: 'addCourse', component: AddCourseComponent},
{path:'allCourse', component:AllCourseComponent},
  {path:'allComment', component:AllCommentComponent},
  {path:'addLesson', component:AddLessonComponent},
  {path:'allLesson', component:AllLessonComponent},
  {path:'allModule', component:AllModuleComponent},
  {path:'addModule', component:AddModuleComponent},
  {path:'addComment', component:AddCommentComponent},
  { path: 'updateClass/:id', component: UpdateClassComponent },
  { path: 'class-details/:id', component: DetailClassComponent },
  {path:'allProgram',component:AllProgramComponent},
  {path:'addProgram',component:AddProgramComponent},
  { path: 'updateProgram/:id', component: UpdateProgramComponent },
  { path: 'program-details/:id', component: DetailProgramComponent },
  {path: 'comment-details/:id', component:DetailCommentComponent},
  { path: 'updateComment/:id', component: UpdateCommentComponent },
  { path: 'updateCourse/:id', component: UpdateCourseComponent },
  {path: 'course-details/:id', component:DetailCourseComponent},
  {path: 'lesson-details/:id', component:DetailLessonComponent},
  { path: 'updateLesson/:id', component: UpdateLessonComponent },
  {path: 'module-details/:id', component:DetailModuleComponent},
  { path: 'updateModule/:id', component: UpdateModuleComponent },
  
  {path:'allevents', component:AlleventsComponent},
  { path: 'addEvent', component: AddEventComponent },
  { path: 'addSpeaker', component: AddspeakerComponent },
  { path: 'allspeakers', component: AllspeakersComponent },
  { path: 'allquizzes', component:AllquizzesComponent },
  { path: 'addQuiz', component: AddquizComponent },
  {path: 'allquestions' , component : AllquestionsComponent},
  {path: 'addQuestion' , component : AddquestionComponent},
  { path: 'updateEvent/:id', component: UpdateeventComponent },
  { path: 'showevent/:id', component: ShoweventComponent },
  { path: 'showquestion/:id', component: ShowquestionComponent },
  { path: 'showquiz/:id', component: ShowquizComponent },
  { path: 'showspeaker/:id', component: ShowspeakerComponent },
  { path: 'updateSpeaker/:id', component:UpdatespeakerComponent },
  { path: 'updateQuiz/:id', component:UpdatequizComponent},
  { path: 'updateQuestion/:id', component:UpdatequestionComponent},
  { path: 'addClaim', component: AddclaimComponent },
  { path: 'allclaims', component: AllclaimsComponent },
  {path : 'showsclaim/:id', component: ShowclaimComponent},
  { path: 'updateClaim/:id', component:UpdateclaimComponent},
  { path: 'courses', component:CourseManagementComponent},
  { path: 'courses', component:CourseManagementComponent},
  { path: 'evaluations', component:EvaluationManagementComponent},
  { path: 'events', component:EventManagementComponent},
  { path: 'forums', component:ForumManagementComponent},
  { path: 'tt', component:TestComponent},
  { path: 'content/:fileName', component: TestComponent },
  { path: 'dashboars', component:SidebarComponent},
  


  

  { path: '**', component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
