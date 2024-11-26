import { Component, input, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../student.service';
import { Student } from '../student.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css',
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  @Input() student: Student | null = null;

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    this.studentForm = this.fb.group({
      id: [null],
      name: [''],
      age: [null],
      grade: [''],
    });
  }

  ngOnInit() {
    if (this.student) {
      this.studentForm.patchValue(this.student);
    }
  }

  onSubmit() {
    if (this.student) {
      this.studentService.updateStudent(this.studentForm.value);
    } else {
      this.studentService.addStudent(this.studentForm.value);
    }
    this.studentForm.reset();
  }
}
