import React from 'react';
import renderer from 'react-test-renderer';
import Details from '../../../src/routes/Details';
import { MemoryRouter } from 'react-router-dom';
import { render, queryByText } from '@testing-library/react';

describe('src/components/TodoItem.js', () => {
  const mockList = [
    {
      title: 'Do groceries',
      state: 'todo',
      description: 'Go to the supermarket and buy eggs, butter, sugar, fruits, soap and toillete paper',
      uuid: '8348db18-83ba-11ec-a8a3-0242ac120002'
    },
    {
      title: 'Wash car',
      state: 'todo',
      description: 'Take the car to the gas station and leave it there for 30 minutes in the express washing',
      uuid: '9c377382-83ba-11ec-a8a3-0242ac120002'
    },
    {
      title: 'Clean house',
      state: 'todo',
      description: 'Pass vaccum, clean the surfaces, clean the toillete and pass water on the floor',
      uuid: 'a081b5ec-83ba-11ec-a8a3-0242ac120002'
    }
  ];
  let container;

  it('should expose a function component', () => {
    expect(Details).toBeInstanceOf(Function);
  });
  it('should render correctly', () => {
    const tree = renderer
    .create(
			<MemoryRouter>
				<Details listData={mockList} />
			</MemoryRouter>
		).toJSON();

    expect(tree).toMatchSnapshot();
  });
  describe('When the app start', () => {
    beforeAll(() => {
      container = render(
				<MemoryRouter initialEntries={[{ pathname: `/details/${mockList[0].uuid}` }]} >
					<Details listData={mockList} />
				</MemoryRouter>
			).container;
    });
    it('should display the corresponding item\'s title and descrition', () => {
      const title = queryByText(container, mockList[0].title);
			const description = queryByText(container, mockList[0].description);
      expect(title).not.toBeNull();
			expect(description).not.toBeNull();
    });
  });
});
