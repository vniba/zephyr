import { render } from '@testing-library/react';
import Toast from './Toast';

describe('Toast component', function () {
  it('should match default snapshot', function () {
    const { container } = render(<Toast />);
    expect(container).toMatchSnapshot();
  });
});
