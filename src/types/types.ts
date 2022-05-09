export type TodoType = {
    id: string
    title: string
    completed: boolean
}

export type TodoFilterTypes = 'ALL_TODOS' | 'COMPLETED_TODOS' | 'ACTIVE_TODOS'