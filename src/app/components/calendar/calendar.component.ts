import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseSlotsService } from '../../services/courses-slots.service';
import { WeekDay } from '../../model/model.week-day';
import { CourseSlot } from '../../model/model.course-slots';
import { WeekUtils } from '../../utils/WeekUtils';
import { forEach } from 'underscore';
import { unix } from 'moment';
import { Observable } from 'rxjs/Observable';
import { CreneauService } from '../../services/creneau.service';
import { UserService } from '../../services/user.service';
import { User } from '../../model/model.user';
import { Utilisateur, AccessToken } from '../../shared/sdk/models';
import {UtilisateurApi} from "../../shared/sdk";
import { AuthGuard } from '../../shared/auth.guard';

@Component({
  selector: 'week-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    currentUser: Utilisateur;
  cancelDeleteSlot: any;
  @Input() year: number;
  @Input() weekNumber: number;
  ngOnChanges(weekNumber: number) {
    this.updateSlots();
  }

  courseSlotsObservable: Observable<CourseSlot[]>;
  days = {
    Lundi: WeekDay.Lundi,
    Mardi: WeekDay.Mardi,
    Mercredi: WeekDay.Mercredi,
    Jeudi: WeekDay.Jeudi,
    Vendredi: WeekDay.Vendredi,
    Samedi: WeekDay.Samedi,
    Dimanche: WeekDay.Dimanche
  };

  constructor(private userService: UtilisateurApi, private coursesSlotService: CourseSlotsService, private creneauService: CreneauService) {
      this.currentUser = this.userService.getCachedCurrent();
    this.courseSlotsObservable = coursesSlotService.fetchSlots(this.currentUser.numero_uai, this.year, this.weekNumber);
  }

  updateSlots() {
    this.courseSlotsObservable = this.coursesSlotService.fetchSlots(this.currentUser.numero_uai, this.year, this.weekNumber);
  }

  ngOnInit() {

  }

  cancelDeleteAction () {
    this.creneauService.postSlot( this.cancelDeleteSlot, this.currentUser.numero_uai)
    this.updateSlots();
    this.cancelDeleteSlot = null;
  }

  receiveUpdateOnDeleteSlot(slot : any) {
    this.cancelDeleteSlot = slot;
    this.updateSlots();
  }


}
