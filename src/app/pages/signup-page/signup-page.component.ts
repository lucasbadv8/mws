import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../validators/custom.validator';
import { Ui } from '../../utils/ui';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  providers: [Ui, DataService]
})
export class SignupPageComponent implements OnInit {
  public form: FormGroup;
  public errors: any[] = [];

  constructor(private fb: FormBuilder, private ui: Ui, private dataService: DataService, private router: Router) {
    this.form = this.fb.group({
      firstName: ['', Validators.compose([
        Validators.maxLength(40),
        Validators.minLength(3),
        Validators.required
      ])],
      lastName: ['', Validators.compose([
        Validators.maxLength(40),
        Validators.minLength(3),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.maxLength(160),
        Validators.minLength(5),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      document: ['', Validators.compose([
        Validators.maxLength(11),
        Validators.minLength(11),
        Validators.required
      ])],
      userName: ['', Validators.compose([
        Validators.maxLength(20),
        Validators.minLength(5),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.maxLength(20),
        Validators.minLength(6),
        Validators.required
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.maxLength(20),
        Validators.minLength(6),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.dataService.createUser(this.form.value).subscribe(result => {
      console.log(result);

      var login = {
          'username' : this.form.get('userName').value,
          'password': this.form.get('password').value
        };
       this.dataService.authenticate(login).subscribe(result => {
          console.log('logou com sucesso!');
          localStorage.setItem('mws.token', result.token);
          localStorage.setItem('mws.user', JSON.stringify(result.user));
          this.router.navigateByUrl('/home');
       },error => {
          this.router.navigateByUrl('/');
       }); 

    }, error => {
      console.log(error);
      this.errors = JSON.parse(error._body).errors;
    });
  }

}


// import { Component, OnInit } from '@angular/core';
// import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// import { CustomValidator } from '../../validators/custom.validator';
// import { DataService } from '../../services/data.service';
// import { Ui } from '../../utils/ui';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-signup-page',
//   templateUrl: './signup-page.component.html',
//   providers: [Ui, DataService]
// })
// export class SignupPageComponent implements OnInit {
//   public form: FormGroup;
//   public errors: any[] = [];

//   constructor(private fb: FormBuilder, private ui: Ui, private dataService: DataService, private router: Router) {
//     this.form = this.fb.group({
//       firstName: ['', Validators.compose([
//         Validators.minLength(3),
//         Validators.maxLength(40),
//         Validators.required
//       ])],
//       lastName: ['', Validators.compose([
//         Validators.minLength(3),
//         Validators.maxLength(40),
//         Validators.required
//       ])],
//       email: ['', Validators.compose([
//         Validators.minLength(5),
//         Validators.maxLength(160),
//         Validators.required,
//         CustomValidator.EmailValidator
//       ])],
//       document: ['', Validators.compose([
//         Validators.minLength(11),
//         Validators.maxLength(11),
//         Validators.required
//       ])],
//       username: ['', Validators.compose([
//         Validators.minLength(6),
//         Validators.maxLength(20),
//         Validators.required
//       ])],
//       password: ['', Validators.compose([
//         Validators.minLength(6),
//         Validators.maxLength(20),
//         Validators.required
//       ])],
//       confirmPassword: ['', Validators.compose([
//         Validators.minLength(6),
//         Validators.maxLength(20),
//         Validators.required
//       ])]
//     });
//   }

//   ngOnInit() {
//   }

//   submit() {
//     this.dataService.createUser(this.form.value).subscribe(result => {
//       alert('Bem vindo ao Modern Store');
//       this.router.navigateByUrl('/');
//     }, error => {
//       this.errors = JSON.parse(error._body).errors;
//     });
//   }
// }
