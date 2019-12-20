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
  classFeatures: any;
  firstLevelClass: any;
  totalLevel: any;
  allSkills = []
  listOfProf = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ]
  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getOneCharacterFromService(params['id']);
      this.getAllSkillsFromService()
      this.profCheck()
    })
    this.classFeatures = [];
    this.firstLevelClass = this.oneCharacter.character_class[0]
    this.totalLevel = this.oneCharacter.character_class.length
    
  }
  getOneCharacterFromService(id) {
    let observable = this._httpService.getOneCharacter(id);
    observable.subscribe(data => {
      this.oneCharacter = data['results'];
      this.getAllFeatures();
      this.getAllSkillsFromService()
      this.profCheck()
      console.log(this.listOfProf)
    })
  }
  profCheck() {
    console.log(this.oneCharacter.skills)
    console.log(this.allSkills)
    for (var i = 0; i < this.oneCharacter.skills.length; i++) {
      for(var j = 0; j< this.listOfProf.length; j++){
        if(this.oneCharacter.skills[i] == "Skill: "+this.allSkills[j].name){
          this.listOfProf[j]=1
        }
      }
    }
  }
  getAllSkillsFromService(){
    let obs = this._httpService.getAllSkills();
    obs.subscribe(data =>{
      if (data['results']) {
        this.allSkills = data['results'];
        console.log(this.allSkills)
      }
    })
  }


  getAllFeatures() {
    this.classFeatures = [];
    let character_class_name = this.oneCharacter.character_class[0]
    let character_level = this.oneCharacter.character_class.length
    console.log(character_level)
    console.log(character_class_name)
    for (var i = character_level; i > 0; i--) {
      let obs = this._httpService.getAllFeaturesForClassAndLevel(character_class_name.toLowerCase(), character_level)
      obs.subscribe(data => {
        console.log(data);
        for (var feature of data['results']) {
          var test = true;
          for (var f of this.classFeatures) {
            if (feature.name == f.name) {
              test = false
            }
          }
          if (test == true)
            this.classFeatures.push(feature)
        }
        console.log(data['results'])
        console.log(this.classFeatures)
      })
    }
  }
}
