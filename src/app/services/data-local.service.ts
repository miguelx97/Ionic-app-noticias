import { Injectable } from '@angular/core';
import { Article } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = []
  constructor(
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.cargarFavoritos()
  }

  guardarNoticia(noticia:Article) {
    const existe = this.noticias.find( noti => noti.title === noticia.title)
    if(!existe){
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.showToast('Saved in favorites')
    } else{
      this.showToast('This new is already in favorites')
    }
  }

  borrarNoticia(noticia:Article){
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title)
    this.storage.set('favoritos', this.noticias);
    this.showToast('Deleted from favorites')
  }

  async cargarFavoritos(){
    const favoritos = await this.storage.get('favoritos');
    if(favoritos){
      this.noticias = favoritos;
    }
  }

  async showToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
