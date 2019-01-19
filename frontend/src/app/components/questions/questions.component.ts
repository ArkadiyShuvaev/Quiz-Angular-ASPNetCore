import { Component, OnInit } from "@angular/core";
import IQuestion from "src/app/IQuestion";
import { DataService } from "src/app/services/data.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-questions",
    templateUrl: "./questions.component.html",
    styleUrls: ["./questions.component.css"]
})
export class QuestionsComponent implements OnInit {

    questions: IQuestion[] = [];

    constructor(private _dataService: DataService, private _route: ActivatedRoute) { }

    ngOnInit() {
        // tslint:disable-next-line:radix
        const parsedQuizId: number = parseInt(this._route.snapshot.paramMap.get("quizId"));

        if (parsedQuizId > 0) {
            this._dataService.getQuestionsByQuizId(parsedQuizId).subscribe(
                res => this.questions = res
            );
        } else {
            this._dataService.getQuestions().subscribe(
                res => this.questions = res
            );
        }
    }

    selectQuestion(question: IQuestion): void {
        this._dataService.selectQuestion(question);
    }
}
