import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = inject(Auth);

  // Método para validar el dominio del correo electrónico
  private validateEmailDomain(email: string): boolean {
    return email.toLowerCase().endsWith('@unajma.edu.pe');
  }

  signUp(user: User) {
    // Validar el dominio antes de crear la cuenta
    if (!this.validateEmailDomain(user.email)) {
      return Promise.reject(new Error('Solo se permiten correos de @unajma.edu.pe'));
    }

    return createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
  }

  signIn(user: User) {
    // Validar el dominio antes de iniciar sesión
    if (!this.validateEmailDomain(user.email)) {
      return Promise.reject(new Error('Solo se permiten correos de @unajma.edu.pe'));
    }

    return signInWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
  }

  resetPassword(email: string) {
    // Validar el dominio antes de enviar el restablecimiento de contraseña
    if (!this.validateEmailDomain(email)) {
      return Promise.reject(new Error('Solo se permiten correos de @unajma.edu.pe'));
    }

    return sendPasswordResetEmail(this._auth, email);
  }
}