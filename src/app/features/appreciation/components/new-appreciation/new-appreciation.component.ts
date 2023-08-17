import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { GivenAppreciationActions } from 'src/app/features/appreciation/store/appreciation-action-types';
import {
  selectGivenAppreciationSingleLoading,
} from 'src/app/features/appreciation/store/entities/given-appreciation/given-appreciation..selectors';
import { selectAllUsers, selectUserListLoading } from 'src/app/features/home/store/entities/user/user.selectors';
import { UserActions } from 'src/app/features/home/store/home-action-types';
import { SnackbarType } from 'src/app/models/ui.model';
import { User } from 'src/app/models/user.model';
import { ThemeService } from 'src/app/services/theme.service';
import { UIService } from 'src/app/services/ui.service';
import { ImageSize } from 'src/app/shared/enums/image-size.enum';
import { CommonStatic } from 'src/app/shared/utils/common-static';

@UntilDestroy()
@Component({
  selector: 'app-new-appreciation',
  templateUrl: './new-appreciation.component.html',
  styleUrls: ['./new-appreciation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAppreciationComponent implements OnInit {
  private _user: User;

  public get user(): User {
    return this._user;
  }

  @Input()
  public set user(value: User) {
    this._user = value;
    if (value) {
      this.selectedEmployees.length = 0;
      this.selectedEmployees.push(value);
    }
  }

  @Output() closeDrawerClicked = new EventEmitter();

  appreciationTypeControl = new FormControl('1', Validators.required); // Default Appreciation
  toWhomControl = new FormControl([]);
  remarksControl = new FormControl('', Validators.required);
  searchControl = new FormControl();

  usersLoading$ = this.store$.select(selectUserListLoading);

  users: User[] = [];
  filteredUsers: User[] = [];

  selectedEmployees: User[] = [];

  dialogTitle = 'Appreciate';

  singleLoading$ = this.store$.select(selectGivenAppreciationSingleLoading);

  constructor(
    private store$: Store,
    public themeService: ThemeService,
    private uiService: UIService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this._user) {
      this.store$.dispatch(UserActions.listIsLoading());
      this.store$.dispatch(UserActions.getUsersFromDB());
    }

    this.store$
      .pipe(untilDestroyed(this), select(selectAllUsers))
      .subscribe((value) => {
        this.users = value.filter(
          (f) => f.id !== CommonStatic.getUserId() && f.isActive === true
        );

        this.filteredUsers = [...this.users];
        this.cdr.detectChanges();
      });

    this.appreciationTypeControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (value) {
          switch (+value) {
            case 1:
              this.dialogTitle = 'Appreciate';
              break;
            case 2:
              this.dialogTitle = 'Congratulate';
              break;

            case 3:
              this.dialogTitle = 'Wish';
              break;
          }
          this.cdr.detectChanges();
        }
      });

    this.searchControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value: string) => {
        if (value) {
          const toSearch = value.trim();
          if (toSearch) {
            this.filteredUsers = this.users.filter(
              (f) =>
                f.fullName.toLowerCase().includes(toSearch.toLowerCase()) ||
                f.employeeCode.toLowerCase().includes(toSearch.toLowerCase())
            );
          } else {
            this.filteredUsers = [...this.users];
          }
        } else {
          this.filteredUsers = [...this.users];
        }
      });
  }

  sendAppreciation() {
    this.toWhomControl.markAllAsTouched();
    this.remarksControl.markAllAsTouched();
    this.appreciationTypeControl.markAllAsTouched();
    this.cdr.detectChanges();
    if (
      !this.toWhomControl.valid ||
      !this.remarksControl.valid ||
      !this.appreciationTypeControl.valid
    ) {
      return;
    }

    if (this.selectedEmployees.length === 0) {
      this.uiService.showSnackBar(
        'Please select atleast one employee',
        SnackbarType.warn
      );
      return;
    }

    this.store$.dispatch(
      GivenAppreciationActions.sendAppreciation({
        params: {
          fromUserId: CommonStatic.getUserId(),
          toUserIds: this.getAllSelectedIds(),
          type: +this.appreciationTypeControl.value,
          comments: this.remarksControl.value,
        },
      })
    );
  }

  getAllSelectedIds() {
    const toReturn = [];
    if (this.user) {
      toReturn.push(this.user.id);
    } else {
      this.selectedEmployees.forEach((item) => {
        toReturn.push(item.id);
      });
    }

    return toReturn;
  }

  toWhomSelected() {
    this.selectedEmployees = [];

    const tempToWhomArray = this.toWhomControl.value;

    let toWhomArray: [] = tempToWhomArray ? tempToWhomArray : [];

    if (toWhomArray.length > 0) {
      toWhomArray.forEach((item) => {
        const found = this.users.find((f) => f.id === item);

        if (found) {
          this.selectedEmployees.push(found);
        }
      });
    }

    this.cdr.detectChanges();
  }

  removeSelectedEmployee(emp) {
    this.selectedEmployees.splice(this.selectedEmployees.indexOf(emp), 1);

    let toWhomArray: [] = this.toWhomControl.value;

    this.toWhomControl.patchValue(toWhomArray.filter((f) => f !== emp.id));
    this.cdr.detectChanges();
  }

  getImageUrl(obj) {
    return CommonStatic.getImageUrl(obj.profileImage, ImageSize.SMALL);
  }

  trackByUsers(index: number, user: User) {
    return user.id;
  }
}
