import { render, screen } from '@testing-library/vue';
import UserDetailsSide from '../UserDetailsSide.vue';

describe('UserDetailsSide', () => {
  describe('when user dont has a profile image', () => {
    it('show default image', async () => {
      render(UserDetailsSide, { props: { user: {} } });

      const icon = await screen.findByTestId('user-icon');
      expect(icon).toBeInTheDocument();

      // const image = screen.getByTestId('user-icon');
      // expect(image).toHaveAttribute('src', '/images/user-image.png');
    });
  });

  describe('when user has a profile image', () => {
    it('show user image', async () => {
      render(UserDetailsSide, { props: { user: { image: 'myImage' } } });

      const image = screen.getByAltText('image');
      expect(image).toHaveAttribute('src', 'myImage');
    });
  });
});
