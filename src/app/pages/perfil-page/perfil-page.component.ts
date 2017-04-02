import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../validators/custom.validator';
import { Ui } from '../../utils/ui';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-perfil-page',
  templateUrl: './perfil-page.component.html',
  providers: [Ui, DataService]
})
export class PerfilPageComponent implements OnInit {

  constructor(private fb: FormBuilder, private ui: Ui, private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

}
