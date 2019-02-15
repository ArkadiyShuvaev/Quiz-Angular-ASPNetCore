import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { nameof } from "../../helpers";
import IQuiz from "src/app/IQuiz";
import { DataService } from "src/app/services/data.service";
import IQuestion from "src/app/IQuestion";

@Component({
  selector: "app-play-quiz",
  templateUrl: "./play-quiz.component.html",
  styleUrls: ["./play-quiz.component.css"]
})
export class PlayQuizComponent implements OnInit {

    questions: IQuestion[] = [];

    constructor(private dataService: DataService, private router: ActivatedRoute) { }

    ngOnInit() {
        const quizId = +this.router.snapshot.paramMap.get(nameof<IQuiz>("id"));
        this.dataService.getQuestionsByQuizId(quizId)
            .subscribe(res => this.questions = res);
    }
}
