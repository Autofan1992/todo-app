import { createContext, FC, ReactNode, useContext, useState } from 'react'
import { TodoFilterTypes, TodoType } from '../types/types'
import useLocalStorage from '../hooks/useLocalStorage'
import { v4 as createId } from 'uuid'
import { getActiveTodosCount, getCompletedTodosCount, getVisibleTodos } from '../selectors/todo-selectors'

const TodoListContext = createContext({} as ContextType)

export const useTodos = () => useContext(TodoListContext)

export const TodosProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [todos, setTodos] = useLocalStorage<Array<TodoType>>('todos', [])
    const [allCompleted, setToggleAllTodos] = useState(false)

    const addTodo = (text: string) => {
        setTodos(prevState => {
            if (prevState.find(todo => todo.text === text)) return prevState
            return [...prevState, { id: createId(), text, completed: false }]
        })
    }

    const filterTodos = (filter: TodoFilterTypes) => getVisibleTodos(filter, todos)
    const activeTodosCount = () => getActiveTodosCount(todos)
    const completedTodosCount = () => getCompletedTodosCount(todos)

    const editTodo = ({ text, completed, id }: TodoType) => {
        setTodos(prevState => prevState.map(todo => {
            if (id === todo.id) {
                todo.text = text
                todo.completed = completed
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

    return <TodoListContext.Provider value={{
        allCompleted,
        addTodo,
        filterTodos,
        editTodo,
        deleteTodo,
        deleteAllCompletedTodos,
        toggleAllTodos,
        activeTodosCount,
        completedTodosCount
    }}>
        {children}
    </TodoListContext.Provider>
}

type ContextType = {
    filterTodos: (filter: TodoFilterTypes) => Array<TodoType>
    activeTodosCount: () => number
    completedTodosCount: () => number
    allCompleted: boolean
    addTodo: (text: string) => void
    editTodo: ({ text, completed, id }: TodoType) => void
    deleteTodo: (id: string) => void
    deleteAllCompletedTodos: () => void
    toggleAllTodos: () => void
}