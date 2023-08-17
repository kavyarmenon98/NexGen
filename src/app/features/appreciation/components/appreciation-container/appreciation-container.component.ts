import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import {
  GivenAppreciationActions,
  ReceivedAppreciationActions,
} from 'src/app/features/appreciation/store/appreciation-action-types';
import {
  selectAllGivenAppreciations,
  selectGivenAppreciationListLoading,
  selectGivenAppreciationSavedSuccessfully,
} from 'src/app/features/appreciation/store/entities/given-appreciation/given-appreciation..selectors';
import {
  selectAllReceivedAppreciations,
  selectReceivedAppreciationListLoading,
} from 'src/app/features/appreciation/store/entities/received-appreciation/received-appreciation..selectors';
import { AppreciationTypes } from 'src/app/features/home/enums/appreciation-types.enum';
import { HomeUIActions } from 'src/app/features/home/store/home-action-types';
import { ThemeService } from 'src/app/services/theme.service';
import { UIService } from 'src/app/services/ui.service';
import {
  CustomAgGridBooleanCellComponent,
} from 'src/app/shared/components/custom-ag-grid/sub-components/custom-ag-grid-boolean-cell/custom-ag-grid-boolean-cell.component';
import { CommonStatic } from 'src/app/shared/utils/common-static';

@UntilDestroy()
@Component({
  selector: 'app-appreciation-container',
  templateUrl: './appreciation-container.component.html',
  styleUrls: ['./appreciation-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppreciationContainerComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer;

  receivedAppreciations$ = this.store$.select(selectAllReceivedAppreciations);

  receivedAppreciationIsLoading$ = this.store$.select(
    selectReceivedAppreciationListLoading
  );

  givenAppreciations$ = this.store$.select(selectAllGivenAppreciations);

  givenAppreciationIsLoading$ = this.store$.select(
    selectGivenAppreciationListLoading
  );

  appreciationType = CommonStatic.enumToObjectArraySwitchKeyValue(
    AppreciationTypes
  );

  frameworkComponents;

  receivedAppreciationColumns = [];
  givenAppreciationColumns = [];

  constructor(
    public themeService: ThemeService,
    private store$: Store,
    private cdr: ChangeDetectorRef,
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    this.frameworkComponents = {
      booleanCell: CustomAgGridBooleanCellComponent,
    };

    // Page Title
    this.store$.dispatch(
      HomeUIActions.setPageTitle({
        title: '',
      })
    );

    this.initReceivedAppreciationColumns();
    this.initGivenAppreciationColumns();

    this.store$.dispatch(
      ReceivedAppreciationActions.getReceivedAppreciationsFromDB()
    );

    this.store$.dispatch(
      GivenAppreciationActions.getGivenAppreciationsFromDB()
    );

    this.store$
      .pipe(
        untilDestroyed(this),
        select(selectGivenAppreciationSavedSuccessfully)
      )
      .subscribe((value) => {
        if (value) {
          this.store$.dispatch(
            GivenAppreciationActions.clearSavedSuccessfullyFlag()
          );

          if (this.drawer) {
            this.drawer.close();
          }
        }
      });
  }

  initReceivedAppreciationColumns() {
    this.receivedAppreciationColumns = [
      {
        headerName: '#',
        flex: 1,
        minWidth: 40,
        maxWidth: 40,
        pinned: 'left',
        filter: false,
        resizable: false,
        sortable: false,
        valueGetter: 'node.rowIndex + 1',
        cellStyle: {
          textAlign: 'center',
          'padding-left': '2px',
          'padding-right': '2px',
        },
        lockPosition: true,
        headerClass: 'center-header',
      },
      {
        headerName: 'Date',
        field: 'createdDate',
        tooltipField: 'createdDate',
        flex: 1,
        minWidth: 185,
        filter: false,
        sortable: false,
      },

      {
        headerName: 'Type',
        field: 'type',
        tooltipField: 'type',
        flex: 1,
        minWidth: 160,
        valueGetter: (params) => {
          const found = this.appreciationType.find(
            (f) => f.value === params.data.type + ''
          );

          if (found) {
            return found.label;
          }
          return params.data.type;
        },
      },
      {
        headerName: 'From',
        field: 'by',
        tooltipField: 'by',
        flex: 1,
        minWidth: 150,
      },
      {
        headerName: 'Remarks',
        field: 'remarks',
        tooltipField: 'remarks',
        flex: 2,
        minWidth: 200,
      },

      {
        headerName: 'Responded',
        field: 'hasResponded',
        minWidth: 120,
        maxWidth: 120,
        cellRenderer: 'booleanCell',
        filter: false,
        cellStyle: { textAlign: 'center' },
        headerClass: 'center-header',
      },
      {
        headerName: 'Responded On',
        field: 'respondedDate',
        tooltipField: 'respondedDate',
        flex: 1,
        minWidth: 185,
        maxWidth: 185,
        filter: false,
        sortable: false,
        valueGetter: (params) => {
          if (!params.data.hasResponded) {
            return '-';
          }
          return params.data.respondedDate;
        },
      },
    ];
  }

  initGivenAppreciationColumns() {
    this.givenAppreciationColumns = [
      {
        headerName: '#',
        flex: 1,
        minWidth: 40,
        maxWidth: 40,
        pinned: 'left',
        filter: false,
        resizable: false,
        sortable: false,
        valueGetter: 'node.rowIndex + 1',
        cellStyle: {
          textAlign: 'center',
          'padding-left': '2px',
          'padding-right': '2px',
        },
        lockPosition: true,
        headerClass: 'center-header',
      },
      {
        headerName: 'Date',
        field: 'createdDate',
        tooltipField: 'createdDate',
        flex: 1,
        minWidth: 185,
        maxWidth: 185,
        filter: false,
        sortable: false,
      },

      {
        headerName: 'Type',
        field: 'type',
        tooltipField: 'type',
        flex: 1,
        minWidth: 160,
        valueGetter: (params) => {
          const found = this.appreciationType.find(
            (f) => f.value === params.data.type + ''
          );

          if (found) {
            return found.label;
          }
          return params.data.type;
        },
      },
      {
        headerName: 'To',
        field: 'to',
        tooltipField: 'to',
        flex: 1,
        minWidth: 150,
      },
      {
        headerName: 'Remarks',
        field: 'remarks',
        tooltipField: 'remarks',
        flex: 2,
        minWidth: 200,
      },

      {
        headerName: 'User Response',
        field: 'userResponse',
        tooltipField: 'userResponse',
        flex: 2,
        minWidth: 200,
        valueGetter: (params) => {
          if (!params.data.hasResponded) {
            return '-';
          }
          return params.data.userResponse;
        },
      },
      {
        headerName: 'Responded On',
        field: 'respondedDate',
        tooltipField: 'respondedDate',
        flex: 1,
        minWidth: 185,
        maxWidth: 185,
        filter: false,
        sortable: false,
        valueGetter: (params) => {
          if (!params.data.hasResponded) {
            return '-';
          }
          return params.data.respondedDate;
        },
      },
    ];
  }

  closeDrawer() {
    if (this.drawer) [this.drawer.close()];
  }
}
