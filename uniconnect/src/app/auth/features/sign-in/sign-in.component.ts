import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { toast } from 'ngx-sonner';
import { AuthService } from '../../data-access/auth.service';
import { isRequired, hasEmailError } from '../../utils/validators';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

interface FormSignIn{
  email: FormControl<string  | null>;
  password: FormControl<string  | null>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  private  _formBuilder= inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router=inject(Router)

  isRequired(field : 'email' | 'password'){
    return isRequired(field, this.form)
  }

  hasEmailError(){
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('',[
      Validators.required,
      Validators.email,
    ],),
    password: this._formBuilder.control('',[Validators.required],),
  });

  async submit(){
    if(this.form.invalid) return;

    try {
      const { email , password }=this.form.value;

    if(!email || !password) return ;
    console.log({email , password})
    await this._authService.signIn({email , password});
    
    toast.success('Bienvenido')
    this._router.navigate(['/uniconnect'])
    } catch (error) {
      toast.error('Ocurrio un error')
    }
  }
}
