import { render, waitFor, screen } from '@testing-library/vue';
import ListRepos from '../ListRepos.vue';

describe.only('ListRepos', () => {
  describe('when repos has at least one', () => {
    it('should display correct repositories on screen', async () => {
      render(ListRepos, { props: { repos: [{ name: 'repo 1' }] } });

      await waitFor(() => {
        expect(screen.queryAllByText(/repo/).length).toBe(1);
      });
    });
  });

  describe('when there isnt repos', () => {
    it('should not display repositories on screen', async () => {
      render(ListRepos, { props: { repos: [] } });

      const reposList = await screen.queryByTestId('repos-list');

      expect(reposList).not.toBeInTheDocument();
    });
  });
});
