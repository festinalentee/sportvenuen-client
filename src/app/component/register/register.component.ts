import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  get registerFormControls() {
    return this.registerForm.controls;
  }

  get name() {
    return this.registerFormControls.name;
  }

  get surname() {
    return this.registerFormControls.surname;
  }

  get email() {
    return this.registerFormControls.email;
  }

  get password() {
    return this.registerFormControls.password;
  }

  get confirmPassword() {
    return this.registerFormControls.confirmPassword;
  }

  get phoneNumber() {
    return this.registerFormControls.phoneNumber;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.requiredTrue]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(12)])
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.register(this.registerForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/login'], {relativeTo: this.route});
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  checkPasswords() {
    if (this.confirmPassword.value == this.password.value) {
      this.confirmPassword.setErrors(null);
    } else {
      this.confirmPassword.setErrors({mismatch: true});
    }
  }
}
