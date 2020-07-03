import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  UserIsAuthenticated: boolean = false;
  private authListnerSubscription: Subscription;
  private userName: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.UserIsAuthenticated = this.authService.getAuthStatus();
    this.authListnerSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.UserIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }
}
