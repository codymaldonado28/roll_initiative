import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  allCharacters: any;

  ngOnInit() {
    this.getAllCharactersFromService()
  }

  getAllCharactersFromService() {
    let observable = this._httpService.getAllCharacters();
    observable.subscribe(data => {
      if (data['results']) {
        this.allCharacters = data['results']
      }
    })
  }

  destroyOneCharacter(id) {
    let observable = this._httpService.destroyCharacter(id);
    observable.subscribe(data => {
      if (data['results']) {
        this.getAllCharactersFromService()
      }
    })
  }
}
