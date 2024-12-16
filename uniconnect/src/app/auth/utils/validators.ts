import { FormGroup } from "@angular/forms";

export const isRequired = (field: 'email' | 'password', form: FormGroup)=> {
   const control =form.get(field );
   return control && control.touched && control.hasError('required');
}
export const hasEmailError =(form: FormGroup)=>{
   const control =form.get('email');
   return control && control.touched && control.hasError('email');
}
export const passwordsMatchValidator = (group: FormGroup) => {
   const password = group.get('password')?.value;
   const confirmPassword = group.get('confirmPassword')?.value;
 
   return password === confirmPassword ? null : { passwordsMismatch: true };
 };
 