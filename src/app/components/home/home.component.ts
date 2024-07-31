import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  constructor(private apiService: ApiService){}

  ngOnInit(){
    this.apiService.HomeDispositivos().subscribe(
      data => {
        console.log('Home dispositivos',data)
      }
    )
  }
  
}
