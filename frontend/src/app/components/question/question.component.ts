import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import IQuestion from "src/app/IQuestion";


@Component({
    selector: "question",
    templateUrl: "./question.component.html"
})

export class QuestionComponent implements OnInit {

    constructor(private dataService: DataService) {}
    question: IQuestion = { text: "" };

    ngOnInit() {
        console.log("ngOnInit ran...");
    }

    saveQuestion(question) {
        console.log(question);
        this.dataService.postQuestion(question);
    }
}
