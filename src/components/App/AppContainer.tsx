import { useTodos } from '../../context/todos-context'
import { TodoFilterTypes, TodoType } from '../../types/types'
import { useEffect, useState } from 'react'
import App from './App'

function AppContainer() {
    const { filterTodos } = useTodos()
    const [todosFilter, setTodosFilter] = useState<TodoFilterTypes>('ALL_TODOS')
    const [visibleTodos, setVisibleTodos] = useState<Array<TodoType>>([])

    useEffect(() => {
        setVisibleTodos(filterTodos(todosFilter))
    }, [filterTodos, todosFilter])

    return <App todos={visibleTodos} filterTodos={setTodosFilter}/>
}

export default AppContainer