import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ReplaySubject} from "rxjs";
import {User} from "../../_models/user";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {RegisterDto} from "../../_dtos/register-dto";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: RegisterDto) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      tap(_ => {
        this.toastr.success("Registration successful. Please sign in");
      }))
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  refreshCurrentUser() {
    const userString = localStorage.getItem('user')
    if (!userString){
      this.currentUserSource.next(null)
      return
    }
    const user: User = JSON.parse(userString)
    this.currentUserSource.next(user)
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
