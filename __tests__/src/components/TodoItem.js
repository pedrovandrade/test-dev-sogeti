import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import TodoItem from '../../../src/components/TodoItem';
import { render, fireEvent, getByRole, queryByText } from '@testing-library/react';
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
  let container;

  // Do a wrapper for the component
  function TodoItemtMock(props) {
    const [listData, setListData] = useState(mockList);
    return (
      <
        TodoItem
        data={listData[props.index]}
        deleteItem={() => null}
        listData={listData}
        setListData={setListData}
        index={props.index}
        key={props.index}
        />
      );
  }

  it('should expose a function component', () => {
    expect(TodoItem).toBeInstanceOf(Function);
  });
  it('should render correctly', () => {
    const tree = renderer
    .create(
      <MemoryRouter>
        <
          TodoItem
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
  describe('When the app start', () => {
    beforeEach(() => {
      container = render(
        <MemoryRouter>
          <TodoItemtMock index={0} />
        </MemoryRouter>
      ).container;
    });
    it('should have a todo item with title displayed and NOT crossed out', () => {
      const title = queryByText(container, mockList[0].title);
      expect(title).not.toBeNull();
      expect(title.classList.contains('checked')).toBe(false);
    });
    it('should have an unchecked checkbox for the item', () => {
      const checkbox = getByRole(container, 'checkbox');
      expect(checkbox.checked).toBe(false);
    });
    it('should have a link for the item to see its description', () => {
      const link = getByRole(container, 'link');
      expect(link.pathname).toBe(`/details/${mockList[0].uuid}`);
    });
  });
  describe('When the item\'s checkbox is checked and the item is NOT the last', () => {
    beforeEach(() => {
      container = render(
        <MemoryRouter>
          <TodoItemtMock index={0} />
        </MemoryRouter>
      ).container;
    })
    it('should change its title towards the next one on the list', () => {
      const checkbox = getByRole(container, 'checkbox');
      fireEvent.click(checkbox);
      const title = queryByText(container, mockList[1].title);
      expect(title).not.toBeNull();
      expect(title.classList.contains('checked')).toBe(false);
    });
  });
  describe('When the item\'s checkbox is checked and the item is the last', () => {
    beforeEach(() => {
      container = render(
        <MemoryRouter>
          <TodoItemtMock index={2} />
        </MemoryRouter>
      ).container;
    })
    it('should keep its title and being crossed out', () => {
      const checkbox = getByRole(container, 'checkbox');
      fireEvent.click(checkbox);
      const title = queryByText(container, mockList[2].title);
      expect(title).not.toBeNull();
      expect(title.classList.contains('checked')).toBe(true);
    });
  });
  describe('When the item\'s checkbox is unchecked', () => {
    beforeEach(() => {
      container = render(
        <MemoryRouter>
          <TodoItemtMock index={2} />
        </MemoryRouter>
      ).container;
    })
    it('should change its title towards the previous unchecked one on the list', () => {
      const checkbox = getByRole(container, 'checkbox');
      fireEvent.click(checkbox);
      let title = queryByText(container, mockList[1].title);
      expect(title).not.toBeNull();
    });
  });
});
