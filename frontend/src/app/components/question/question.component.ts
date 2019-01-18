import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import IQuestion from "src/app/IQuestion";


@Component({
    selector: "app-question",
    templateUrl: "./question.component.html",
    styleUrls: ["./question.component.css"]
})

export class QuestionComponent implements OnInit {

    constructor(private dataService: DataService) {}
    question: IQuestion = { text: "" };
    isNewQuestion: boolean = this.question.id === undefined;

    questionList: IQuestion[] = [];
    isQuestionListEmpty = true;

    ngOnInit() {
        console.log("ngOnInit ran...");
        this.dataService.questionSelected.subscribe(res => {
            this.question = res;
            this.isNewQuestion = this.question.id === undefined;
        });

        this.dataService.getQuestions().subscribe(res => {
            this.isQuestionListEmpty = res.length === 0;
        });
    }

    resetToNew(): void {
        this.isNewQuestion = true;
        this.question = {} as IQuestion;
    }

    saveQuestion(question) {
        console.log(question);
        this.dataService.postQuestion(question);
    }

    updateQuestion(question: IQuestion): void {
        this.dataService.updateQuestion(question);
    }
}
