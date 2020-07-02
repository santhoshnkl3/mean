import { Component, OnInit, OnDestroy } from "@angular/core";
import { Student } from "../student.model";
import { StudentService } from "../student.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-list-student",
  templateUrl: "./list-student.component.html",
  styleUrls: ["./list-student.component.css"],
})
export class ListStudentComponent implements OnInit, OnDestroy {
  students: Student[] = [];
  studentSubscription: Subscription;
  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getStudentDetails();
    this.studentSubscription = this.studentService
      .getStudentUpdatedListner()
      .subscribe((student) => {
        this.students = student;
      });
  }
  onDelete(id: string) {
    this.studentService.deleteStudentRecord(id);
  }
  ngOnDestroy() {
    this.studentSubscription.unsubscribe();
  }
}
