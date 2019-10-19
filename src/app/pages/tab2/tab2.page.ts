import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, IonContent } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment, {static:true}) segment: IonSegment;
  @ViewChild(IonContent, {static:true}) content: IonContent;

  categorias = ['business', 'entertainment', 'general', 
  'health', 'science', 'sports', 'technology']

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.segment.value = this.categorias[0]
    this.cargarNoticias(this.segment.value);
  }

  cambioCategoria(event){
    this.noticias = [];
    this.content.scrollToTop();
    this.cargarNoticias(event.detail.value);
  }

  loadData(event) {
    this.cargarNoticias(this.segment.value, event);
  }

  cargarNoticias(categoria: string, event?){
    this.noticiasService.getTopHeadlinesCategoria(categoria).subscribe(
      resp => {
        if(resp.articles.length > 0){
          this.noticias.push(...resp.articles);
        }
        
        if(event){
          event.target.complete();
        }
      }
    )
  }
}
