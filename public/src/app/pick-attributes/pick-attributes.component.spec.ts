import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickAttributesComponent } from './pick-attributes.component';

describe('PickAttributesComponent', () => {
  let component: PickAttributesComponent;
  let fixture: ComponentFixture<PickAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
