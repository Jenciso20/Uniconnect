import { Component, OnInit, inject } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { CommonModule } from '@angular/common';

// Interfaz para los datos del perfil
interface UserProfile {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  private _profileService = inject(ProfileService);
  profileData: UserProfile | null = null;
  error: string | null = null;

  async ngOnInit() {
    try {
      // Asumimos que getProfile devuelve una Promesa
      this.profileData = await this._profileService.getProfile();
    } catch (err) {
      console.error('Error al cargar el perfil:', err);
      this.error = 'No se pudo cargar el perfil. Inténtalo de nuevo.';
    }
  }
}
