import { ServiceStartPage } from './app.po';

describe('service-start App', function() {
  let page: ServiceStartPage;

  beforeEach(() => {
    page = new ServiceStartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
