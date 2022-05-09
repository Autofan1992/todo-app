import { TodoFilterTypes, TodoType } from '../../types/types'
import { Dispatch, FC, SetStateAction } from 'react'
import { Button, ListGroup, Stack } from 'react-bootstrap'
import './App.scss'
import { AnimatePresence } from 'framer-motion'
import TodoItemContainer from '../TodoItem/TodoItemContainer'
import TodoForm from '../TodoForm/TodoForm'
import ErrorToast from '../common/ErrorModal/ErrorToast'
import { useTodos } from '../../context/todos-context'

type PropsType = {
    todos: Array<TodoType>
    filterTodos: Dispatch<SetStateAction<TodoFilterTypes>>
}

const App: FC<PropsType> = ({ todos, filterTodos }) => {
    const { activeTodosCount, completedTodosCount } = useTodos()

    return <div className="wrapper d-flex flex-column justify-content-center">
        <div className="container">
            <ErrorToast/>
            <TodoForm/>
            <ListGroup className="my-4">
                <AnimatePresence>
                    {todos.length
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
                        : (activeTodosCount && !completedTodosCount)
                            ? <h2 className="text-center">There are no completed todos.</h2>
                            : (!activeTodosCount && completedTodosCount)
                                ? <h2 className="text-center">There are no active todos.</h2>
                                : <h2 className="text-center">There are no todos. Time to add some!</h2>
                    }
                </AnimatePresence>
            </ListGroup>
            <Stack direction="horizontal">
                <Button
                    variant="secondary"
                    onClick={() => filterTodos('ACTIVE_TODOS')}
                >Show active todos</Button>
                <Button
                    className="mx-3 flex-grow-1"
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