import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import IUser from "src/app/IUser";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {

        const cred = this.loginForm.value as IUser;

        this.authService.loginUser(cred).subscribe(result => {
            if (!result.isSuccessful) {
                console.log(result.error);
                this.form["email"].setErrors({error: result.error});
            } else {
                this.router.navigate(["/"]);
            }

        });
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl("", [
                Validators.required,
                Validators.email]),
            password: new FormControl("", [
                Validators.required])
        });
    }

    get form() { return this.loginForm.controls; }
}
