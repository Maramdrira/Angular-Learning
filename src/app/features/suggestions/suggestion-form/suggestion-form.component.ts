import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';  // Reactive Forms classes
import { Title } from '@angular/platform-browser';  // Service to set page title (not used here)

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
  myForm!: FormGroup;

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
      title: new FormControl("test", Validators.required),
      
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
      description: new FormControl("", [Validators.required,Validators.minLength(3)]),
    });
  }
}