import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { DataService } from "src/app/services/data.service";
import IQuizList from "src/app/IQuizList";

@Component({
  selector: "app-play-list",
  templateUrl: "./play-list.component.html",
  styleUrls: ["./play-list.component.css"]
})
export class PlayListComponent implements OnInit {
    quizzes: IQuizList[];

    constructor(private dataService: DataService, private router: Router) { }

    selectQuiz(quiz: IQuizList) {
        this.router.navigate([`/playQuiz/${quiz.id}`]);
    }

    ngOnInit() {
        this.dataService.getPlayList().subscribe(res => {
            this.quizzes = res;
        });
    }
}
