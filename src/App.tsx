import TodoItem from './components/TodoItem/TodoItem'
import { useTodos } from './context/todoList-context'
import { TodoFilterTypes, TodoType } from './types/types'
import TodoForm from './components/TodoForm/TodoForm'
import { useEffect, useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'

function App() {
    const { filterTodos } = useTodos()
    const [todosFilter, setTodosFilter] = useState<TodoFilterTypes>('ALL_TODOS')
    const [visibleTodos, setVisibleTodos] = useState<Array<TodoType>>([])

    useEffect(() => {
        setVisibleTodos(filterTodos(todosFilter))
    }, [filterTodos, todosFilter])

    return <div className="container">
        <TodoForm/>
        {visibleTodos.map(todo => <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
        />)}
        <ButtonGroup>
            <Button
                variant="secondary"
                onClick={() => setTodosFilter('ACTIVE_TODOS')}
            >Show active todos</Button>
            <Button
                className="mx-3"
                variant="secondary"
                onClick={() => setTodosFilter('COMPLETED_TODOS')}
            >Show completed todos</Button>
            <Button
                variant="secondary"
                onClick={() => setTodosFilter('ALL_TODOS')}
            >Show all todos</Button>
        </ButtonGroup>
    </div>
}

export default App