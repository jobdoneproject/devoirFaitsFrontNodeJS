import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseSlot } from '../../model/model.course-slots';
import { WeekDay } from '../../model/model.week-day';
import { WeekUtils } from '../../utils/WeekUtils';
import { Observable } from 'rxjs/Observable';
import { User } from '../../model/model.user';
import { UserService } from '../../services/user.service';
import {UtilisateurApi} from '../../shared/sdk';
import { Utilisateur, AccessToken } from '../../shared/sdk/models';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
  selector: 'week-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit {

  @Input() dayLabel: String;
  @Input() courseSlotsObservable: Observable<CourseSlot[]>;
  courseSlots: CourseSlot[];
  @Input() day: WeekDay;
  @Input() weekNumber: number;
  @Input() year: number;
  @Output() onDeleteEvent = new EventEmitter();
  currentUser: Utilisateur;

  ngOnChanges(weekNumber: number) {
    this.ngOnInit();
  }

  constructor(private userService: UtilisateurApi) {
    this.currentUser = this.userService.getCachedCurrent();
  }

  ngOnInit() {
    this.courseSlotsObservable.subscribe((resp) => {
      this.courseSlots = resp;
      this.filterSlotsMatchingThisDay();
      this.filterSlotsMatchingCurrentUser();
    });
  }

  get dayDate(): Date {
   return this.currentDate();
  }

  private currentDate(): Date
  {
    const mondayForCurrentWeek = WeekUtils.mondayForWeekNumber(this.weekNumber, this.year);
    const matchingDate = WeekUtils.getDateWithDaysOffset(mondayForCurrentWeek, WeekUtils.dayOfWeekDay(this.day));

    return matchingDate;
  }

  filterSlotsMatchingThisDay() {
    this.courseSlots = _.filter(this.courseSlots, (currentSlot) => {
      const dateDebut = moment.unix(currentSlot.dateDebut).utc().toDate();
      const thisDate = this.currentDate();

      const isSameDay = dateDebut.getFullYear() === this.year &&
       dateDebut.getMonth() === thisDate.getMonth() && dateDebut.getDay() === thisDate.getDay();

      return isSameDay;
    });
  }

  receiveUpdateOnDeleteSlot(slot: any) {
    this.onDeleteEvent.emit(slot);
  }
  filterSlotsMatchingCurrentUser() {
    const user = this.currentUser;
    this.courseSlots = _.filter(this.courseSlots, (currentSlot) => {
      let weMustKeepIt;

      if (user.privilege === 'Administrateur') {
        weMustKeepIt = true;
      } else if (user.privilege === 'Professeur') {
        weMustKeepIt = _.findWhere(currentSlot.professeurs, {mail: user.email});
      } else {
        weMustKeepIt = _.findWhere(currentSlot.eleves, {mail: user.email});
      }

      return weMustKeepIt;
    });
  }

}
