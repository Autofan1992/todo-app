import { TodoFilterTypes, TodoType } from '../types/todos-types'

export const getVisibleTodos = (filter: TodoFilterTypes, todos: Array<TodoType>) => {
    switch (filter) {
        case 'ALL_TODOS':
            return todos
        case 'COMPLETED_TODOS':
            return todos.filter(todo => todo.completed)
        case 'ACTIVE_TODOS':
            return todos.filter(todo => !todo.completed)
    }
}

export const getActiveTodosCount = (todos: Array<TodoType>) => todos.filter(todo => !todo.completed).length

export const getCompletedTodosCount = (todos: Array<TodoType>) => todos.filter(todo => todo.completed).length