import { TodoFilterTypes, TodoType } from '../../types/types'
import { Dispatch, FC, SetStateAction } from 'react'
import { Button, ListGroup, Stack } from 'react-bootstrap'
import './App.scss'
import TodoItemContainer from '../TodoItem/TodoItemContainer'
import TodoForm from '../TodoForm/TodoForm'
import ErrorToast from '../common/ErrorModal/ErrorToast'
import { useTodos } from '../../context/todos-context'

type PropsType = {
    todos: Array<TodoType>
    filterTodos: Dispatch<SetStateAction<TodoFilterTypes>>
}

const App: FC<PropsType> = ({ todos, filterTodos }) => {
    const { activeTodosCount, completedTodosCount, toggleAllTodos, allCompleted } = useTodos()

    return <div className="wrapper py-3 py-md-4 d-flex flex-column justify-content-center">
        <div className="container">
            <h1 className="mb-5">Todo App</h1>
            <ErrorToast/>
            <TodoForm/>
            <ListGroup className="my-4">
                {todos.length > 0
                    ? todos.map(todo => <div
                        className="list-group-item"
                        key={todo.id}
                    >
                        <TodoItemContainer
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                        />
                    </div>)
                    : (activeTodosCount > 0 && !completedTodosCount)
                        ? <h2 className="text-center">There are no completed todos.</h2>
                        : (!activeTodosCount && completedTodosCount > 0)
                            ? <h2 className="text-center">There are no active todos.</h2>
                            : <h2 className="text-center">There are no todos. Time to add some!</h2>
                }
            </ListGroup>

            {todos.length > 0 &&
                <Stack direction="horizontal" className="justify-content-end mb-3">
                    <Button
                        variant="outline-primary"
                        onClick={() => toggleAllTodos()}
                    >Toggle all todos: {allCompleted ? 'completed' : 'active'}</Button>
                </Stack>}

            {activeTodosCount > 0 && <h3>Todos left: {activeTodosCount}</h3>}

            <Stack direction="horizontal" className="mt-3 gap-2 flex-wrap justify-content-center">
                <Button
                    variant="secondary"
                    onClick={() => filterTodos('ACTIVE_TODOS')}
                >Show active todos</Button>
                <Button
                    className="mx-md-3 flex-md-grow-1"
                    variant="secondary"
                    onClick={() => filterTodos('COMPLETED_TODOS')}
                >Show completed todos</Button>
                <Button
                    variant="secondary"
                    onClick={() => filterTodos('ALL_TODOS')}
                >Show all todos</Button>
            </Stack>
        </div>
    </div>
}

export default App