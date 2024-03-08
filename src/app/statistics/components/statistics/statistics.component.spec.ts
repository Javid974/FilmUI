import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StatisticsComponent } from './statistics.component';
import { StatisticsService } from 'src/services/statistics.service';
import { YearSelectComponent } from 'src/app/shared/components/year-select/year-select.component';
import { FormsModule } from '@angular/forms';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule], // Fournir le HttpClientTestingModule
      declarations: [StatisticsComponent, YearSelectComponent],
      providers: [StatisticsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
