import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Contents } from './contents.model';
import { ContentsService } from './contents.service';

@Component({
    selector: 'jhi-contents-detail',
    templateUrl: './contents-detail.component.html'
})
export class ContentsDetailComponent implements OnInit, OnDestroy {

    contents: Contents;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private contentsService: ContentsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInContents();
    }

    load(id) {
        this.contentsService.find(id).subscribe((contents) => {
            this.contents = contents;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInContents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'contentsListModification',
            (response) => this.load(this.contents.id)
        );
    }
}
