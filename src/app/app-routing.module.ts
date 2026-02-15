import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSuggestionComponent } from './features/suggestions/list-suggestion/list-suggestion.component';
import { HomeComponent } from './core/home/home.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  /*
    DEFAULT REDIRECT
    =================================================================
    path: "" matches empty URL (localhost:4200/)
    redirectTo: "home" → automatically goes to /home
    pathMatch: 'full' → ONLY redirect if path is EXACTLY empty
    
    Without pathMatch: 'full', it would match EVERY route (wildcard behavior)
  */
  { path: "", redirectTo: "home", pathMatch: 'full' },
  
  /*
    Component loaded immediately with main bundle
  */
  { path: "home", component: HomeComponent },
  
  /*
    LAZY LOADED ROUTE: Suggestions Feature
    =================================================================
    loadChildren: Dynamic import - ONLY loads when user visits /suggestions
    
    How it works:
    1. User clicks /suggestions link
    2. Angular downloads suggestions.module.js (separate file!)
    3. Then renders the component
    
    Syntax breakdown:
    () => import('./path/to/module').then(m => m.ModuleName)
    
    | Part                             | Meaning                                     |
    |----------------------------------|---------------------------------------------|
    | () =>                            | Arrow function (called on demand)           | 
    | import()                         | Dynamic ES6 import (creates separate chunk) |
    | .then(m => m.SuggestionsModule)  | Return the module class                     |
    
    BENEFITS:
    - Smaller initial bundle (faster first load)
    - Features load on-demand
    - Better performance for large apps
  */
  { 
    path: 'suggestions', loadChildren: () => import('./features/suggestions/suggestions.module').then(m => m.SuggestionsModule) 
  },
  
  /*
    LAZY LOADED ROUTE: Users Feature
    =================================================================
    Same pattern - separate chunk for users module
    Only downloads when navigating to /users
  */
  { 
    path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) 
  },
  
  /*
    WILDCARD ROUTE (404)
    =================================================================
    path: "**" matches ANY URL that didn't match above routes
    MUST be LAST! Route order matters - first match wins
    
    If placed earlier, it would catch ALL routes (breaks everything)
    
    Common mistake: Putting this before lazy routes = 404 always shows
  */
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  /*
    forRoot(routes)
    ===============
    - ONLY use in AppRoutingModule (root)
    - Creates singleton Router service
    - Registers routes application-wide
    
    Feature modules use forChild() - doesn't create new Router instance
  */
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],  // Makes RouterModule available throughout app
})
export class AppRoutingModule {}