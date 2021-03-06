import { Component,OnDestroy,OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy{

  private userSub!:Subscription;
  isAuthenticated = false;

 constructor(private dataStorageService:DataStorageService,private authService:AuthService) { }

  ngOnInit() {
  this.userSub = this.authService.user.subscribe(user=>{
    this.isAuthenticated = !!user; // similar to !user ? false :true
    console.log(!user);
    console.log(!!user + "!!");
  });
  }
  onSaveData(){ 
    this.dataStorageService.storeRecipe();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipe().subscribe();
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  onLogout(){
    this.authService.logout();
  }
}
