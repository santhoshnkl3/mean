import { Component, OnInit } from "@angular/core";
import { Student } from "../student.model";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { StudentService } from "../student.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-create-student",
  templateUrl: "./create-student.component.html",
  styleUrls: ["./create-student.component.css"],
})
export class CreateStudentComponent implements OnInit {
  private mode = "create";
  private studentId: string;
  student: Student;

  constructor(
    private studentService: StudentService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("studentId")) {
        this.mode = "edit";
        this.studentId = paramMap.get("studentId");
        this.student = this.studentService.getStudentDetail(this.studentId);
      } else {
        this.mode = "create";
        this.studentId = null;
      }
    });
  }
  onSaveStudentData(studentData: NgForm) {
    if (studentData.invalid) {
      console.log("Data")
      return;
    }
    if (this.mode === "create") {
      this.studentService.addStudentDetail(
        studentData.value.name,
        studentData.value.dateOfBirth,
        studentData.value.phoneNumber,
        studentData.value.bloodGroup,
        studentData.value.address,
        studentData.value.department,
        studentData.value.batch,
        studentData.value.emailId
      );
    } else {
      this.studentService.updateStudentRecord(
        this.studentId,
        studentData.value.name,
        studentData.value.dateOfBirth,
        studentData.value.phoneNumber,
        studentData.value.bloodGroup,
        studentData.value.address,
        studentData.value.department,
        studentData.value.batch,
        studentData.value.emailId
      );
    }
  }
}
