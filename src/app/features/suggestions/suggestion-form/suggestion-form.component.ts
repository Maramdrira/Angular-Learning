import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';  // Reactive Forms classes
import { Title } from '@angular/platform-browser';  // Service to set page title (not used here)
import { Suggestion } from '../../../models/suggestion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent implements OnInit {
  /*
    FormGroup: Container for multiple form controls
    - Tracks value/state of entire form
    - Provides methods: .value, .valid, .reset(), etc.
    - The '!' (definite assignment) tells TypeScript it will be initialized in ngOnInit
  */

 constructor(private fb: FormBuilder , private _myroute:Router) {}  // Inject FormBuilder for easier form creation

  myForm!: FormGroup;
  myForm2!: FormGroup;
  id!: number;
  categories: string[] = [
  'Infrastructure et bâtiments',
  'Technologie et services numériques',
  'Restauration et cafétéria',
  'Hygiène et environnement',
  'Transport et mobilité',
  'Activités et événements',
  'Sécurité',
  'Communication interne',
  'Accessibilité',
  'Autre'
  ];

  ngOnInit() {
    /*
      INITIALIZING REACTIVE FORM
      =================================================================
      
      new FormGroup({...})  →  Creates form structure with nested controls
      
      SYNTAX: 'formFieldName': new FormControl(initialValue, validators)
    */
    this.myForm = new FormGroup({
      
      /*
        FormControl: Manages single input field
        -----------------------------------------------------------------
        new FormControl("test", Validators.required)
        
        | Parameter | Value | Meaning |
        |-----------|-------|---------|
        | Initial value | "test" | Pre-fills input with "test" |
        | Validator | Validators.required | Field cannot be empty |
        
        FormControl tracks:
        - value: current input value
        - valid/invalid: validation state
        - touched/untouched: if user interacted
        - dirty/pristine: if value changed
        - errors: validation error messages
      */
      title: new FormControl("test", [Validators.required, Validators.minLength(5),Validators.pattern("^[A-Z][a-z]*")]),  // Required, min 3 chars, alphanumeric only
      
      /*
        MULTIPLE VALIDATORS (array syntax)
        -----------------------------------------------------------------
        [Validators.required, Validators.minLength(3)]
        
        - Field must be filled (required)
        - Minimum 3 characters (minLength)
        - BOTH must pass for field to be valid
        
        Other common validators:
        - Validators.maxLength(n)
        - Validators.email
        - Validators.pattern(regex)
        - Validators.min(n) / Validators.max(n)
      */
      description: new FormControl("", [Validators.required,Validators.minLength(30)]),
      category: new FormControl("",Validators.required),
      status: new FormControl("en_attente"),
      date: new FormControl(new Date().toISOString().substring(0, 10))  // Default to today's date in YYYY-MM-DD format

    });



    //bel form builder 
  this.myForm2=this.fb.group({
  title: ["", [Validators.required, Validators.minLength(5),Validators.pattern("^[A-Z][a-z]*")]],
  description: ["", [Validators.required,Validators.minLength(30)]]});
  }

//getter fi for m contorl nsamih kima nhb  w twali tjininm fel html tbdel myForm.get('title')?.touched   b title?.touched  bech ken bdalt esm el chanp madrourech 3lihom lkol 
  get title() {
    return this.myForm.get('title');
  }

  onSubmit() {
    let s = new Suggestion();
    s.title = this.title?.value; // Get title value from form control
    s.description = this.myForm.value.description;
    console.log(this.myForm.value);  // Log form values to console on submit
this._myroute.navigateByUrl('/suggestions/list'); //redirect to list after submission

  }





}