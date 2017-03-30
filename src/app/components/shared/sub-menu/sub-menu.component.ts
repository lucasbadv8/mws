import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html'
})
export class SubMenuComponent implements OnInit {
public totalItems:number = 0;
public userLogged: String = '';
  constructor(private cartService:CartService,private router:Router) {
    this.cartService.cartChange.subscribe((data)=>{
      console.log(data);
      this.totalItems = data.length;
    });
        
    var data = JSON.parse(localStorage.getItem('mws.user'));
    if(data)
      this.userLogged = data.name
    else
      this.userLogged = 'visitante';

    this.cartService.load();
   }
  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('mws.token');
    this.router.navigateByUrl('/');
  }

}
