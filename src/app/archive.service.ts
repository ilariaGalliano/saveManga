import { Injectable } from '@angular/core';
import { Manga } from './manga';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  listMangas:Array<Manga>;

  constructor() { 
    this.listMangas = [];
  }
  save(manga: Manga){
    this.listMangas.push(manga);
  }
}
