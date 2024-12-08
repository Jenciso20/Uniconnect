import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'uniconnect-88be3',
        appId: '1:260818983793:web:1333a322efec1c800434d0',
        storageBucket: 'uniconnect-88be3.firebasestorage.app',
        apiKey: 'AIzaSyDEdnOqgP-w_tAkWH4C76DkFaK9yCVYDvU',
        authDomain: 'uniconnect-88be3.firebaseapp.com',
        messagingSenderId: '260818983793',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
