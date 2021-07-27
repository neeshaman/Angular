import { ThirdAppPage } from './app.po';

describe('third-app App', function() {
  let page: ThirdAppPage;

  beforeEach(() => {
    page = new ThirdAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
