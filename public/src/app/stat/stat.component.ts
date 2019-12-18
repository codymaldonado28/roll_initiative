import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  editCharacter: any;
  errors = [];

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getEditCharacter(params['id']);
    })
  }

  getEditCharacter(id){
    let obs = this._httpService.getOneCharacter(id);
    obs.subscribe(data => {
      if(data['results']){
        this.editCharacter = data['results'];
      }
    })
  }

  updateCharacter(){
    this.errors = [];
    let obs = this._httpService.updateCharacter(this.editCharacter);
    obs.subscribe(data => {
      if(data['results']){
        this._router.navigate(['/']);
      }
      else if(data['errors']){
        for(var key in data['errors']){
          this.errors.push(data['errors'][key]['message']);
        }
      }
    })
  }
}