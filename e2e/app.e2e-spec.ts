import { MsalAngularSamplePage } from './app.po';

describe('msal-angular-sample App', () => {
  let page: MsalAngularSamplePage;

  beforeEach(() => {
    page = new MsalAngularSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
