import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserHistoryPage } from './user-history.page';

describe('UserHistoryPage', () => {
  let component: UserHistoryPage;
  let fixture: ComponentFixture<UserHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
