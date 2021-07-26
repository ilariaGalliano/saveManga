import { Component, OnInit } from '@angular/core';
import { ArchiveService } from '../archive.service';
import { NewComponent } from '../new/new.component';
import { Manga } from '../manga';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
    <div class="panel panel-default" *ngFor="let manga of mangas">
      <div class="panel-heading">
        {{ manga.nome }} - <small>{{ manga.currentPage }} di {{ manga.pages }} pagine</small>
      </div>
      <div class="panel-body">
        <blockquote>
          Note: {{ manga.note }}
        </blockquote>
        <blockquote>
          Capitolo:  {{ manga.chapter }}
        </blockquote>
        <img [src]="manga.img" class="img-thumbnail rounded float-right" width="150"  alt="img"> 
      </div>
    </div>
    
  </div>
  
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  mangas: Array<Manga>;

  constructor(private s: ArchiveService) { 
    this.mangas = s.listMangas;
  }

  ngOnInit(): void {
  }

}
