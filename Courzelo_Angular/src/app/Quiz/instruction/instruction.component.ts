import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from "../../Service/Evaluation/quiz.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit{
  qid:any;
  public quizz:any;
  constructor(private _route:ActivatedRoute,
              private quizService:QuizService,
              private router:Router) { }

  ngOnInit(): void {
    this.qid=this._route.snapshot.params['qid'];
    this.quizService.retrieveQuiz(this.qid).subscribe((data)=>{
      this.quizz=data;

      console.log("this is the quiz from the instrunction ",this.quizz)


    },error => {
      console.log(error);
      alert("error");


    });

  }


  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz?',

      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't save`,
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/start/'+this.qid]);
        // Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })


  }

  }




