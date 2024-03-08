import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // import this

import { DirectorsComponent } from './directors.component';

describe('DirectorsComponent', () => {
  let component: DirectorsComponent;
  let fixture: ComponentFixture<DirectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectorsComponent],
      imports: [HttpClientTestingModule] // add this line
    })
      .compileComponents();

    fixture = TestBed.createComponent(DirectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
