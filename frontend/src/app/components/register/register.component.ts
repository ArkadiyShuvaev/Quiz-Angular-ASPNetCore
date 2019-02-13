import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from "@angular/forms";
import IUser from "src/app/IUser";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    isSubmitted = false;

    private readonly minLength = 5;

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        this.isSubmitted = true;
        console.log(this.registerForm);
        // const cred = { email: this.registerForm.get("email").value,
        //     password: this.registerForm.get("password").value
        // } as IUser;

        const cred = this.registerForm.value as IUser;

        this.authService.registerUser(cred).subscribe(result => {
            if (!result.isSuccessful) {
                console.log(result.error);
                this.form["email"].setErrors({error: result.error});
            } else {
                this.router.navigate(["/"]);
            }

        });
    }

    ngOnInit(): void {
        this.registerForm = new FormGroup({
            email: new FormControl("", [
                Validators.required,
                Validators.email]),
            password: new FormControl("", [
                Validators.required,
                Validators.minLength(this.minLength)]),
            repeatPassword: new FormControl("", [
                Validators.required,
                Validators.minLength(this.minLength)])
        }, { validators: this.identityPasswordsValidator });
    }

    identityPasswordsValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
        const passw = control.get("password");
        const repeatPassw = control.get("repeatPassword");

        const result = passw && repeatPassw && passw.value === repeatPassw.value ? null
            : { arePasswordsNotIdentity: true};

        return result;
    }

    get form() { return this.registerForm.controls; }

}
