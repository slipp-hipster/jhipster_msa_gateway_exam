import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Owner } from './owner.model';
import { OwnerService } from './owner.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-owner',
    templateUrl: './owner.component.html'
})
export class OwnerComponent implements OnInit, OnDestroy {
owners: Owner[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ownerService: OwnerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ownerService.query().subscribe(
            (res: ResponseWrapper) => {
                this.owners = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOwners();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Owner) {
        return item.id;
    }
    registerChangeInOwners() {
        this.eventSubscriber = this.eventManager.subscribe('ownerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
