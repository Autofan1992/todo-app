export type TodoType = {
    id: string
    text: string
    completed: boolean
}

export type TodoFilterTypes = 'ALL_TODOS' | 'COMPLETED_TODOS' | 'ACTIVE_TODOS'