import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { HttpClientModule } from '@angular/common/http';
import { ArchiveService } from './archive.service';
import { AnimeComponent } from './anime/anime.component';
import { NavbarComponent } from './core/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewComponent,
    AnimeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent},
      { path: 'new', component: NewComponent},
      { path: 'anime', component: AnimeComponent}
    ])
  ],
  providers: [ArchiveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
