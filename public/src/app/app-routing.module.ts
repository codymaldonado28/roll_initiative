import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CharacterSheetComponent } from './character-sheet/character-sheet.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {path: '', redirectTo: '/characters', pathMatch: "full"},
  {path: 'characters', component: HomeComponent},
  {path: 'character/show/:id', component: CharacterSheetComponent},
  {path: 'characters/create', component: CreateComponent},
  {path: '', pathMatch: 'full', redirectTo: '/characters/create' },
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
