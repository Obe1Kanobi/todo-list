import { Todo } from './List';
import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react';
import { v1 } from 'uuid';
import {
    ButtonFilter,
    SharedCont,
    ListStyle,
    ButtonEdit,
    ButtonDelete,
    LiStyle,
    ButtonSave,
    ButtonCancel,
    ButtonAdd,
    SpanStyle,
    AddInput,
    ButtonFilterCont,
    AddContInput,
    TaskCont,
    InputSpanStyle,
    Error,
} from './Todolist.style';

// type FilterValuesType = 'all' | 'completed' | 'active';

export type TodoType = {
    id: string;
    title: string;
    completed: boolean;
};

type PropsType = {
    title: string;
};

export function Todolist({ title }: PropsType) {
    //отрисовывает изначальные таски
    const [todoList, setTodoList] = useState(Todo);

    //хук для фильтров
    const [activeFilter, setActiveFilter] = useState('all');

    //хук для инпута на добавление названия задачи
    const [newTitle, setNewTitle] = useState('');

    //хук для выведения сообщения об ошибке
    const [error, setError] = useState<string | null>(null);

    //состояние чтобы отслеживать редактирование задач
    const [isEditing, setIsEditing] = useState<string | null>(null);

    //состояние для хранения измененного заголовка
    const [editedTitle, setEditedTitle] = useState<string>('');

    //восстановите список задач из localStorage при загрузке компонента
    useEffect(() => {
        const savedTodoList = localStorage.getItem('todoList');
        if (savedTodoList) {
            setTodoList(JSON.parse(savedTodoList));
        }
    }, []);

    //сохраняет в localStorage TodoList если он изменяется
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList]);

    //добавление новых задач и их сохранение с стэйте
    const addTodo = (title: string) => {
        const newTodo = { id: v1(), title, completed: false };
        const newTodoList = [newTodo, ...todoList];
        setTodoList(newTodoList);
    };

    //удаляет таски из Todo
    const handleDeleteTodo = (id: string) => {
        let filteredTodos = todoList.filter(task => task.id !== id);
        setTodoList(filteredTodos);
    };

    //функция для изменения статуса таски
    const changeCompleted = (Todoid: string, completed: boolean) => {
        let taskTodo = todoList.find(Todo => Todo.id === Todoid);
        if (taskTodo) {
            taskTodo.completed = !taskTodo.completed;
        }
        setTodoList([...todoList]);
    };

    //функции для редактирования записанных задач
    const editTodo = (id: string) => {
        const task = todoList.find(Todo => Todo.id === id);
        if (task) {
            setIsEditing(id);
            setEditedTitle(task.title);
        }
    };

    //функция для сохранения отредактированной задачи
    const saveEditedTodo = (id: string) => {
        const updatedTodoList = todoList.map(task => (task.id === id ? { ...task, title: editedTitle } : task));
        setTodoList(updatedTodoList);
        setIsEditing(null); //завершение редактирования
    };

    //функция для отмены редактирования
    const cancelEditing = () => {
        setIsEditing(null); //завершаем редактирование
    };

    //////рефакторим код, выносим все обработчики из кнопок
    const onChangeNewTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    };

    const onKeyButton = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null); //это чтобы у нас исчезало сообщение об ошибке
        if (e.key === 'Enter') {
            addTodo(newTitle);
            setNewTitle('');
        }
    };

    const onClickAddTodo = () => {
        if (newTitle.trim() !== '') {
            // проверяем что новое название не пустое
            addTodo(newTitle);
            setNewTitle('');
        } else {
            setError('Обязательное поле!');
        }
    };
    //////конец рефакторинга

    return (
        <SharedCont>
            <h1>{title}</h1>
            <AddContInput>
                <AddInput value={newTitle} onChange={onChangeNewTitle} onKeyDown={onKeyButton} />
                <ButtonAdd onClick={onClickAddTodo}>Add</ButtonAdd>
            </AddContInput>
            <TaskCont>
                Number of tasks:{todoList.length}
                {error && <Error className=''>Обязательное поле!</Error>}
            </TaskCont>
            <ButtonFilterCont>
                <ButtonFilter onClick={() => setActiveFilter('all')}>Show All Tasks</ButtonFilter>
                <ButtonFilter onClick={() => setActiveFilter('active')}>Show Active Tasks</ButtonFilter>
                <ButtonFilter onClick={() => setActiveFilter('completed')}>Show Completed Tasks</ButtonFilter>
            </ButtonFilterCont>
            <ListStyle>
                {todoList
                    .filter(task => {
                        if (activeFilter === 'active') {
                            return !task.completed;
                        } else if (activeFilter === 'completed') {
                            return task.completed;
                        } else {
                            return task;
                        }
                    })
                    .map(task => (
                        <LiStyle key={task.id}>
                            {isEditing === task.id ? ( //eсли редактирование названия
                                <>
                                    <InputSpanStyle
                                        type='text'
                                        value={editedTitle}
                                        onChange={e => setEditedTitle(e.target.value)}
                                    />
                                    <ButtonSave onClick={() => saveEditedTodo(task.id)}>Save</ButtonSave>
                                    <ButtonCancel onClick={cancelEditing}>Cancel</ButtonCancel>
                                </>
                            ) : (
                                <>
                                    <input
                                        type='checkbox'
                                        onChange={e => changeCompleted(task.id, e.target.checked)}
                                        checked={task.completed}
                                    />
                                    <SpanStyle>{task.title}</SpanStyle>
                                    <ButtonEdit onClick={() => editTodo(task.id)}>Edit</ButtonEdit>
                                    <ButtonDelete onClick={() => handleDeleteTodo(task.id)}>Delete</ButtonDelete>
                                </>
                            )}
                        </LiStyle>
                    ))}
            </ListStyle>
        </SharedCont>
    );
}
