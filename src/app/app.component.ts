import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anime }  from './model/anime';
import { NgForm } from '@angular/forms';
import { NavbarComponent } from './core/navbar/navbar.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-navbar></app-navbar>
        <h1 class="mt-3 mb-3">Manga & Anime</h1>

        <img width="1100" src="https://wallpaperaccess.com/full/435.jpg" alt="">
    </div>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  animes?: Anime[];
  URL = 'http://localhost:3000';
  public isCollapsed: boolean = true;

  constructor(private http: HttpClient) {
    this.init();
  }

  init() {
    this.http.get<Anime[]>(this.URL + '/anime')
      .subscribe((res: any[] | undefined) => {
        this.animes = res;
      });
  }

  deleteHandler(animeToRemove: Anime) {
    this.http.delete(`${this.URL}/anime/${animeToRemove.id}`)
      .subscribe(() => {
        this.animes = this.animes!.filter(a => a.id !== animeToRemove.id);
      });
  }

  saveHandler(f: NgForm) {
    const anime = f.value as Anime;

    this.http.post<Anime>(`${this.URL}/anime/`, anime)
      .subscribe((dbanime) => {
        this.animes = [...this.animes!, anime]
        f.reset();
      });
  }


}
