import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../validators/custom.validator';
import { Ui } from '../../utils/ui';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  providers: [Ui, DataService]
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public errors: any[] = [];
  constructor(private fb: FormBuilder, private ui: Ui, private dataService: DataService,private router:Router) {

    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.maxLength(160),
        Validators.minLength(5),
        Validators.required
        //,CustomValidator.EmailValidator
      ])],
      password: ['', Validators.compose([
        Validators.maxLength(20),
        Validators.minLength(6),
        Validators.required
      ])]
    });
    var token = localStorage.getItem('mws.token');
    if(token){
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() { }

  submit() {
    this.dataService
      .authenticate(this.form.value)
      .subscribe(res => {
        
        localStorage.setItem('mws.token', res.token);
        localStorage.setItem('mws.user', JSON.stringify(res.user));

        console.log(res);

        this.router.navigateByUrl('/home');
      }, error => {
        this.errors = JSON.parse(error._body).errors;
        console.log(error);
      });
  }


  showModal() {
    this.ui.setActive('modalTermosUso');
  }

  closeModal() {
    this.ui.setInactive('modalTermosUso');
  }
}
