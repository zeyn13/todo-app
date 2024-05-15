import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesTitleComponent } from './pages-title.component';

describe('PagesTitleComponent', () => {
  let component: PagesTitleComponent;
  let fixture: ComponentFixture<PagesTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagesTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
