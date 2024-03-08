import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let mockBsModalService: jasmine.SpyObj<BsModalService>;

  beforeEach(async () => {
    mockBsModalService = jasmine.createSpyObj('BsModalService', [
      'show',
      'hide',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      imports: [
        BrowserModule,
        // d'autres imports...
      ],
      providers: [{ provide: BsModalService, useValue: mockBsModalService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
