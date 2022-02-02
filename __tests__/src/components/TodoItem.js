import React from 'react';
import renderer from 'react-test-renderer';
import TodoItem from '../../../src/components/TodoItem';
import { MemoryRouter } from 'react-router-dom';

describe('src/components/TodoItem.js', () => {
  it('should expose a function component', () => {
    expect(TodoItem).toBeInstanceOf(Function);
  });
  it('should render correctly', () => {
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

    const tree = renderer
    .create(
      <MemoryRouter>
        <TodoItem
          data={mockList[0]}
          deleteItem={() => null}
          listData={mockList}
          setListData={() => null}
          index={0}
          key={0}
        />
      </MemoryRouter>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
