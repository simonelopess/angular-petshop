import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;

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
      this.service.refreshToken()
        .subscribe((data: any) => {
          console.log(data);
          localStorage.setItem('petshop.token', data.token);
        },
          (error) => {
            localStorage.clear();
          }
        )
    }
  }

  submit() {
    this.service.authenticate(this.form.value)
      .subscribe((data: any) => {
        console.log(data);
        localStorage.setItem('petshop.token', data.token);
      },
        (error) => {
          console.log(error)
        }
      )
  }
}
