import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsStatsComponent } from './products-stats.component';

describe('ProductsStatsComponent', () => {
  let component: ProductsStatsComponent;
  let fixture: ComponentFixture<ProductsStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
