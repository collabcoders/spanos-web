import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilitiesService } from './utilities.service';
import { User } from '@shared/models/user';
import { Config } from '@shared/config';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private isValid = new BehaviorSubject<boolean>(false);

  constructor(private util: UtilitiesService) { }

  getToken(): string {
    let _token: any = '';
    try {
      if (!this.util.isJsonEmpty(this.getUser())) {
        const cu = this.getUser() as User;
        _token = cu.token;
      }
      return _token;
    } catch (ex) {
      return '';
    }
  }

  setToken(data: any) {
    const now = new Date().getTime();
    const setupTime = localStorage.getItem(Config.tokenLocalStorage + '-time');
    if (setupTime == null || setupTime === undefined) {
      localStorage.setItem(Config.tokenLocalStorage + '-time', now.toString());
    } else {
      localStorage.removeItem(Config.tokenLocalStorage + '-time');
      localStorage.setItem(Config.tokenLocalStorage + '-time', now.toString());
    }
    localStorage.setItem(Config.tokenLocalStorage, JSON.stringify(data));
    this.isValid.next(true);
  }

  removeToken(): void {
    try {
      localStorage.removeItem(Config.tokenLocalStorage);
      localStorage.removeItem(Config.tokenLocalStorage + '-time');
      this.isValid.next(false);
    } catch (ex) {
    }
  }

  validateToken(): boolean {
    // Check localStorage data
    if (this.util.isJsonEmpty(this.getUser())) {
      this.isValid.next(false);
      return false;
    }
    // Check if token expired
    const setupTime = localStorage.getItem(Config.tokenLocalStorage + '-time');
    if (setupTime == null || setupTime === undefined) {
      this.isValid.next(false);
      return false;
    }
    const now = new Date().getTime();
    console.log(Config.tokenLocalStorage + ' setup time:' + (now - +setupTime).toString() + ' - ' + Config.tokenLocalStorage +
      ' expire time:' + (Config.tokenExpireHours * 60 * 60 * 1000).toString());
    if (now - +setupTime > Config.tokenExpireHours * 60 * 60 * 1000) {
      this.isValid.next(false);
      return false;
    }
    this.isValid.next(true);
    return true;
  }

  getUser(): User {
    let currentUser: User = {} as any;
    try {
      const cu: any = localStorage.getItem(Config.tokenLocalStorage);
      currentUser = JSON.parse(cu) as User;
    } catch (err) {
      currentUser = {} as any;
    }
    return currentUser;
  }
}
