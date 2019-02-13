import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {

    authService: AuthService;

    constructor(private _authService: AuthService) {
        this.authService = _authService;
    }

    ngOnInit() {
    }

}
