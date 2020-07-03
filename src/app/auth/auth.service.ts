import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private token: string;
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  getAuthStatusListener() {
    return this.authStatusListener;
  }

  getToken() {
    return this.token;
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  autoAuthUser() {
    const authInfomation = this.getAuthData();
    if (!authInfomation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfomation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.setAuthTimer(expiresIn / 1000);
      this.token = authInfomation.token;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string, expiresIn: number}>(
        "http://localhost:3000/api/user/login",
        authData
      )
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(token, expirationDate);
          this.router.navigate(["/"]);
        }
      });
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(["/"]);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expirationDate", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expirationDate");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }
}
