import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../service/profile.service';
import { toast } from 'ngx-sonner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  private _formBuilder = inject(FormBuilder);
  private _profileService = inject(ProfileService);
  private _router = inject(Router);

  form = this._formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.min(0)]],
    gender: ['', [Validators.required]],
  });

  async submit() {
    if (this.form.invalid) return;

    const profileData = this.form.value;

    try {
      await this._profileService.saveProfile(profileData); // Guardar los datos
      toast.success('Perfil creado exitosamente.');
      this._router.navigate(['/user-profile']); // Redirige a la página de perfil
    } catch (error) {
      toast.error('Ocurrió un error al guardar el perfil.');
    }
  }
}
