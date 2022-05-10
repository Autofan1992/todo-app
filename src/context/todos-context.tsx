import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from 'react'
import { TodoFilterTypes, TodoType } from '../types/types'
import useLocalStorage from '../hooks/useLocalStorage'
import { v4 as createId } from 'uuid'
import { getActiveTodosCount, getCompletedTodosCount, getVisibleTodos } from '../selectors/todo-selectors'

const TodosContext = createContext({} as ContextType)

export const useTodos = () => useContext(TodosContext)

export const TodosProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [todos, setTodos] = useLocalStorage<Array<TodoType>>('todos', [])
    const [error, setError] = useState(null as string | null)
    const [allCompleted, setToggleAllTodos] = useState(true)

    const addTodo = (title: string) => {
        setTodos(prevState => {
            if (prevState.find(todo => todo.title === title)) {
                setError('todo with the same text already exists')
                return prevState
            }
            return [{ id: createId(), title, completed: false }, ...prevState]
        })
    }

    const filterTodos = (filter: TodoFilterTypes) => getVisibleTodos(filter, todos)
    const activeTodosCount = getActiveTodosCount(todos)
    const completedTodosCount = getCompletedTodosCount(todos)

    const editTodo = ({ title, completed, id }: TodoType) => {
        setTodos(prevState => prevState.map(todo => {
            if (id === todo.id) {
                if (!todos.find(todo => todo.title === title)) {
                    todo.title = title
                } else if (todo.completed === completed) {
                    setError('todo with the same text already exists')
                } else {
                    todo.completed = completed
                }
            }
            return todo
        }))
    }

    const deleteTodo = (id: string) => setTodos(prevState => prevState.filter(todo => todo.id !== id))

    const deleteAllCompletedTodos = () => setTodos(prevState => prevState.filter(todo => !todo.completed))

    const toggleAllTodos = () => {
        setToggleAllTodos(!allCompleted)
        setTodos(prevState => prevState.map(todo => {
            todo.completed = allCompleted
            return todo
        }))
    }

    return <TodosContext.Provider value={{
        allCompleted,
        addTodo,
        filterTodos,
        editTodo,
        deleteTodo,
        deleteAllCompletedTodos,
        toggleAllTodos,
        activeTodosCount,
        completedTodosCount,
        error,
        setError
    }}>
        {children}
    </TodosContext.Provider>
}

type ContextType = {
    filterTodos: (filter: TodoFilterTypes) => Array<TodoType>
    activeTodosCount: number
    completedTodosCount: number
    allCompleted: boolean
    addTodo: (title: string) => void
    editTodo: ({ title, completed, id }: TodoType) => void
    deleteTodo: (id: string) => void
    deleteAllCompletedTodos: () => void
    toggleAllTodos: () => void
    error: string | null
    setError: Dispatch<SetStateAction<string | null>>
}