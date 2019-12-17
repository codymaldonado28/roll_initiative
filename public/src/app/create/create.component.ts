import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }
  newCharacter: any;
  errors = [];
  allRaces: any;
  allClasses: any;
  ngOnInit() {
    this.getAllClasses()
    this.getAllRaces()
    this.newCharacter = {
      name: '',
      description: '',
      race: '',
      character_class: '',
      inventory: [],
      stats: []
    }
  }
  createCharacter() {
    this.errors = []
    let obs = this._httpService.createCharacter(this.newCharacter)
    obs.subscribe(data => {
      if (data['results']) {
        this.newCharacter = {
          name: '',
          description: '',
          race: '',
          character_class: '',
          inventory: [],
          stats: []
        }
        console.log(data)
      }
      else if (data['errors']) {
        for (var key in data['errors']) {
          this.errors.push(data['errors'][key]['message']);
        }
      }
    })
  }
  getAllRaces() {
    let obs = this._httpService.getAllRaces();
    obs.subscribe(data => {
      if (data['results']) {
        this.allRaces = data['results'];
      }
    })
  }
  getAllClasses() {
    let obs = this._httpService.getAllClasses();
    obs.subscribe(data => {
      if (data['results']) {
        this.allClasses = data['results'];
      }
    })
  }
}

