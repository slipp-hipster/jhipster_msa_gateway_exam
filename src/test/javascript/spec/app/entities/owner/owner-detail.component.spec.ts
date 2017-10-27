/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { OwnerDetailComponent } from '../../../../../../main/webapp/app/entities/owner/owner-detail.component';
import { OwnerService } from '../../../../../../main/webapp/app/entities/owner/owner.service';
import { Owner } from '../../../../../../main/webapp/app/entities/owner/owner.model';

describe('Component Tests', () => {

    describe('Owner Management Detail Component', () => {
        let comp: OwnerDetailComponent;
        let fixture: ComponentFixture<OwnerDetailComponent>;
        let service: OwnerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [OwnerDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    OwnerService,
                    JhiEventManager
                ]
            }).overrideTemplate(OwnerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OwnerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OwnerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Owner(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.owner).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
