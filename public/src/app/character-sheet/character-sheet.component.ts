import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css']
})
export class CharacterSheetComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }
  oneCharacter: any;
  
  dexMod: any;
  conMod: any;
  intMod: any;
  wisMod: any;
  chaMod: any;



  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getOneCharacterFromService(params['id']);
      
    })
  }
  getOneCharacterFromService(id) {
    let observable = this._httpService.getOneCharacter(id);
    observable.subscribe(data => {
      this.oneCharacter = data['results'];
      console.log(this.oneCharacter)
    })
  }
  getModOfStat(num) {
    return Math.floor(num - 10) / 2
  }

  strMod = this.getModOfStat(this.oneCharacter.stats[0])

}
