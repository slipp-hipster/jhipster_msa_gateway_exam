/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ContentsDetailComponent } from '../../../../../../main/webapp/app/entities/contents/contents-detail.component';
import { ContentsService } from '../../../../../../main/webapp/app/entities/contents/contents.service';
import { Contents } from '../../../../../../main/webapp/app/entities/contents/contents.model';

describe('Component Tests', () => {

    describe('Contents Management Detail Component', () => {
        let comp: ContentsDetailComponent;
        let fixture: ComponentFixture<ContentsDetailComponent>;
        let service: ContentsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ContentsDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ContentsService,
                    JhiEventManager
                ]
            }).overrideTemplate(ContentsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContentsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContentsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Contents(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.contents).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
