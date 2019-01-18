import { Component, OnInit } from "@angular/core";
import IQuiz from "src/app/IQuiz";
import { DataService } from "src/app/services/data.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-quiz-list",
    templateUrl: "./quiz-list.component.html",
    styleUrls: ["./quiz-list.component.css"]
})
export class QuizListComponent implements OnInit {

    constructor(private dataService: DataService) { }
    quizList: IQuiz[] = [];

    ngOnInit() {
        this.getQuizList();
    }

    getQuizList(): void {
        this.dataService.getQuizzes().subscribe(res => this.quizList = res);
    }

    selectQuiz(quiz: IQuiz): void {
        this.dataService.selectQuiz(quiz);
    }

}
