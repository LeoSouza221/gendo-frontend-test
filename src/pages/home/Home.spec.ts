import { render, waitFor, screen } from '@testing-library/vue';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import Home from './Home.vue';

let counter = 0;
const server = setupServer(
  http.get('api/users/LeoSouza221', () => {
    counter += 1;
    return HttpResponse.json({});
  }),
  http.get('api/users/LeoSouza221/repos', () => {
    counter += 1;
    return HttpResponse.json({});
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
      expect(counter).toBe(2);
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

      await resolveFunc();

      await waitFor(() => {
        expect(screen.queryByText('Leonardo')).toBeInTheDocument();
      });
    });
  });

  // describe('when fail to load user', () => {
  //   it('display error message on screen', async () => {
  //     render(Home);

  //     server.use(
  //       http.get('api/users/LeoSouza123', () => {
  //         return HttpResponse.error();
  //       }),
  //     );

  //     const text = await screen.findByText('Unnexpected Error');
  //     expect(text).toBeInTheDocument();
  //   });
  // });

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
          return HttpResponse.json([
            { full_name: 'repo1' },
            { full_name: 'repo2' },
            { full_name: 'repo3' },
          ]);
        }),
      );

      await resolveFunc();

      await waitFor(() => {
        expect(screen.queryAllByText(/repo/).length).toBe(3);
      });
    });
  });
});
