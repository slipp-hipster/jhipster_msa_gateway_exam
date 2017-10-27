import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Contents } from './contents.model';
import { ContentsService } from './contents.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-contents',
    templateUrl: './contents.component.html'
})
export class ContentsComponent implements OnInit, OnDestroy {
contents: Contents[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private contentsService: ContentsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.contentsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.contents = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInContents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Contents) {
        return item.id;
    }
    registerChangeInContents() {
        this.eventSubscriber = this.eventManager.subscribe('contentsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
