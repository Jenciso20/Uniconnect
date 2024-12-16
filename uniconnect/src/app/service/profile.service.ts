import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileData: any = null;

  // Guardar datos
  saveProfile(data: any) {
    this.profileData = data;
    return Promise.resolve(); // Simula una llamada asíncrona
  }

  // Obtener datos
  getProfile() {
    return this.profileData;
  }
}
