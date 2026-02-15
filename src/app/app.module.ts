import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { ListSuggestionComponent } from './features/suggestions/list-suggestion/list-suggestion.component';
import { UserStatusComponent } from './core/user-status/user-status.component';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserStatusComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  /*
    IMPORTS
    =================================================================
    Other modules whose functionality this module needs.
    Angular merges their exports into this module.
    
    Order matters! BrowserModule MUST be first.
  */
  imports: [
    /*
      BrowserModule
      -------------
      - REQUIRED in every Angular app (root module only!)
      - Provides: *ngIf, *ngFor, ngClass, ngStyle, pipes (date, json, etc.)
      - Bootstraps app in browser (creates DOM, listens to events)
      - Imports CommonModule internally
      - NEVER import in feature modules (use CommonModule there)
    */
    BrowserModule,
    
    /*
      AppRoutingModule
      ----------------
      - Your custom routing configuration
      - Contains RouterModule.forRoot(routes)
      - Provides Router service (singleton), router-outlet directive, routerLink
      - Must import AFTER BrowserModule
    */
    AppRoutingModule,
    
    /*
      FormsModule
      -----------
      - Provides Template-Driven Forms
      - NgModel directive for two-way binding [(ngModel)]
      - Only needed if using template forms (not reactive forms)
      - Can also import in feature modules if only they need it
    */
    FormsModule
  ],
  
  /*
    PROVIDERS
    =================================================================
    Services available for dependency injection (DI) throughout the app.
    
    Empty array [] = no global services provided at module level.
    
    Services can also be provided:
    - @Injectable({ providedIn: 'root' }) - preferred modern way
    - Component level: providers: [MyService] - only for that component
    
    When to use providers: [] here?
    - Legacy code without providedIn
    - Third-party services without Angular decorators
    - Configuring services with useClass/useValue/useFactory
  */
  providers: [],
  
  /*
    BOOTSTRAP
    =================================================================
    The ROOT component that Angular creates and inserts into index.html.
    
    [AppComponent] tells Angular:
    1. Create instance of AppComponent
    2. Find its selector (<app-root>) in index.html
    3. Render AppComponent's template there
    
    ONLY in root module (AppModule)!
    Feature modules don't have bootstrap.
    
    index.html contains: <body><app-root></app-root></body>
    Angular replaces <app-root> with AppComponent's template
  */
  bootstrap: [AppComponent],
})
export class AppModule {}