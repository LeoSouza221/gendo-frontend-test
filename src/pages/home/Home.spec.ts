import { render, waitFor, screen } from '@testing-library/vue';
import { setupServer } from 'msw/node';
import { HttpResponse, delay, http } from 'msw';
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
  describe('when load page', () => {
    it('should send requests', async () => {
      render(Home);

      await waitFor(() => {
        expect(counter).toBe(3);
      });
    });

    it('should be loading page', () => {
      render(Home);

      expect(screen.queryByRole('status')).toBeInTheDocument();
    });

    it('should have input value', async () => {
      render(Home);

      const element = await screen.findByPlaceholderText('Username');

      expect(element).toHaveValue('LeoSouza221');
    });
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
  describe('when enter a new user', () => {
    it('should do new requests', async () => {
      render(Home);

      const input = await screen.findByPlaceholderText('Username');
      const button = screen.getByRole('button', { name: 'Search' });

      input.setSelectionRange(0, 10);
      userEvent.type(input, '{backspace}teste');

      userEvent.click(button);

      server.use(
        http.get('api/users/teste', async ({}) => {
          counter += 1;
          return HttpResponse.json();
        }),
        http.get('api/users/teste/repos', async ({}) => {
          counter += 1;
          return HttpResponse.json();
        }),
        http.get('api/users/teste/starred', async ({}) => {
          counter += 1;
          return HttpResponse.json();
        }),
      );

      await waitFor(() => {
        expect(counter).toBe(6);
      });
    });
    it('should show loading when searching', async () => {
      render(Home);

      const input = await screen.findByPlaceholderText('Username');
      const button = screen.getByRole('button', { name: 'Search' });

      input.setSelectionRange(0, 10);
      userEvent.type(input, '{backspace}teste');

      userEvent.click(button);

      server.use(
        http.get('api/users/teste', async ({}) => {
          delay('infinite');
          return HttpResponse.json({ name: 'teste' });
        }),
        http.get('api/users/teste/repos', async ({}) => {
          delay('infinite');
          return HttpResponse.json();
        }),
        http.get('api/users/teste/starred', async ({}) => {
          delay('infinite');
          return HttpResponse.json();
        }),
      );

      await waitFor(() => {
        expect(screen.queryByRole('status')).toBeInTheDocument();
      });
    });
    // it('should get new user infos', async () => {
    //   render(Home);

    //   const input = await screen.findByPlaceholderText('Username');
    //   const button = screen.getByRole('button', { name: 'Search' });

    //   input.setSelectionRange(0, 10);
    //   userEvent.type(input, '{backspace}basarbk');

    //   userEvent.click(button);

    //   let resolveFunc;
    //   const promise = new Promise((resolve) => {
    //     resolveFunc = resolve;
    //   });

    //   server.use(
    //     http.get('api/users/basarbk', async ({}) => {
    //       await promise;
    //       return HttpResponse.json({ name: 'Basar' });
    //     }),
    //   );

    //   // @ts-ignore
    //   await resolveFunc();

    //   await waitFor(() => {
    //     expect(screen.queryByText('Basar')).toBeInTheDocument();
    //   });
    // });
  });
  it('show error when leave input empty', async () => {
    render(Home);

    const input = await screen.findByPlaceholderText('Username');
    const button = screen.getByRole('button', { name: 'Search' });

    input.setSelectionRange(0, 12);
    userEvent.type(input, '{backspace}');
    userEvent.click(button);

    expect(screen.queryByText('Enter a username')).toBeInTheDocument();
  });
});
