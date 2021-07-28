import { FourthAppPage } from './app.po';

describe('fourth-app App', function() {
  let page: FourthAppPage;

  beforeEach(() => {
    page = new FourthAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
