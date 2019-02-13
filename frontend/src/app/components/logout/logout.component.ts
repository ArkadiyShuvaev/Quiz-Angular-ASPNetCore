import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"]
})
export class LogoutComponent {

    constructor(private authService: AuthService, private router: Router) { }

    onClick() {
        this.authService.logoutUser();
        this.router.navigate(["login"]);
    }
}
