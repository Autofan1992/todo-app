import { TodoType } from '../../types/todos-types'
import { useTodos } from '../../context/todos-context'
import { useRef, useState } from 'react'
import useOutsideClick from '../../hooks/useOutsideClick'
import TodoItem from './TodoItem'

const TodoItemContainer = ({ title, completed, id }: TodoType) => {
    const { editTodo } = useTodos()
    const listItemRef = useRef<HTMLDivElement>(null)
    const [editMode, setEditMode] = useState(false)

    useOutsideClick(listItemRef, setEditMode)

    const handleCompleted = () => editTodo({
        title,
        completed: !completed,
        id
    })

    const handleTextUpdate = (title: string) => editTodo({
        title,
        completed,
        id
    })

    return <TodoItem
        listItemRef={listItemRef}
        editMode={editMode}
        setEditMode={setEditMode}
        id={id}
        title={title}
        completed={completed}
        handleCompleted={handleCompleted}
        handleTextUpdate={handleTextUpdate}
    />
}

export default TodoItemContainer