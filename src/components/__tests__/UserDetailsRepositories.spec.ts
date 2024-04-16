import { render, screen } from '@testing-library/vue';
import UserDetailsRepositories from '../UserDetailsRepositories.vue';

describe('UserDetailsRepositories', () => {
  it('should see the repos tab', async () => {
    render(UserDetailsRepositories);

    const repos = await screen.findByTestId('data-repos');
    expect(repos).toBeInTheDocument();
  });

  it('should have repos tab', async () => {
    render(UserDetailsRepositories);

    const repos = await screen.findByText('Repos');
    expect(repos).toBeInTheDocument();
  });

  it('should have starred tab', async () => {
    render(UserDetailsRepositories);

    const starred = await screen.findByText('Starred');
    expect(starred).toBeInTheDocument();
  });
});
