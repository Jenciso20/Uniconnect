import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';
import { hasEmailError, isRequired } from '../../utils/validators';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  passwordsDoNotMatch() {
    return this.form.hasError('passwordsMismatch') && this.form.get('confirmPassword')?.touched;
  }

  form = this._formBuilder.group(
    {
      email: this._formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this._formBuilder.control('', [
        Validators.required,
      ]),
      confirmPassword: this._formBuilder.control('', [
        Validators.required,
      ]),
    },
    { validators: this.passwordsMatchValidator } // Validador personalizado
  );

  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
  

  async submit() {
    if (this.form.invalid) return;
  
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;
  
    if (!email || !password) return;
  
    try {
      console.log({ email, password }); // Para verificar que los valores están siendo enviados
      await this._authService.signUp({ email, password }); // Verifica que este método funcione
      toast.success('Usuario creado correctamente');
      this._router.navigate(['/uniconnect']);
    } catch (error) {
      console.error(error); // Log para ver errores específicos
      toast.error('Ocurrió un error');
    }
  }
  
}
