import { render } from '@testing-library/react';
import CharacterInfo from '../CharacterInfo';
import '@testing-library/jest-dom';
import { mockCharacterInfoProps } from '../../../utils/test-helpers';

describe('CharacterInfo component', () => {
  test('renders the component', () => {
    const { getByText } = render(
      <CharacterInfo
        heroName={`${mockCharacterInfoProps.heroName}`}
        heroImage={`${mockCharacterInfoProps.heroImage}`}
        heroDescription={`${mockCharacterInfoProps.heroDescription}`}
      />,
    );
    expect(document.querySelector('.card')).toBeInTheDocument();
    expect(document.querySelector('img')).toBeInTheDocument();
    expect(document.querySelector('img')).toHaveAttribute(
      'src',
      `${mockCharacterInfoProps.heroImage}`,
    );
    expect(
      getByText(`${mockCharacterInfoProps.heroDescription}`),
    ).toBeInTheDocument();
  });
});
