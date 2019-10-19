import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(
    private iab: InAppBrowser, 
    private actionSheetController: ActionSheetController, 
    private socialSharing: SocialSharing,
    private datalocalService: DataLocalService
  ) {}

  ngOnInit() {}

  abrirNoticia(){
    console.log('Noticia', this.noticia.url)
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){
    
    let guardarBorrarBtn;

    if(this.enFavoritos){
      guardarBorrarBtn = {
        text: 'Delete favorite',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite add');
          this.datalocalService.borrarNoticia(this.noticia);
        }
      }
    } else{
      guardarBorrarBtn = {
        text: 'Favorite',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite borrar');
          this.datalocalService.guardarNoticia(this.noticia);
        }
      }
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Share',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          )
        }
      },
      guardarBorrarBtn, 
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
