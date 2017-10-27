import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Contents } from './contents.model';
import { ContentsPopupService } from './contents-popup.service';
import { ContentsService } from './contents.service';

@Component({
    selector: 'jhi-contents-delete-dialog',
    templateUrl: './contents-delete-dialog.component.html'
})
export class ContentsDeleteDialogComponent {

    contents: Contents;

    constructor(
        private contentsService: ContentsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contentsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'contentsListModification',
                content: 'Deleted an contents'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contents-delete-popup',
    template: ''
})
export class ContentsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private contentsPopupService: ContentsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.contentsPopupService
                .open(ContentsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
