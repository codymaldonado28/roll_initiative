import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params} from '@angular/router'


@Component({
  selector: 'app-pick-attributes',
  templateUrl: './pick-attributes.component.html',
  styleUrls: ['./pick-attributes.component.css']
})
export class PickAttributesComponent implements OnInit, OnChanges {
  @Input() classIndex: any;
  characterClass:any;
  classSkills:any;
  skills:any;
  allSpells:any;
  classSpells:any;
  constructor(
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.skills=[];
    this.classSkills=[];
    this.getOneClass(this.classIndex)
    this.getAllSpells()
    this.classSpells=[];
  }
  ngOnChanges(){
    this.getOneClass(this.classIndex)
    this.getAllSpells()
  }
  getOneClass(classIndex){
    this.classSpells=[];
    this.skills=[];
    this.classSkills=[];
    let obs = this._httpService.getOneClass(classIndex)
    obs.subscribe(data=> {
      console.log(data)
      this.characterClass = data;
      for(var skill of this.characterClass['proficiency_choices'][0]['from']){
          this.classSkills.push({
            name: skill.name,
            added: false
        })
      }
      console.log(this.classSkills)
    })
  }
  addSkill(skill){
    if (this.skills.length < this.characterClass['proficiency_choices'][0]['choose']){
      this.skills.push(skill);
    }
    else {
    let canceled=this.skills[this.skills.length-1];
    this.skills.splice(this.skills.length-1,1);
    this.skills.push(skill);
    canceled.added=false;
    }
    console.log(this.skills)
    skill.added=true
  }
  cancelSkill(skill){
    for(var i=0; i<this.skills.length; i++){
      if(this.skills[i]==skill){
        this.skills[i].added=false;
        this.skills.splice(i,1);
      }
      console.log(this.skills)
    }
  }
  checkClassAndLevel(url){
    let obs = this._httpService.checkClassAndLevel(url)
    obs.subscribe(data => {
      if (data['level'] <= 1){
      for(var check of data['classes'] ){
        if (check.name == this.characterClass.name){
          this.classSpells.push(data['name'])
        } 
      }     
      }
      console.log(this.classSpells)
    })
  }
  getAllSpells(){
    let obs= this._httpService.getAllSpells()
    obs.subscribe(data => {
      console.log(data)
      for (var spell of data['results']){
        this.checkClassAndLevel(spell['url'])
      }
    })
  }
}

