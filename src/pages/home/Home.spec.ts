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
      expect(counter).toBe(1);
    });
  });

  it('should be loading when load the screen', () => {
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

  //     let resolveFunc;
  //     const promise = new Promise((resolve) => {
  //       resolveFunc = resolve;
  //     });

  //     server.use(
  //       http.get('api/users/LeoSouza123123', async ({}) => {
  //         await promise;
  //         return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
  //       }),
  //     );

  //     await resolveFunc();

  //     await waitFor(() => {
  //       expect(screen.queryByText('Not Found')).toBeInTheDocument();
  //     });
  //   });
  // });
});
