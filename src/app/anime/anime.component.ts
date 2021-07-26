import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Anime } from '../model/anime';

@Component({
  selector: 'app-anime',
  template: `
    <div class="container">
      <h2 class="mt-4 mb-3">La tua lista Anime</h2>
      <form
        class="card card-body mt-2"
        #f="ngForm" (submit)="saveHandler(f)"
      >
        <input
          type="text"
          [ngModel]
          name="title"
          placeholder="Add title"
          class="form-control"
          required
          #labelInput="ngModel"
          [ngClass]="{'is-invalid': labelInput.invalid && f.dirty}"
        >

        <select
          [ngModel]
          name="genre"
          class="form-control"
          required
          #genreInput="ngModel"
          [ngClass]="{'is-invalid': genreInput.invalid && f.dirty}"
        >
          <option [value]="null">Select option</option>
          <option value="Action">Action</option>
          <option value="Horror">Horror</option>
          <option value="Thriller">Thriller</option>
          <option value="Sportivo">Sportivo</option>
        </select>

        <button
          class="btn"
          [disabled]="f.invalid"
          [ngClass]="{
            'btn-dark': f.valid,
            'btn-danger': f.invalid
          }"
        >Save</button>
      </form>

      <hr>

      <div
        *ngFor="let a of animes" class="list-group-item"
      >
        <i
          class="fa fa-3x"
        ></i>
        {{a.title}} - {{a.genre}}
        <i class="fa fa-trash fa-2x pull-right" (click)="deleteHandler(a)"></i>
      </div>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class AnimeComponent implements OnInit {
  title?: string;
  image: any;
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
  ngOnInit(): void {
  }

}
