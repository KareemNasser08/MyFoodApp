import { Component, OnInit } from '@angular/core';
import { FavserviceService } from '../../Services/favservice.service';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.scss']
})
export class FavsComponent implements OnInit {

  listData: any;


  constructor(private _FavserviceService: FavserviceService) { }

  ngOnInit(): void {
    this.onGetFavs();
  }
  onDeleteFav(id: number) {
    this._FavserviceService.deleteToFav(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);

      }, 
      complete: () => { 
        console.log('Completed Req!');
        this.onGetFavs();        
      }
    })
  }

  onGetFavs() {
    this._FavserviceService.getFavs().subscribe({
      next: (res) => {
        console.log(res);
        this.listData = res
      }
    })
  }
}
