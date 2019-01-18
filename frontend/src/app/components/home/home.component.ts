import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-home",
    template: "<app-quiz></app-quiz><app-quiz-list></app-quiz-list>",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
