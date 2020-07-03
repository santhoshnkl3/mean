import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListStudentComponent } from "./list-student/list-student.component";
import { CreateStudentComponent } from "./create-student/create-student.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: ListStudentComponent,
  },
  {
    path: "create",
    component: CreateStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "edit",
    component: CreateStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
