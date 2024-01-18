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

  async onFileSlected(event: any) {

    const file: File = event.target.files[0]
    const imageBase64 = await this.imageToBase64(file);
    this.momentForm.patchValue({image: imageBase64})

  }

  private async imageToBase64(imageFile: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = reject;

      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Image = base64String.split(',')[1];
        resolve(base64Image);
      };

      reader.readAsDataURL(imageFile);
    });
  }

  submit() {
    if(this.momentForm.invalid){
      return;
    }
    console.log(this.momentForm.value);

    this.onSubmit.emit(this.momentForm.value)
  }
}
