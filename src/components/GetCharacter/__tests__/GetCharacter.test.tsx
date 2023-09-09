import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import GetCharacter from '../GetCharacter';

describe('GetCharacter', () => {
  test('Renders the component', () => {
    render(<GetCharacter />);
    expect(true).toBeTruthy();
  });
});
