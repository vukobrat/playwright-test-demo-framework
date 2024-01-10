import { test, expect } from './fixtures/trello-test';


test.describe('Trello-like board', () => {
    let boardName: string;
    const listName = 'TODO';

    test.beforeEach(async ({ request, myBoardsPage }) => {
        const randomNumber = Math.trunc(Math.random() * 1000000);
        boardName = 'Chores ' + `${randomNumber}`;
        // Create board over api
        await request.post('http://localhost:3000/api/boards', {data: {name: boardName}});
        // Load the app
        await myBoardsPage.load();
        // Go to new board
        await myBoardsPage.openBoard(boardName);
    });

    test('should display the new board', async ({ boardPage }) => {
        await boardPage.expectNewBoardLoaded(boardName);
    });

    test('should create the first list in a board', async({ boardPage }) => {
        await boardPage.addList(listName);
        await expect(boardPage.listName).toHaveValue(listName);
    });

    test('should create a list with multiple cards', async({ boardPage }) => {
        await boardPage.addList(listName);
        await boardPage.addCardToList(0, 'Buy groceries');
        await boardPage.addCardToList(0, 'Mow the lawn');
        await boardPage.addCardToList(0, 'Walk the dog');
        await expect(boardPage.cardTexts).toHaveText(
            ['Buy groceries', 'Mow the lawn', 'Walk the dog']);
    });

    test('should navigate hom from a board', async({ boardPage, myBoardsPage }) => {
        await boardPage.goHome();
        await myBoardsPage.expectLoaded([boardName]);
    });




});
