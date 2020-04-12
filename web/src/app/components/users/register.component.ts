import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'Covid 19 Sample Project';
  registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService
        /*private authenticationService: AuthenticationService,

        private alertService: AlertService*/
    ) {
        // redirect to home if already logged in
        //  if (this.authenticationService.currentUserValue) {
           // this.router.navigate(['/']);
        //  }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', [Validators.required, Validators.minLength(10)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        // this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.registerForm.value);
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                  console.log(data);
                  // this.alertService.success('Registration successful', true);
                  // this.router.navigate(['/login']);
                },
                error => {
                   // this.alertService.error(error);
                    this.loading = false;
                });
    }

}
