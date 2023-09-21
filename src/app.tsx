import React, { useState } from 'react';
import { Todolist } from './components/Todolist';

export function App() {
    return (
        <div className='App'>
            <Todolist title='TODOList' />
            {/* тут мы создали пропс, title это пропс, который
            мы тут прописали и вызвали в TodoList
            a теперь мы добавили ещё и todo, это наши таски
            которые являются массивами и содежат данные которые нужны по задаче*/}
        </div>
    );
}
