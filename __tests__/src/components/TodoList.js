import React from 'react';
import renderer from 'react-test-renderer';
import TodoList from '../../../src/components/TodoList';
import { MemoryRouter } from 'react-router-dom';

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
  
  it('should expose a function component', () => {
    expect(TodoList).toBeInstanceOf(Function);
  });
  it('should render correctly', () => {
    const tree = renderer
    .create(
      <MemoryRouter>
        <TodoList listData={mockList} setListData={() => null} />)
      </MemoryRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
