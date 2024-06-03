import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private language = new BehaviorSubject<string>('en');
  private translations = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      this.setLanguage(savedLanguage);
    } else {
      this.setLanguage('en');
    }
  }

  setLanguage(lang: string) {
    localStorage.setItem('language', lang);
    this.language.next(lang);
    this.loadTranslations(lang).subscribe();
    document.documentElement.setAttribute("lang", lang);
   
  }

  getLanguage(): Observable<string> {
    return this.language.asObservable();
  }

  private loadTranslations(lang: string): Observable<any> {
    return this.http.get(`assets/i18n/${lang}.json`).pipe(
      tap((translations) => {
        this.translations.next(translations);
      })
    );
  }

  getTranslations(): Observable<any> {
    return this.translations.asObservable();
  }

  translate(key: string, translations: any): string {
    const keys = key.split('.');
    let result = translations;
    for (const k of keys) {
      result = result[k];
      if (!result) {
        return key; // return key if translation is not found
      }
    }
    return result;
  }
}
