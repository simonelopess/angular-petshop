import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(
    private service: DataService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(60),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],
    })
  }

  ngOnInit(): void {
    const token = localStorage.getItem('petshop.token');

    if (token) {
      this.busy = true;
      this.service.refreshToken()
        .subscribe((data: any) => {
          console.log(data);
          localStorage.setItem('petshop.token', data.token);
          this.busy = false;
        },
          (error) => {
            localStorage.clear();
            this.busy = false;
          }
        )
    }
  }

  submit() {
    this.busy = true;
    this.service.authenticate(this.form.value)
      .subscribe((data: any) => {
        console.log(data);
        localStorage.setItem('petshop.token', data.token);
        this.busy = false;
      },
        (error) => {
          console.log(error);
          this.busy = false;
        }
      )
  }
}
