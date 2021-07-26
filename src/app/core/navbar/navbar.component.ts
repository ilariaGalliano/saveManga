import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Anime }  from '../../model/anime';

@Component({
  selector: 'app-navbar',
  template: `
  
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">SaveManga</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active" routerLink="/home">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" routerLink="/new">New</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" routerLink="/anime">Anime</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
      
  `,
  styles: [
  ]
})
export class NavbarComponent {
  title = 'save manga';
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


}

