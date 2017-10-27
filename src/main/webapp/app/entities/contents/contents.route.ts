import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ContentsComponent } from './contents.component';
import { ContentsDetailComponent } from './contents-detail.component';
import { ContentsPopupComponent } from './contents-dialog.component';
import { ContentsDeletePopupComponent } from './contents-delete-dialog.component';

export const contentsRoute: Routes = [
    {
        path: 'contents',
        component: ContentsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.contents.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'contents/:id',
        component: ContentsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.contents.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contentsPopupRoute: Routes = [
    {
        path: 'contents-new',
        component: ContentsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.contents.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contents/:id/edit',
        component: ContentsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.contents.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contents/:id/delete',
        component: ContentsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.contents.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
