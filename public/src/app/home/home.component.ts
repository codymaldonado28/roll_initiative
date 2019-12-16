import { Component, OnInit } from '@angular/core';
import { HttpService} from '../http.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _httpService: HttpService
  ) { }
  
  allCharacters: any;
  
  ngOnInit() {
    this.getAllCharactersFromService()
  }

  getAllCharactersFromService(){
    let observable = this._httpService.getAllCharacters();
    observable.subscribe(data => {
      if (data['results']) {
        this.allCharacters = data['results']
      }
    })
  }
}
