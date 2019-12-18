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
  oneRace: any;
  raceIndex: number;
  classIndex: number;
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
  chooseRace(race, raceIndex){
    this.newCharacter.race=race
    this.raceIndex=raceIndex
    this.getARace(raceIndex);
  }
  getARace(raceIndex) {
    let obs = this._httpService.getARace(raceIndex);
    obs.subscribe(data => {
      if (data) {
        this.oneRace = data;
      }
    })
  }
  chooseClass(character_class, classIndex){
    this.newCharacter.character_class=character_class
    this.classIndex = classIndex
    console.log({classIndex})
  }

}
