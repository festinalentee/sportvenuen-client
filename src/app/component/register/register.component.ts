import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {User} from "../../model/user";
import {UserDetails} from "../../model/user-details";
import {Role} from "../../model/role";

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
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', ),
      surname: new FormControl('', ),
      email: new FormControl('', ),
      password: new FormControl('', ),
      confirmPassword: new FormControl('', ),
      phoneNumber: new FormControl('', )
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    let user: User = {id: null!, email: this.f.email.value, password: this.f.password.value, role: Role.ROLE_MEMBER, token: null!};
    let userDetails: UserDetails = {userId: user.id, name: this.f.name.value, surname: this.f.surname.value, phoneNumber: this.f.phoneNumber.value};;
    this.authService.register(user, userDetails)
      .subscribe({
        next: () => {
          this.router.navigate(['/login'], { relativeTo: this.route });
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  get name() { return this.f.name; }
  get email() { return this.f.email; }
  get password() { return this.f.password; }
}
