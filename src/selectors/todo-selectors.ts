import { TodoFilterTypes, TodoType } from '../types/todos-types'

export const selectVisibleTodos = (filter: TodoFilterTypes, todos: Array<TodoType>) => {
    switch (filter) {
        case 'ALL_TODOS':
            return todos
        case 'COMPLETED_TODOS':
            return todos.filter(todo => todo.completed)
        case 'ACTIVE_TODOS':
            return todos.filter(todo => !todo.completed)
    }
}

export const selectActiveTodosCount = (todos: Array<TodoType>) => todos.filter(todo => !todo.completed).length

export const selectCompletedTodosCount = (todos: Array<TodoType>) => todos.filter(todo => todo.completed).length