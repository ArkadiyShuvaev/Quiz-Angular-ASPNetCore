import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { nameof } from "../../helpers";
import IQuiz from "src/app/IQuiz";
import { DataService } from "src/app/services/data.service";
import { PlayFinishedComponent } from "../play-finished/play-finished.component";
import { QuizQuestionStoreService } from "src/app/services/quiz-question-store.service";
import { IValidatedQuestion } from "src/app/IValidatedQuestion";
import { map } from "rxjs/operators";

@Component({
  selector: "app-play-quiz",
  templateUrl: "./play-quiz.component.html",
  styleUrls: ["./play-quiz.component.css"]
})
export class PlayQuizComponent implements OnInit {

    private _modal: PlayFinishedComponent = null;
    store: QuizQuestionStoreService = null;

    constructor(private dataService: DataService,
        private router: ActivatedRoute) { }

    ngOnInit() {
        const quizId = +this.router.snapshot.paramMap.get(nameof<IQuiz>("id"));
        this.store = new QuizQuestionStoreService(this.dataService, quizId);
    }

    bindModal(modalElement: PlayFinishedComponent) {
        this._modal = modalElement;
    }

    isAllAnswered(): boolean {
        return this.store.answeredQuestions.length === this.store.quizQuestions.length;
    }

    getCorrectAnswerCount() {
        return this.store.validatedQuestions$.pipe(
            map(res => {
                return res.filter(i => i.isAnswerCorrect).length;
            })
        );
    }

    validate() {

        this.store.validateQuestions().subscribe(res => {
            const correctQuestions: IValidatedQuestion[]
                = res.filter(q => q.isAnswerCorrect);
            const text = `Your score: ${correctQuestions.length} out of ${res.length}`;

            this._modal.text = text;
            this._modal.open();
        });
    }

    close(result: boolean) {
        console.log("close callback");
    }

}
