import { render, waitFor, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { AppTab, AppTabs } from '..';

const TabsComponent = {
  template: `
    <div>
      <AppTabs>
        <AppTab title="tab 1" :quantity="0"><span>teste 1</span></AppTab>
        <AppTab title="tab 2" :quantity="1"><span>teste 2</span></AppTab>
      </AppTabs>
    </div>
  `,
  components: {
    AppTab,
    AppTabs,
  },
};

describe.only('TabsComponent', () => {
  it('should have 2 tabs', async () => {
    render(TabsComponent);

    await waitFor(() => {
      expect(screen.queryAllByText(/tab/).length).toBe(2);
    });
  });

  it('should see the first tab content', async () => {
    render(TabsComponent);

    const text = await screen.findByText('teste 1');
    expect(text).toBeInTheDocument();
  });

  it('should not see the second tab content', async () => {
    render(TabsComponent);

    const text = await screen.findByText('teste 2');
    expect(text).not.toBeVisible();
  });

  describe('when click in other tab', () => {
    it('should see the tab 2 content', async () => {
      await render(TabsComponent);
      const user = userEvent.setup();

      const button = await screen.getByTestId('tab 2');
      await user.click(button);

      const text = await screen.findByText('teste 2');

      expect(text).toBeVisible();
    });

    it('should not see the tab 1 content', async () => {
      await render(TabsComponent);
      const user = userEvent.setup();

      const button = await screen.getByTestId('tab 2');
      await user.click(button);

      const text = await screen.findByText('teste 1');

      expect(text).not.toBeVisible();
    });
  });
});
