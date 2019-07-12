import { newE2EPage } from '@stencil/core/testing';

describe('assister-chat', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<assister-chat></assister-chat>');

    const element = await page.find('assister-chat');
    expect(element).toHaveClass('hydrated');
  });

  it('contains a "Profile Page" button', async () => {
    const page = await newE2EPage();
    await page.setContent('<assister-chat></assister-chat>');

    const element = await page.find('assister-chat ion-content ion-button');
    expect(element.textContent).toEqual('Profile page');
  });
});
