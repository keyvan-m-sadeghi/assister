import { newE2EPage } from '@stencil/core/testing';

describe('chat-pane', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<chat-pane></chat-pane>');

    const element = await page.find('chat-chat');
    expect(element).toHaveClass('hydrated');
  });

  it('contains a "Profile Page" button', async () => {
    const page = await newE2EPage();
    await page.setContent('<chat-pane></chat-chat>');

    const element = await page.find('chat-pane ion-content ion-button');
    expect(element.textContent).toEqual('Profile page');
  });
});
