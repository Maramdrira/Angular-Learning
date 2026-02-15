/*
  PLATFORM BROWSER DYNAMIC
  =================================================================
  Imports the function that bootstraps Angular in a web browser.
  
  Angular can run in different environments:
  - Browser (platformBrowserDynamic) ← YOU ARE HERE
  - Server (platformServer) for SSR
  - Web Worker (platformWebworker)
  
  This chooses BROWSER as the runtime environment.
*/
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

/*
  BOOTSTRAP PROCESS
  =================================================================
  
  platformBrowserDynamic()
  ------------------------
  Creates the Angular platform for browser environment.
  Sets up:
  - DOM renderer
  - Event handling
  - Change detection system (Zone.js)
  
  .bootstrapModule(AppModule)
  ---------------------------
  Starts the Angular application:
  1. Compiles AppModule (JIT - Just In Time compilation)
  2. Creates injector (DI container) with all providers
  3. Creates instance of bootstrap component (AppComponent)
  4. Finds <app-root> in index.html
  5. Renders AppComponent inside it
  
  Second parameter: Configuration object
*/
platformBrowserDynamic().bootstrapModule(AppModule, {
  /*
    ngZoneEventCoalescing: true
    ===========================
    PERFORMANCE OPTIMIZATION for change detection.
    
    Without coalescing:
    - Every event triggers change detection immediately
    - Multiple events = multiple detection cycles
    
    With coalescing (true):
    - Batches multiple events into single change detection cycle
    - Reduces re-renders, better performance
    
    Example: Rapid mouse moves, multiple clicks
    - false: detectChanges() runs for every event
    - true: detectChanges() runs once for batch of events
  */
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));  // Handle bootstrap errors