import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { nameof } from "../../helpers";
import IQuiz from "src/app/IQuiz";
import { DataService } from "src/app/services/data.service";
import IQuestion from "src/app/IQuestion";
import { PlayFinishedComponent } from "../play-finished/play-finished.component";

@Component({
  selector: "app-play-quiz",
  templateUrl: "./play-quiz.component.html",
  styleUrls: ["./play-quiz.component.css"]
})
export class PlayQuizComponent implements OnInit {

    questions: IQuestion[] = [];
    private _modal: PlayFinishedComponent = null;

    constructor(private dataService: DataService, private router: ActivatedRoute) { }

    ngOnInit() {
        const quizId = +this.router.snapshot.paramMap.get(nameof<IQuiz>("id"));
            this.dataService.getQuestionsByQuizId(quizId)
            .subscribe(res => this.questions = res);
    }

    bindModal(modalElement: PlayFinishedComponent) {
        this._modal = modalElement;
    }

    open() {
        this._modal.open();
    }

    close(result: boolean) {
        console.log("close callback");
    }

}
