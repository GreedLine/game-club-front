import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient) {
  }

  hide = true;
  submitted = false;

  async onSubmit(): Promise<void> {
    console.log('success!');
    const url = 'http://localhost:3000/auth/login';
    this.submitted = true;

    if (this.loginForm.controls.login.errors ||
      this.loginForm.controls.password.errors) {
    } else {
      await this.http.post(url, this.loginForm.value, {responseType: 'text'}).toPromise()
        .then((res: any) => {
          console.log(res);

        }).catch((err: any) => {
          console.log('This is Error:');
          console.log(err);
        });
    }
  }

  ngOnInit(): void {
  }

}
