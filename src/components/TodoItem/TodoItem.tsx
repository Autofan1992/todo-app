import { TodoType } from '../../types/todos-types'
import { Button, Form } from 'react-bootstrap'
import PencilIcon from '../common/Icons/PencilIcon'
import TrashIcon from '../common/Icons/TrashIcon'
import React, { Dispatch, RefObject, SetStateAction } from 'react'
import { useTodos } from '../../context/todos-context'

type PropsType = {
    handleCompleted: () => void
    handleTextUpdate: (title: string) => void
    editMode: boolean
    setEditMode: Dispatch<SetStateAction<boolean>>
    listItemRef: RefObject<HTMLDivElement>
}

const TodoItem = (
    {
        title,
        completed,
        id,
        handleCompleted,
        handleTextUpdate,
        setEditMode,
        editMode,
        listItemRef
    }: TodoType & PropsType) => {
    const { deleteTodo } = useTodos()

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter') setEditMode(false)
    }

    return <div ref={listItemRef} className="d-flex align-items-end">
        <Form.Check
            type="checkbox"
            checked={completed}
            onChange={() => handleCompleted()}
        />
        <h5 className={`ms-3 mb-0 ${completed && 'text-decoration-line-through text-muted'}`}>{editMode
            ? <Form.Control
                className="p-0 border-0 bg-primary text-white rounded ps-2"
                plaintext
                defaultValue={title}
                autoFocus
                onChange={(e) => handleTextUpdate(e.target.value)}
                onKeyUp={(e) => handleKeyPress(e)}
            />
            : title}</h5>
        <Button
            className="ms-auto me-3"
            variant="outline-primary"
            size="sm"
            onClick={() => setEditMode(true)}
        >
            <PencilIcon/>
        </Button>
        <Button
            variant="danger"
            size="sm"
            onClick={() => deleteTodo(id)}
        >
            <TrashIcon/>
        </Button>
    </div>
}

export default TodoItem