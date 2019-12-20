import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParseErrorLevel } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAllCharacters() {
    return this._http.get('/api/characters');
  }

  getOneCharacter(id) {
    return this._http.get(`/api/character/${id}`)
  }

  createCharacter(newCharacter) {
    return this._http.post('/api/character/create', newCharacter)
  }

  updateCharacter(updateCharacter) {
    return this._http.put(`/api/character/update/${updateCharacter._id}`, updateCharacter)
  }

  destroyCharacter(id) {
    return this._http.delete(`/api/character/destroy/${id}`);
  }
  getAllRaces() {
    return this._http.get('http://www.dnd5eapi.co/api/races')
  }
  getAllClasses() {
    return this._http.get('http://www.dnd5eapi.co/api/classes')
  }

  getOneClass(class_index){
    return this._http.get(`http://www.dnd5eapi.co/api/classes/${class_index}`)
  }
  getOneRace(race_index){
    return this._http.get(`http://www.dnd5eapi.co/api/classes/${race_index}`)
}
  getAllSpellsForClassAndLevel(name, level){
    return this._http.get(`http://www.dnd5eapi.co/api/spells/${name}/level/${level}`)
  }
  getAllFeaturesForClassAndLevel(name, level){
    return this._http.get(`http://www.dnd5eapi.co/api/features/${name}/level/${level}`)
  }
  getARace(raceIndex) {
    return this._http.get(`http://www.dnd5eapi.co/api/races/${raceIndex}`)
  }
  getAllSkills(){
    return this._http.get('http://www.dnd5eapi.co/api/skills')
  }
}
