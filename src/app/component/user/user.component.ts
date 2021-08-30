import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  accountForm: FormGroup;
  id: string;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {

    this.authService.getUserSubject().subscribe(
      user => {
        this.user = user;
        if (!!this.user) {
          this.accountForm = this.formBuilder.group({
            name: [this.user.name, Validators.required],
            surname: [this.user.surname, Validators.required],
            email: [this.user.email, Validators.required],
            phoneNumber: [this.user.phoneNumber, Validators.required]
          });
        } else {
          this.accountForm = this.formBuilder.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            email: ['', Validators.required],
            phoneNumber: ['', Validators.required]
          });
        }
      }
    )
  }

  onSubmit() {
    if (this.accountForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.updateUser(this.accountForm.value)
      .subscribe({
        next: user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.authService.getUserSubject().next(user);
          this.loading = false;
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }
}
