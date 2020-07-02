import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Student } from "./student.model";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class StudentService {
  private students: Student[] = [];
  private studentUpdated = new Subject<Student[]>();
  constructor(private http: HttpClient) {}

  getStudentDetail(id: string) {
    return { ...this.students.find((student) => student.id === id) };
  }

  addStudentDetail(
    name: string,
    dateOfBirth: Date,
    phoneNumber: number,
    bloodGroup: string,
    address: string,
    department: string,
    batch: string,
    emailId: string
  ) {
    const studentData: Student = {
      name: name,
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber,
      bloodGroup: bloodGroup,
      address: address,
      department: department,
      batch: batch,
      emailId: emailId,
      id: null,
    };
    this.http
      .post<{ message: string; studentId: string }>(
        "http://localhost:3000/api/student",
        studentData
      )
      .subscribe((res) => {
        console.log(res);
        const id = res.studentId;
        studentData.id = id;
        this.students.push(studentData);
        this.studentUpdated.next([...this.students]);
      });
  }
  getStudentDetails() {
    this.http
      .get<{ message: string; students: any }>(
        "http://localhost:3000/api/student"
      )
      .pipe(
        map((studentData) => {
          return studentData.students.map((student) => {
            return {
              name: student.name,
              dateOfBirth: student.dateOfBirth,
              phoneNumber: student.phoneNumber,
              id: student._id,
              bloodGroup: student.bloodGroup,
              batch: student.batch,
              address: student.address,
              department: student.department,
              emailId: student.emailId,
            };
          });
        })
      )
      .subscribe((newStudentData) => {
        this.students = newStudentData;
        this.studentUpdated.next([...this.students]);
      });
  }

  getStudentUpdatedListner() {
    return this.studentUpdated.asObservable();
  }
  deleteStudentRecord(id: string) {
    this.http.delete("http://localhost:3000/api/student" + id).subscribe(() => {
      const updatedStudentList = this.students.filter(
        (student) => student.id !== id
      );
      this.students = updatedStudentList;
      this.studentUpdated.next([...this.students]);
    });
  }
  updateStudentRecord(
    id: string,
    name: string,
    dateOfBirth: Date,
    phoneNumber: number,
    bloodGroup: string,
    address: string,
    department: string,
    batch: string,
    emailId: string
  ) {
    const studentData: Student = {
      name: name,
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber,
      bloodGroup: bloodGroup,
      address: address,
      department: department,
      batch: batch,
      id: id,
      emailId: emailId,
    };
    this.http
      .put("http://localhost:3000/api/student" + id, studentData)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
