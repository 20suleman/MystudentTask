import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from './student.model';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: Student[] = [];
  private studentsSubject = new BehaviorSubject<Student[]>(this.students);

  getStudents() {
    return this.studentsSubject.asObservable();
  }

  addStudent(student: Student) {
    console.log('Adding student:', student);
    this.students.push({ ...student, id: this.students.length + 1 });
    this.studentsSubject.next(this.students);
  }

  updateStudent(updatedStudent: Student) {
    const index = this.students.findIndex((s) => s.id === updatedStudent.id);
    if (index !== -1) {
      this.students[index] = updatedStudent;
      this.studentsSubject.next(this.students);
    }
  }

  deleteStudent(id: number) {
    this.students = this.students.filter((student) => student.id !== id);
    this.studentsSubject.next(this.students);
  }
}
