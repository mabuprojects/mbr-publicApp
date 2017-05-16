import { MbrPublicAppPage } from './app.po';

describe('mbr-public-app App', function() {
  let page: MbrPublicAppPage;

  beforeEach(() => {
    page = new MbrPublicAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
