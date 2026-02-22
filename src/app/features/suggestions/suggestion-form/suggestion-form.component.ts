import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';  // Reactive Forms classes
import { Suggestion } from '../../../models/suggestion';
import { Router } from '@angular/router';  // Service for programmatic navigation

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
  myForm2!: FormGroup;  // Alternative form using FormBuilder
  id!: number;  // Used to determine edit mode vs create mode
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

  /*
    CONSTRUCTOR - DEPENDENCY INJECTION
    =================================================================
    
    private fb: FormBuilder
    -----------------------
    FormBuilder service - creates forms with less verbose syntax
    Provides .group() method for cleaner form creation
    
    private _myroute: Router
    ------------------------
    Router service - enables programmatic navigation
    Methods:
    - navigateByUrl('/path')  → Navigate to absolute URL
    - navigate(['/path', id]) → Navigate with params
    - navigateBack()          → Go back in history
    
    Why _myroute (with underscore)?
    - Convention for private properties
    - Distinguishes from public methods
  */
  constructor(private fb: FormBuilder, private _myroute: Router) {}

  ngOnInit() {
    /*
      FORM CREATION - TWO SYNTAX OPTIONS
      =================================================================
    */

    /*
      OPTION 1: new FormGroup() - Verbose but explicit
      -----------------------------------------------------------------
      Creates controls individually with new FormControl()
      Good for: Understanding how Reactive Forms work internally
    */
    this.myForm = new FormGroup({
      title: new FormControl("test", [
        Validators.required,           // Field must not be empty
        Validators.minLength(5),       // Minimum 5 characters
        Validators.pattern("^[A-Z][a-z]*")  // Must start with uppercase, then lowercase
      ]),
      description: new FormControl("", [
        Validators.required,
        Validators.minLength(30)       // Minimum 30 characters
      ]),
      category: new FormControl("", Validators.required),
      status: new FormControl("en_attente"),  // Default value, no validators
      date: new FormControl(new Date().toISOString().substring(0, 10))  // Today's date
    });

    /*
      OPTION 2: FormBuilder - Cleaner syntax (RECOMMENDED)
      -----------------------------------------------------------------
      this.fb.group({}) creates FormGroup with less code
      Syntax: field: [initialValue, validators]
      
      Benefits:
      - Less verbose
      - Easier to read
      - Same functionality
    */
    this.myForm2 = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(5), Validators.pattern("^[A-Z][a-z]*")]],
      description: ["", [Validators.required, Validators.minLength(30)]]
    });
  }

  /*
    GETTER - TEMPLATE HELPER
    =================================================================
    Creates shorthand for accessing form controls in HTML
    
    Without getter: myForm.get('title')?.touched
    With getter:    title?.touched  ← Much cleaner!
    
    Also provides abstraction - if you rename 'title' field,
    you only change it here, not in every template reference
  */
  get title() {
    return this.myForm.get('title');
  }

  /*
    FORM SUBMISSION
    =================================================================
  */
  onSubmit() {
    // Create new Suggestion instance from form values
    let s = new Suggestion();
    s.title = this.title?.value;  // Using getter shorthand
    s.description = this.myForm.value.description;  // Direct access
    
    console.log(this.myForm.value);  // Debug: log all form values
    
       /*
      NAVIGATION AFTER SUBMIT
      -----------------------------------------------------------------
      this._myroute.navigateByUrl('/suggestions/list')
      
      | Method | Behavior |
      |--------|----------|
      | navigateByUrl() | Absolute path, full URL replacement |
      | navigate() | Relative path, can add route params |
      
      THE POWER OF "/" (LEADING SLASH)
      =================================
      
      '/suggestions/list'  →  ABSOLUTE path (starts with /)
      - Ignores current URL completely
      - Goes to root → suggestions → list
      - Result: http://localhost:4200/suggestions/list
      
      'suggestions/list'   →  RELATIVE path (no leading /)
      - Appends to CURRENT URL
      - If you're at /suggestions/add → becomes /suggestions/add/suggestions/list
      - Result: http://localhost:4200/suggestions/add/suggestions/list  ❌ WRONG!
      
      Always use "/" for absolute navigation to avoid URL stacking bugs!
      
      Example with navigate():
      this._myroute.navigate(['/suggestions', 'details', this.id]);
      → Goes to /suggestions/details/123
      
      Same rule applies: ['/suggestions'] = absolute, ['suggestions'] = relative
    */
    this._myroute.navigateByUrl('/suggestions/list');
  }


  /* 
    ============================================
    SYNCHRONOUS VALIDATORS (Built-in)
    ============================================
    Run immediately, return ValidationErrors | null

    Validators.required           // Field not empty
    Validators.minLength(5)       // Minimum length
    Validators.maxLength(100)     // Maximum length
    Validators.min(0)             // Minimum number value
    Validators.max(100)           // Maximum number value
    Validators.email              // Valid email format
    Validators.pattern(/regex/)   // Match regex pattern
// */
}