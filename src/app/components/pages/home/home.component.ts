import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/services/Moment';
import { environment } from 'environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{

  allMoments: Moment[] = []
  moments: Moment[] = []
  baseApiUrl = environment.baseApiUrl


  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
  
      console.log(items);
      
      this.moments = items.data.map(item => {
        item.created_at = new Date(item.created_at!).toLocaleDateString( 'pt-BR' );
        return item;
      }); 

      console.log(this.moments);

    });
  
  }

}
