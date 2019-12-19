import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router'
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-pick-attributes',
  templateUrl: './pick-attributes.component.html',
  styleUrls: ['./pick-attributes.component.css'],
})


export class PickAttributesComponent implements OnInit, OnChanges {
  @Input() classIndex: any;
  characterClass: any;
  classSkills: any;
  characterSkills: any;
  allSpells: any;
  classSpells: any;
  characterSpells: any;
  spellLimit: number;
  characterClassMap: any;
  characterLevel: number;
  classFeatures: any;

  constructor(
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.characterClassMap = {
      1: 'barbarian',
      2: 'bard',
      3: 'cleric',
      4: 'druid',
      5: 'fighter',
      6: 'monk',
      7: 'paladin',
      8: 'ranger',
      9: 'rogue',
      10: 'sorcerer',
      11: 'warlock',
      12: 'wizard'
    }
    this.characterSkills = [];
    this.classSkills = [];
    this.getOneClass(this.classIndex)
    this.classSpells = [];
    this.characterSpells = [];
    this.spellLimit = 4;
    this.characterLevel = 1;
    this.classFeatures = [];
    this.getAllFeatures();
    this.getAllSpells();
  }
  ngOnChanges() {
    this.getOneClass(this.classIndex);
    this.getAllSpells();
    this.getAllFeatures();
  }
  getOneClass(classIndex) {
    this.classSpells = [];
    this.characterSkills = [];
    this.classSkills = [];
    let obs = this._httpService.getOneClass(classIndex)
    obs.subscribe(data => {
      console.log(data)
      this.characterClass = data;
      for (var skill of this.characterClass['proficiency_choices'][0]['from']) {
        this.classSkills.push({
          name: skill.name,
          added: false
        })
      }
      console.log(this.classSkills)
    })
  }
  addSkill(skill) {
    if (this.characterSkills.length < this.characterClass['proficiency_choices'][0]['choose']) {
      this.characterSkills.push(skill);
    }
    else {
      let canceled = this.characterSkills[this.characterSkills.length - 1];
      this.characterSkills.splice(this.characterSkills.length - 1, 1);
      this.characterSkills.push(skill);
      canceled.added = false;
    }
    console.log(this.characterSkills)
    skill.added = true
  }
  cancelSkill(skill) {
    for (var i = 0; i < this.characterSkills.length; i++) {
      if (this.characterSkills[i] == skill) {
        this.characterSkills[i].added = false;
        this.characterSkills.splice(i, 1);
      }
      console.log(this.characterSkills)
    }
  }
  getAllSpells() {
    console.log('get all spells running')
    this.characterSpells = [];
    let character_class_name = (this.characterClassMap[this.classIndex])
    console.log(character_class_name)
    for (let i = 0; i <= this.characterLevel; i++) {
      this.classSpells.push([])
      let obs = this._httpService.getAllSpellsForClassAndLevel(character_class_name, i)
      obs.subscribe(data => {
        for (var spell of data['results']) {
          this.classSpells[i].push({
            name: spell['name'],
            added: false
          })
        }
      })
    }
    this.characterSpells=[];
    for(let i=0; i<=this.characterLevel; i++){
      this.characterSpells.push([])
    }
    console.log("class spells:", this.classSpells)
  }
  getAllFeatures() {
    this.classFeatures = [];
    let character_class_name = (this.characterClassMap[this.classIndex])
    console.log(character_class_name)
    let obs = this._httpService.getAllFeaturesForClassAndLevel(character_class_name, this.characterLevel)
    obs.subscribe(data => {
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
  addSpell(spell,level) {
    console.log(level)
    console.log(this.characterSpells)
      if ( this.characterSpells[level].length<this.spellLimit ){
      this.characterSpells[level].push(spell);
    }
    else {
      let canceled = this.characterSpells[level][this.characterSpells[level].length - 1];
      this.characterSpells[level].splice(this.characterSpells[level].length - 1, 1);
      this.characterSpells[level].push(spell);
      canceled.added = false;
    }
    console.log(this.characterSpells)
    spell.added = true
  }
  cancelSpell(spell, level) {
    for (let i = 0; i < this.characterSpells.length; i++) {
      if (this.characterSpells[level][i] == spell) {
        this.characterSpells[level][i].added = false;
        this.characterSpells[level].splice(i, 1);
      }
      console.log(this.characterSpells)
    }
  }
}

