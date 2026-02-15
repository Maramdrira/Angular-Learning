import { Component } from '@angular/core';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrl: './user-status.component.css'
})
export class UserStatusComponent {
  list= [{'nom':'Ahmed','status':'active'},
    {'nom':'Salah','status':'inactive'},
    {'nom':'Sarra','status':'pending'}
  ]
}
