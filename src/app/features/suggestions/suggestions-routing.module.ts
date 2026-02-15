import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionsComponent } from './suggestions.component';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';

const routes: Routes = [{ 
  /*
    PARENT ROUTE
    =================================================================
    path: '' means this is the default route for this module
    component: SuggestionsComponent is the PARENT/SHELL component
    
    When you add CHILDREN, the parent component becomes a LAYOUT/SHELL.
    It renders FIRST, then children render INSIDE it.
  */
  path: '', component: SuggestionsComponent, 
  
  /*
    CHILDREN ROUTES
    =================================================================
    These render INSIDE the parent component (SuggestionsComponent)
    NOT instead of it - both appear together!
    
    URL Structure:
    /suggestions          → Parent only (but you have redirect usually)
    /suggestions/list     → Parent + ListSuggestionComponent
    /suggestions/details/5 → Parent + SuggestionDetailsComponent (id=5)
    /suggestions/list/add → Parent + SuggestionFormComponent
    
    ⚠️ CRITICAL: Parent template MUST have <router-outlet> for children!
  */
  children: [
    { path: 'list', component: ListSuggestionComponent },
    { path: 'list/details/:id', component: SuggestionDetailsComponent },
    { path: 'list/add', component: SuggestionFormComponent },
  ] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // forChild = feature module routing
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }