import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Service to access route parameters

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent {
  // Definite assignment assertion (!): tells TypeScript this will be assigned before use
  // Avoids "property has no initializer" error
  id!: number;

  /*
    CONSTRUCTOR
    =================================================================
    - Runs FIRST when component is created (before ngOnInit)
    - Used for DEPENDENCY INJECTION (like ActivatedRoute here)
    - DON'T put heavy logic here - view isn't ready yet
    - DON'T call HTTP requests here
    
    ActivatedRoute is injected as private property 'ac'
    Angular's DI system automatically provides the instance
  */
  constructor(private ac: ActivatedRoute) {
    console.log("je suis const");  // Logs first
  }

  /*
    ngOnInit
    =================================================================
    - Lifecycle hook: runs AFTER constructor, when component initializes
    - View is ready, inputs are set, safe to run logic
    - PERFECT PLACE for: HTTP calls, route param subscription, setup
    
    Why not constructor? 
    - Inputs (@Input) aren't available in constructor
    - View isn't rendered yet
    - Testing is harder with constructor logic
  */
  ngOnInit() {
    console.log("je suis on init");  // Logs second (after constructor)

       /*
      METHOD 1: SNAPSHOT (One-time read)
      =================================================================
      - Takes a "photo" of route params at this moment
      - Value never changes, even if URL updates
      - Use when: Component is recreated on every route change
      
      PROBLEM: If user navigates /details/1 → /details/2 while 
      staying on same component, id stays 1 (stale data!)
    
    this.id = Number(this.ac.snapshot.paramMap.get('id'));*/

     

    /*
        METHOD 2: OBSERVABLE (Reactive - RECOMMENDED) SUBSCRIBING TO ROUTE PARAMETERS 
      =================================================================
      
      URL example: /details/123
      URL //////
      this.ac.paramMap.subscribe(res => this.id = Number(res.get('id')));
      
      | Part           | Meaning                                          |
      |----------------|--------------------------------------------------|
      | this.ac         | Injected ActivatedRoute service instance         |
      | .paramMap       | Observable of route parameters (Map object)      |
      | .subscribe()    | Listen for changes (reactive)                    |
      | res             | ParamMap object containing all route params      |
      | res.get('id')   | Get 'id' parameter value as string \| null       |
      | Number(...)     | Convert string to number                         |
      
      WHY USE SUBSCRIBE (Observable)?
      - Component stays alive if URL changes: /details/123 → /details/456
      - Automatically updates id when route param changes
      - Reactive pattern - handles navigation within same component
      
      Memory management: unsubscribe in ngOnDestroy (or use async pipe in template)
    */
    this.ac.paramMap.subscribe(res => this.id = Number(res.get('id')));

    /*
      ALTERNATIVE: Without paramMap (older syntax) url ?????
      =================================================================
      this.ac.params.subscribe(res => this.id = Number(res['id']));
      
      | Difference      | Explanation                                  |
      |-----------------|----------------------------------------------|
      | .params         | Observable of plain object { id: '123' }     |
      | res['id']       | Object property access (no .get() method)    |
      
      Both work, but paramMap is preferred (Map API is more robust)


      User clicks: details/1 → details/2 (same component)

SNAPSHOT (.snapshot)                    OBSERVABLE (.subscribe)
─────────────────────                   ─────────────────────────
id = 1                                  id = 1  ← initial
[URL changes]                           [URL changes to /details/2]
id = 1  ❌ STALE!                       id = 2  ✅ AUTO-UPDATED!
                                        (subscription fires again)
    */


   
  }
}