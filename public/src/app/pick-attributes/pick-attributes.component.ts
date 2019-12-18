import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params} from '@angular/router'


@Component({
  selector: 'app-pick-attributes',
  templateUrl: './pick-attributes.component.html',
  styleUrls: ['./pick-attributes.component.css']
})
export class PickAttributesComponent implements OnInit {
  @Input() class_index: any;
  characterClass:any;
  classSkills:any;
  skills:any;
  constructor(
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.skills=[];
    this.classSkills=[];
    this.getOneClass(this.class_index)
  }
  getOneClass(class_index){
    let obs = this._httpService.getOneClass(class_index)
    obs.subscribe(data=> {
      console.log(data)
      this.characterClass = data;
      for(var skill of this.characterClass['proficiency_choices'][0]['from']){
        console.log(skill.name)
          this.classSkills.push({
            name: skill.name,
            added: false
        })
      }
      console.log(this.classSkills)
      console.log(this.characterClass)
      console.log(this.characterClass.name)
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
}

