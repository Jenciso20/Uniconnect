import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

import { AuthService } from '../../data-access/auth.service';

interface ResetPasswordForm {
  email: FormControl<string | null>;
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = this._formBuilder.group<ResetPasswordForm>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email
    ])
  });

  async resetPassword() {
    if (this.form.invalid) return;

    const email = this.form.get('email')?.value;
    
    try {
      if (!email) return;
      
      await this._authService.resetPassword(email);
      
      toast.success('Enlace de recuperación enviado');
      this._router.navigate(['/auth/sign-in']);
    } catch (error: any) {
      // Manejo de errores específicos de Firebase
      if (error.code === 'auth/user-not-found') {
        toast.error('No se encontró un usuario con este correo');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Correo electrónico inválido');
      } else {
        toast.error('Ocurrió un error al enviar el enlace de recuperación');
      }
    }
  }

  navigateToSignIn() {
    this._router.navigate(['/auth/sign-in']);
  }

  // Métodos para validaciones
  isRequired() {
    const emailControl = this.form.get('email');
    return emailControl?.hasError('required') && emailControl?.touched;
  }

  hasEmailError() {
    const emailControl = this.form.get('email');
    return emailControl?.hasError('email') && emailControl?.touched;
  }
}