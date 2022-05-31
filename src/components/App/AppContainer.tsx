import { useTodos } from '../../context/todos-context'
import { TodoFilterTypes, TodoType } from '../../types/todos-types'
import { useEffect, useState } from 'react'
import App from './App'

function AppContainer() {
    const { filterTodos, activeTodosCount, completedTodosCount, setAllCompleted } = useTodos()
    const [todosFilter, setTodosFilter] = useState<TodoFilterTypes>('ALL_TODOS')
    const [visibleTodos, setVisibleTodos] = useState<Array<TodoType>>([])

    useEffect(() => {
        setVisibleTodos(filterTodos(todosFilter))
    }, [filterTodos, todosFilter])

    useEffect(() => {
        if (!activeTodosCount) {
            setAllCompleted(true)
        }
        if (!completedTodosCount) {
            setAllCompleted(false)
        }
    }, [activeTodosCount, completedTodosCount, setAllCompleted])

    return <App todos={visibleTodos} filterTodos={setTodosFilter}/>
}

export default AppContainer