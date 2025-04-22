import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { mockComicListInfoProps } from '../../../utils/test-helpers';
import ComicListInfo from '../ComicListinfo';

describe('ComicListInfo component', () => {
  test('renders the component', () => {
    render(<ComicListInfo comicList={mockComicListInfoProps.comicList} />);

    expect(document.querySelector('.card')).toBeInTheDocument();
    expect(document.querySelector('.card-image')).toBeInTheDocument();
    expect(document.querySelector('img')).toBeInTheDocument();
    expect(document.querySelector('img')).toHaveAttribute(
      'src',
      `${mockComicListInfoProps.comicList[0].thumbnail.path}.${mockComicListInfoProps.comicList[0].thumbnail.extension}`,
    );
    expect(document.querySelector('.card-content')).toBeInTheDocument();
    expect(document.querySelector('.comic-title')).toBeInTheDocument();
    expect(document.querySelector('.comic-title')).toHaveTextContent(
      mockComicListInfoProps.comicList[0].title.substring(0, 40) + '...',
    );
  });
});
