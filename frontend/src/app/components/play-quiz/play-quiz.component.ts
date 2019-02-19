import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { nameof } from "../../helpers";
import IQuiz from "src/app/IQuiz";
import { DataService } from "src/app/services/data.service";
import { PlayFinishedComponent } from "../play-finished/play-finished.component";
import { QuizQuestionStoreService } from "src/app/services/quiz-question-store.service";
import { IValidatedQuestion } from "src/app/IValidatedQuestion";
import { map } from "rxjs/operators";
import { store } from "@angular/core/src/render3";

@Component({
  selector: "app-play-quiz",
  templateUrl: "./play-quiz.component.html",
  styleUrls: ["./play-quiz.component.css"]
})
export class PlayQuizComponent implements OnInit {

    private _modal: PlayFinishedComponent = null;
    private quizId: number;

    store: QuizQuestionStoreService = null;
    hasBeenEverValidated = false;

    constructor(private dataService: DataService,
        private router: ActivatedRoute) { }

    ngOnInit() {
        this.quizId = +this.router.snapshot.paramMap.get(nameof<IQuiz>("id"));
        this.store = new QuizQuestionStoreService(this.dataService, this.quizId);
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

            this.getCorrectAnswerCount().subscribe(correctAnswerCount => {
                this.hasBeenEverValidated = true;
                const text = `Your score: ${correctAnswerCount} out of ${res.length}.`;

                if (correctAnswerCount === this.store.quizQuestions.length) {
                    this._modal.title = "You win!";
                    this._modal.isDisplayRepeatBtn = false;
                    this._modal.text = text;
                } else {
                    const repeatText = `${text} Would you like to play this quiz again?`;

                    this._modal.title = "Your result";
                    this._modal.isDisplayRepeatBtn = true;
                    this._modal.text = repeatText;
                }

                this._modal.open();
            });
        });
    }

    onClose(isQuizRepeat: boolean) {
        if (isQuizRepeat) {
            this.store.reloadData(this.quizId);
        }
    }

}
