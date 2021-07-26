import { Component, OnInit } from '@angular/core';
import { Manga } from '../manga';
import { ArchiveService } from '../archive.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styles: [
  ]
})
export class NewComponent implements OnInit {
  manga: any = {};
  registrationForm: FormGroup | undefined;
  URL = 'http://localhost:3000';

  constructor(private s: ArchiveService, private router: Router, private fb: FormBuilder, private http: HttpClient) { 
    this.manga = new Manga();
  }

  ngOnInit() {}

  /* ngOnInit() {
    this.registrationForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      note: new FormControl(null, Validators.required),
      pages: new FormControl(null, Validators.required),
      chaper: new FormControl(null, Validators.required),
      currentPage: new FormControl(null, Validators.required),
      img: new FormControl(null, Validators.required)  
    })
  }

  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      nome: [null, Validators.required],
      note: [null, Validators.required],
      pages: [null, Validators.required],
      chaper: [null, Validators.required],
      currentPage: [null, Validators.required],
      img: [null, Validators.required]
    })
  }
 */
  readUrl(event: any){
    if( event.target.files && event.target.files[0]){
      var reader = new FileReader();
      reader.onload = (event : any) => {
        this.manga.img = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  saveHandler(f: NgForm) {
    const m = f.value as Manga;

    this.http.post<Manga>(`${this.URL}/manga/`, m)
      .subscribe((dbmanga: any) => {
        this.manga = [...this.manga!, m]
        f.reset();
      });
  }

  onSubmit(mangaForm: NgForm){
    const m = mangaForm.value as Manga;

    this.http.post<Manga>(`${this.URL}/manga/`, m)
      .subscribe((dbmanga: any) => {
        this.manga = [...this.manga!, m]
        mangaForm.reset();
      });
    console.log(this.manga);
    this.s.save(this.manga);
    this.manga = Object.assign(this.manga, this.registrationForm?.value);
    localStorage.setItem('Manga', JSON.stringify(this.manga))
    this.router.navigate(['/home'])
  }
}
