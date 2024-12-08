import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router,  } from '@angular/router';
import { AuthService } from '../../data-access/auth.service';
import { hasEmailError, isRequired } from '../../utils/validators';
import { toast } from 'ngx-sonner';


interface FormSignUp{
    email: FormControl<string  | null>;
    password: FormControl<string  | null>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  private  _formBuilder= inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router=inject(Router)

  isRequired(field : 'email' | 'password'){
    return isRequired(field, this.form)
  }

  hasEmailError(){
    return hasEmailError(this.form);
  }

  form = this._formBuilder.group<FormSignUp>({
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
    await this._authService.signUp({email , password});
    
    toast.success('Usuario creado correctamente')
    this._router.navigate(['/uniconnect'])
    } catch (error) {
      toast.error('Ocurrio un error')
    }
  }
}
