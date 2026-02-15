import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent {
id! : number;

  constructor(private ac:ActivatedRoute){
        console.log("je suis const");

  }
  ngOnInit(){
    console.log("je suis on init");
    this.ac.paramMap.subscribe(res=>this.id=Number(res.get('id')));
   // kifkif 8ir min8ir map donc min8ir get ==>> this.ac.params.subscribe(res=>this.id=Number(res['id']));

  }
}
