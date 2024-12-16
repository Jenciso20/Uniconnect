import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileDataService {
  private profileData: any = null;

  // Guardar datos
  setProfileData(data: any) {
    this.profileData = data;
  }

  // Obtener datos
  getProfileData() {
    return this.profileData;
  }
}
