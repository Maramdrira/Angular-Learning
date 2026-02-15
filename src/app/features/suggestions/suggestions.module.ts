import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // Feature modules use this, NOT BrowserModule

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsComponent } from './suggestions.component';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';

@NgModule({
  declarations: [
    // All components belonging to this feature module
    ListSuggestionComponent,
    SuggestionsComponent,
    SuggestionDetailsComponent,
    SuggestionFormComponent
  ],
  imports: [
    /*
      =================================================================
      MODULE IMPORTS: What each provides
      =================================================================
    */
    
    /*
      CommonModule
      ------------
      - Provides *ngIf, *ngFor, [ngClass], [ngStyle], [ngSwitch], date pipe, etc.
      - REQUIRED in EVERY feature module that uses these directives
      - DIFFERENT from BrowserModule!
      
      WHY CommonModule NOT BrowserModule?
      -----------------------------------
      | BrowserModule          | CommonModule           |
      |------------------------|------------------------|
      | For ROOT module only   | For feature modules    |
      | Imports CommonModule   | Provides directives    |
      | + browser-specific stuff| (ngIf, ngFor, etc.)   |
      | (renders app in browser)|                       |
      | Can only import ONCE   | Can import in many     |
      
      BrowserModule throws error if imported in multiple modules!
      CommonModule is safe to import everywhere.
    */
    CommonModule,
    
    /*
      SuggestionsRoutingModule
      ------------------------
      - Your custom routing module for this feature
      - Contains forChild(routes) configuration
      - Provides routing capabilities for this module only
    */
    SuggestionsRoutingModule,
    
    /*
      FormsModule
      -----------
      - Provides Template-Driven Forms
      - NgModel directive [(ngModel)]="value"
      - Used if you have simple forms with ngModel
      
      NOTE: You have both FormsModule AND ReactiveFormsModule
      Usually you only need one, but having both is fine.
    */
    FormsModule,
    
    /*
      ReactiveFormsModule
      -------------------
      - Provides Reactive Forms API
      - FormGroup, FormControl, FormBuilder classes
      - formGroup directive [formGroup]="myForm"
      - formControlName directive
      
      Used by: SuggestionFormComponent
    */
    ReactiveFormsModule
  ]
})
export class SuggestionsModule { }