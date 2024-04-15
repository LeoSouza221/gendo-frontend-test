import { render, screen } from '@testing-library/vue';
import UserDetailsSide from '../UserDetailsSide.vue';

describe('UserDetailsSide', () => {
  describe('when user dont has a profile image', () => {
    it('show default image', async () => {
      render(UserDetailsSide);

      const icon = await screen.findByTestId('user-icon');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('when user has a profile image', () => {
    it('show user image', async () => {
      render(UserDetailsSide, {
        global: {
          provide: { user: { avatar_url: 'myImage' } },
        },
      });

      const image = screen.getByAltText('image');
      expect(image).toHaveAttribute('src', 'myImage');
    });
  });
});
