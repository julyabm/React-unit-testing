import {
  render,
  fireEvent,
  waitFor,
  screen,
  waitForElementToBeRemoved,
  queryByText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from './List';

describe('List Component', () => {
  it('should render list items', async () => {
    const { getByText, rerender, queryByText } = render(
      <List initialItems={['Julya', 'André', 'Pietro']} />
    );

    expect(getByText('Julya')).toBeInTheDocument();
    expect(getByText('André')).toBeInTheDocument();
    expect(getByText('Pietro')).toBeInTheDocument();
    
  });

  it('should be able to add new item to the list', async () => {
    const { getByText, debug, getByPlaceholderText, findByText } = render(
      <List initialItems={[]}/>
    );

    const inputElement = getByPlaceholderText('Novo item');
    const addButton = getByText('Adicionar');

    debug();

    userEvent.type(inputElement, 'Novo');
    userEvent.click(addButton);

    debug();

    await waitFor(async () => {
      expect(getByText('Novo')).toBeInTheDocument();
    });

    // expect(await findByText('Novo')).toBeInTheDocument();
  });

  it('should be able to remove item from the list', async () => {
    const { queryByText, getAllByText } = render(<List initialItems={['Julya', 'André', 'Pietro']}/>);

    const removeButtons = getAllByText('Remover');

    userEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(queryByText('Julya')).not.toBeInTheDocument();
    });
  });
});
