import { Injectable } from '@angular/core';


//decorateur @Injectable() indique que cette classe peut être injectée en tant que service dans d'autres composants ou services de l'application. Le paramètre provided

@Injectable({
  providedIn: 'root' // rend ce service disponible dans toute l'application (singleton)
})
export class SuggestionService {
  constructor() {} // Injection du service HttpClient pour les requêtes HTTP
}
