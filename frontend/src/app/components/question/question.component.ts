import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import IQuestion from "src/app/IQuestion";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-question",
    templateUrl: "./question.component.html",
    styleUrls: ["./question.component.css"]
})

export class QuestionComponent implements OnInit {

    constructor(private dataService: DataService,
        private route: ActivatedRoute) {
            this._quizId = parseInt(route.snapshot.paramMap.get("quizId"));
            console.log("_quizId: " + this._quizId);
        }

    question: IQuestion = {
        text: "", quizId: 0, correctAnswer: "", answer1: "", answer2: "", answer3: ""
    };

    _quizId = 0;
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

    saveQuestion(question: IQuestion) {
        question.quizId = this._quizId;
        this.dataService.postQuestion(question);
    }

    updateQuestion(question: IQuestion): void {
        this.dataService.updateQuestion(question);
    }
}
