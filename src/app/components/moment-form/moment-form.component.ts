import { Component,OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Moment } from 'src/app/services/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  @Input() btnText!: string
  @Output() onSubmit = new EventEmitter<Moment>()

  momentForm!: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required] ),
      description: new FormControl(''),
      image: new FormControl('')
    });
  } 

  get title() {
    return this.momentForm.get('title')!;

  }

  get description() {
    return this.momentForm.get('description')!;

  }

  onFileSlected(event: any) {

    const file: File = event.target.files[0]

    this.momentForm.patchValue({image: file})

  }

  submit() {
    if(this.momentForm.invalid){
      return;
    }
    console.log(this.momentForm.value);

    this.onSubmit.emit(this.momentForm.value)
  }
}