import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import TodoList from '../../../src/components/TodoList';
import { render, fireEvent, getByRole, getAllByRole, queryByText } from '@testing-library/react';
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
  function TodoListMock() {
    const [listData, setListData] = useState(mockList);
    return <TodoList listData={listData} setListData={setListData} />
  }

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
  describe('When the app start', () => {
    beforeEach(() => {
      container = render(
        <MemoryRouter>
          <TodoListMock />
        </MemoryRouter>
      ).container;
    });
    it('should have a list with all the todo items', () => {
      const todoList = getByRole(container, 'list');
      const todoItems = getAllByRole(container, 'listitem');
      expect(todoList).toBeInstanceOf(HTMLUListElement);
      expect(todoItems).toHaveLength(3);
    });
    it('should have all the todo items titles displayed and NOT crossed out', () => {
      const title1 = queryByText(container, 'Do groceries');
      const title2 = queryByText(container, 'Wash car');
      const title3 = queryByText(container, 'Clean house');
      expect(title1).not.toBeNull();
      expect(title2).not.toBeNull();
      expect(title3).not.toBeNull();
      expect(title1.classList.contains('checked')).toBe(false);
      expect(title2.classList.contains('checked')).toBe(false);
      expect(title3.classList.contains('checked')).toBe(false);
    });
    it('should have a checkbox for each item, all of them unchecked', () => {
      const checkboxList = getAllByRole(container, 'checkbox');
      expect(checkboxList).toHaveLength(3);
      checkboxList.forEach((checkbox) => {
        expect(checkbox.checked).toBe(false);
      });
    });
    it('should have a link for each item to see the its description', () => {
      const linkList = getAllByRole(container, 'link');
      expect(linkList).toHaveLength(3);
      linkList.forEach((link, index) => {
        expect(link.pathname).toBe(`/details/${mockList[index].uuid}`);
      });
    });
  });
  describe('When the first item\'s checkbox is checked', () => {
    beforeEach(() => {
      container = render(
        <MemoryRouter>
          <TodoListMock />
        </MemoryRouter>
      ).container;
    })
    beforeAll(() => {
      container = render(
        <MemoryRouter>
          <TodoListMock />
        </MemoryRouter>
      ).container;
      const firstCheckbox = getAllByRole(container, 'checkbox')[0];
      fireEvent.click(firstCheckbox);
    });
    it('should have all the todo items titles displayed, the first one being crossed out', () => {
      const title1 = queryByText(container, 'Do groceries');
      const title2 = queryByText(container, 'Wash car');
      const title3 = queryByText(container, 'Clean house');
      expect(title1).not.toBeNull();
      expect(title2).not.toBeNull();
      expect(title3).not.toBeNull();
      expect(title1.classList.contains('checked')).toBe(true);
      expect(title2.classList.contains('checked')).toBe(false);
      expect(title3.classList.contains('checked')).toBe(false);
    });
    it('should have the first checkbox turned into the last one and checked', () => {
      const checkboxList = getAllByRole(container, 'checkbox');
      expect(checkboxList).toHaveLength(3);
      expect(checkboxList[0].checked).toBe(false);
      expect(checkboxList[1].checked).toBe(false);
      expect(checkboxList[2].checked).toBe(true);
    });
  });
  describe('When the last item\'s checkbox (previously the first) is unchecked', () => {
    beforeEach(() => {
      container = render(
        <MemoryRouter>
          <TodoListMock />
        </MemoryRouter>
      ).container;
    })
    beforeAll(() => {
      container = render(
        <MemoryRouter>
          <TodoListMock />
        </MemoryRouter>
      ).container;
      const lastCheckbox = getAllByRole(container, 'checkbox')[2];
      fireEvent.click(lastCheckbox);
    });
    it('should have all the todo items titles displayed and NOT crossed out', () => {
      const title1 = queryByText(container, 'Do groceries');
      const title2 = queryByText(container, 'Wash car');
      const title3 = queryByText(container, 'Clean house');
      expect(title1).not.toBeNull();
      expect(title2).not.toBeNull();
      expect(title3).not.toBeNull();
      expect(title1.classList.contains('checked')).toBe(false);
      expect(title2.classList.contains('checked')).toBe(false);
      expect(title3.classList.contains('checked')).toBe(false);
    });
    it('should have the last checkbox turned into the first one and NOT checked', () => {
      const checkboxList = getAllByRole(container, 'checkbox');
      expect(checkboxList).toHaveLength(3);
      expect(checkboxList[0].checked).toBe(false);
      expect(checkboxList[1].checked).toBe(false);
      expect(checkboxList[2].checked).toBe(false);
    });
  });
});
