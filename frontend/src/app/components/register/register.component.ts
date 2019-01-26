import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    isSubmitted = false;

    constructor() { }

    onSubmit() {
        this.isSubmitted = true;

        console.log(this.registerForm);
    }

    ngOnInit(): void {
        this.registerForm = new FormGroup({
            email: new FormControl("", [
                Validators.required,
                Validators.email]),
            password: new FormControl("", [
                Validators.required,
                Validators.minLength(5)]),
            repeatPassword: new FormControl("", [
                Validators.required,
                Validators.minLength(5)])
        });
    }
}
