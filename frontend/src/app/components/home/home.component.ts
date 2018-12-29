import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-home",
    template: "<app-question></app-question><app-questions></app-questions>",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
