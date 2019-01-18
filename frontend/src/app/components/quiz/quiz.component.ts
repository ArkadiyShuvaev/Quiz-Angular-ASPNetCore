import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import IQuiz from "src/app/IQuiz";

@Component({
    selector: "app-quiz",
    templateUrl: "./quiz.component.html",
    styleUrls: ["./quiz.component.css"]
})
export class QuizComponent implements OnInit {

    constructor(private dataService: DataService) { }

    quiz: IQuiz = {} as IQuiz;
    isNewQuiz: boolean = this.quiz.id === undefined;

    ngOnInit() {
        this.dataService.quizSelected.subscribe(res => {
            this.quiz = res;
            this.isNewQuiz = this.quiz.id === undefined;
        });
    }

    saveQuiz(quiz: IQuiz): void {
        this.dataService.postQuiz(quiz);
    }

    resetToNew() {
        this.quiz = {} as IQuiz;
        this.isNewQuiz = true;
    }

    updateQuiz(quiz: IQuiz): void {
        this.dataService.updateQuiz(quiz).subscribe();
    }

}
