import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ContentsService,
    ContentsPopupService,
    ContentsComponent,
    ContentsDetailComponent,
    ContentsDialogComponent,
    ContentsPopupComponent,
    ContentsDeletePopupComponent,
    ContentsDeleteDialogComponent,
    contentsRoute,
    contentsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...contentsRoute,
    ...contentsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ContentsComponent,
        ContentsDetailComponent,
        ContentsDialogComponent,
        ContentsDeleteDialogComponent,
        ContentsPopupComponent,
        ContentsDeletePopupComponent,
    ],
    entryComponents: [
        ContentsComponent,
        ContentsDialogComponent,
        ContentsPopupComponent,
        ContentsDeleteDialogComponent,
        ContentsDeletePopupComponent,
    ],
    providers: [
        ContentsService,
        ContentsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayContentsModule {}
