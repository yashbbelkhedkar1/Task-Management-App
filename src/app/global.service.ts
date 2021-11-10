import { Injectable } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { User } from './shared/user';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private userDetails : User = null;

  constructor() { }


}
