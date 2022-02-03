import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import App from '../../../src/components/App';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, getByRole, getAllByRole, queryByText } from '@testing-library/react';

describe('src/components/App.js', () => {
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
  function AppMock() {
    const [listData, setListData] = useState(mockList);
    return <App listData={listData} setListData={setListData} />
  }

  it('should expose a function component', () => {
    expect(App).toBeInstanceOf(Function);
  });
  it('should render correctly', () => {
    const tree = renderer
    .create(
      <MemoryRouter>
        <AppMock />
      </MemoryRouter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
  describe('When the app start', () => {
    beforeEach(() => {
      container = render(
        <MemoryRouter>
          <AppMock />
        </MemoryRouter>
      ).container;
    });
    it('should have one empty text input for inserting new todos', () => {
      const textInput = getByRole(container, 'textbox');
      expect(textInput.textContent).toBe('');
      expect(textInput.placeholder).toBe('What do you want to do?');
    });
    it('should have a button to add new todos', () => {
      const addButton = getAllByRole(container, 'button').find(button => (
        button.id === 'add-button'
      ));
      expect(addButton).toBeInstanceOf(HTMLButtonElement);
      expect(addButton.textContent).toBe('Add');
    });
    it('should have a list with all the todo items', () => {
      const todoList = getByRole(container, 'list');
      const todoItems = getAllByRole(container, 'listitem');
      expect(todoList).toBeInstanceOf(HTMLUListElement);
      expect(todoItems).toHaveLength(3);
    });
    it('should have all the todo items titles\' displayed and NOT crossed out', () => {
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
  });
  describe('When the first item\'s checkbox is checked', () => {
    beforeEach(() => {
      container = render(
        <MemoryRouter>
          <AppMock />
        </MemoryRouter>
      ).container;
    })
    beforeAll(() => {
      container = render(
        <MemoryRouter>
          <AppMock />
        </MemoryRouter>
      ).container;
      const firstCheckbox = getAllByRole(container, 'checkbox')[0];
      fireEvent.click(firstCheckbox);
    });
    it('should have all the todo items titles\' displayed, the first one being crossed out', () => {
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
});
