import { render, waitFor, screen } from '@testing-library/vue';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import userEvent from '@testing-library/user-event';
import Home from './Home.vue';

let counter = 0;
const server = setupServer(
  http.get('api/users/LeoSouza221', () => {
    counter += 1;
    return HttpResponse.json({});
  }),
  http.get('api/users/LeoSouza221/repos', () => {
    counter += 1;
    return HttpResponse.json([]);
  }),
  http.get('api/users/LeoSouza221/starred', () => {
    counter += 1;
    return HttpResponse.json([]);
  }),
);

beforeEach(() => {
  counter = 0;
  server.resetHandlers();
});

beforeAll(() => server.listen());

afterAll(() => server.close());

describe.only('Home', () => {
  it('send request when load page', async () => {
    render(Home);

    await waitFor(() => {
      expect(counter).toBe(3);
    });
  });

  it('should be loading when open the screen', () => {
    render(Home);

    expect(screen.queryByRole('status')).toBeInTheDocument();
  });

  describe('when success to load user', () => {
    it('display user on screen', async () => {
      render(Home);

      let resolveFunc;
      const promise = new Promise((resolve) => {
        resolveFunc = resolve;
      });

      server.use(
        http.get('api/users/LeoSouza221', async ({}) => {
          await promise;
          return HttpResponse.json({ name: 'Leonardo' });
        }),
      );

      // @ts-ignore
      await resolveFunc();

      await waitFor(() => {
        expect(screen.queryByText('Leonardo')).toBeInTheDocument();
      });
    });
  });

  describe('when success to load repositories', () => {
    it('display repositories on screen', async () => {
      render(Home);

      let resolveFunc;
      const promise = new Promise((resolve) => {
        resolveFunc = resolve;
      });

      server.use(
        http.get('api/users/LeoSouza221/repos', async ({}) => {
          await promise;
          return HttpResponse.json([{ name: 'repo1' }, { name: 'repo2' }, { name: 'repo3' }]);
        }),
      );

      // @ts-ignore
      await resolveFunc();

      await waitFor(() => {
        expect(screen.queryAllByText(/repo/).length).toBe(3);
      });
    });
  });

  describe('when success to load starred', () => {
    it('display starred repositories on screen', async () => {
      render(Home);

      let resolveFunc;
      const promise = new Promise((resolve) => {
        resolveFunc = resolve;
      });

      server.use(
        http.get('api/users/LeoSouza221/starred', async ({}) => {
          await promise;
          return HttpResponse.json([
            { name: 'starred1', owner: { login: 'owner1' } },
            { name: 'starred2', owner: { login: 'owner1' } },
            { name: 'starred3', owner: { login: 'owner1' } },
          ]);
        }),
      );

      // @ts-ignore
      await resolveFunc();

      await waitFor(() => {
        expect(screen.queryAllByText(/starred/).length).toBe(3);
      });
    });
  });
});
