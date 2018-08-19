import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { User } from "../../model/model.user";
import { Message } from "../../model/model.message";
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { Observable, Subscriber, Subscription, BehaviorSubject, AsyncSubject, Subject } from 'rxjs';
import { UtilisateurApi } from '../../shared/sdk';
import { AuthGuard } from '../../shared/auth.guard';
import { Utilisateur } from '../../shared/sdk/models';
import {EtablissementApi} from '../../shared/sdk';
import * as moment from 'moment';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  currentUser: Utilisateur;
  idEleve: string;
  idEtablissement: string;
  messages: Message[];
  messages$: Subject<Message>;
  dateMessage: any;
  newMessage: Message = new Message;
  titrePage: String = 'Messagerie';

  constructor(
    private userService: UtilisateurApi,
    private etablissementAPI: EtablissementApi,
    private messageService: MessageService,
    public route: ActivatedRoute,

  ) {
    this.route.params.subscribe(params => {
      this.idEleve = params['id'];
    });
  //  this.currentUser = this.userService.getCurrentUserLogged();
      this.currentUser = this.userService.getCachedCurrent();

    this.idEtablissement = this.currentUser.numero_uai;

    this.messageService.getMessages(this.idEleve, this.currentUser.numero_uai).subscribe(previousMessages => {
      this.messages = previousMessages;
      this.messages$ = new BehaviorSubject<Message>(undefined);
      this.messages$.subscribe(msg => {
        if (msg !== undefined) {
          console.log('New msg');
          this.messages.push(msg);
          this.newMessage = new Message();
        }
      });
    });
  }

  ngOnInit() {
  }

  sendMessage(){
    this.newMessage.redacteur = this.currentUser;
    this.newMessage.dateMessage = moment().unix();

    this.etablissementAPI.getUtilisateurs(this.currentUser.numero_uai, {where: {'privilege': 'eleve', 'id': this.idEleve}} )
    // this.userService.getUser('eleve', this.idEtablissement, this.idEleve)
        .subscribe(user => {
      this.newMessage.eleve = user;
      this.messageService.postMessage(this.idEtablissement, this.newMessage).subscribe(data =>
        this.updateMessages(data.json())
      );
      //this.afterSendMessage();
    });

  }

  afterSendMessage(){
    document.forms['newMessage'].reset()
  }

  updateMessages(message:Message) {
    console.log('Data received ' + message.contenu);
    this.messages$.next(message);

  }
}
