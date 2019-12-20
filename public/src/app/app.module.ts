import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { SidebarModule } from 'ng-sidebar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { CharacterSheetComponent } from './character-sheet/character-sheet.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateComponent } from './create/create.component';

import { StatComponent } from './stat/stat.component';
import { PickAttributesComponent } from './pick-attributes/pick-attributes.component';
@NgModule({
  declarations: [
    AppComponent,
    StatComponent,
    HomeComponent,
    CharacterSheetComponent,
    PageNotFoundComponent,
    CreateComponent,
    PickAttributesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SidebarModule.forRoot()
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
