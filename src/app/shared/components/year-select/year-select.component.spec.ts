import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearSelectComponent } from './year-select.component';
import { FormsModule } from '@angular/forms';

describe('YearSelectComponent', () => {
  let component: YearSelectComponent;
  let fixture: ComponentFixture<YearSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YearSelectComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(YearSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
