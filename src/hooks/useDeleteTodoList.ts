import React, { useState } from 'react';
import { Todo } from '../components/List';

export const useDeleteTodoList = () => {
    const [todoList, setTodoList] = useState(Todo);

    const handleDeleteTodo = (id: string) => {
        let filteredTodos = todoList.filter(task => task.id !== id);
        setTodoList(filteredTodos);
        //пропусти те таски, id которых
        // не равно id которые нужно удалить
    };
    return {
        todoList,
        handleDeleteTodo,
    };
};
