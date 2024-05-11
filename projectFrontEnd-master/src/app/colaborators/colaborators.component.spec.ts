import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboratorsComponent } from './colaborators.component';

describe('ColaboratorsComponent', () => {
  let component: ColaboratorsComponent;
  let fixture: ComponentFixture<ColaboratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColaboratorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
