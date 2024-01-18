import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/services/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {
  btnText = 'Compartilhar!';

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async createHandler(moment: Moment) {
    // console.log('Dados do momento:', moment);

    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);
    formData.append('image', moment.image);

    this.momentService.createMoment(formData).subscribe({
      next: () => {
        this.messagesService.add('Momento adicionado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erro ao adicionar o Momento', error);
      }
    });
    
  }

}

  

  