import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Contents } from './contents.model';
import { ContentsPopupService } from './contents-popup.service';
import { ContentsService } from './contents.service';
import { Owner, OwnerService } from '../owner';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-contents-dialog',
    templateUrl: './contents-dialog.component.html'
})
export class ContentsDialogComponent implements OnInit {

    contents: Contents;
    isSaving: boolean;

    owners: Owner[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private contentsService: ContentsService,
        private ownerService: OwnerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ownerService.query()
            .subscribe((res: ResponseWrapper) => { this.owners = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.contents.id !== undefined) {
            this.subscribeToSaveResponse(
                this.contentsService.update(this.contents));
        } else {
            this.subscribeToSaveResponse(
                this.contentsService.create(this.contents));
        }
    }

    private subscribeToSaveResponse(result: Observable<Contents>) {
        result.subscribe((res: Contents) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Contents) {
        this.eventManager.broadcast({ name: 'contentsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOwnerById(index: number, item: Owner) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-contents-popup',
    template: ''
})
export class ContentsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contentsPopupService: ContentsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.contentsPopupService
                    .open(ContentsDialogComponent as Component, params['id']);
            } else {
                this.contentsPopupService
                    .open(ContentsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
