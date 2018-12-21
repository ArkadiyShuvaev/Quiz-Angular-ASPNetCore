import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";


@Component({
    selector: "question",
    templateUrl: "./question.component.html"
})

export class QuestionComponent implements OnInit {

    constructor(private dataService: DataService) {}
    question: string;

    ngOnInit() {
        console.log("ngOnInit ran...");
        const posts = this.dataService.getPosts().subscribe(posts => {
            console.log(posts)            ;
        });
    }


    saveQuestion(question) {
        console.log(question);
        this.dataService.postQuestion(question);
    }
}
