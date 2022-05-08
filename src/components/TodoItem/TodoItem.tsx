import { TodoType } from '../../types/types'
import { useTodos } from '../../context/todoList-context'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { useRef, useState } from 'react'
import useOutsideClick from '../../hooks/useOutsideClick'
import PencilIcon from '../Icons/PencilIcon'
import TrashIcon from '../Icons/TrashIcon'

const TodoItem = ({ text, completed, id }: TodoType) => {
    const { editTodo, deleteTodo } = useTodos()
    const listItemRef = useRef<HTMLAnchorElement>(null)
    const [editMode, setEditMode] = useState(false)

    useOutsideClick(listItemRef, setEditMode)

    return <ListGroup.Item ref={listItemRef}>
        <div className="d-flex align-items-end">
            <Form.Check type="checkbox" checked={completed} onChange={() => editTodo({
                text,
                completed: !completed,
                id
            })}/>
            <h5 className="mb-0">{editMode ?
                <Form.Control plaintext defaultValue={text} onChange={(e) => editTodo({
                    text: e.target.value,
                    completed,
                    id
                })}/>
                : text}</h5>
            <Button className="ms-auto me-3" variant="outline-primary" size="sm" onClick={() => setEditMode(true)}>
                <PencilIcon/>
            </Button>
            <Button variant="danger" size="sm" onClick={() => deleteTodo(id)}>
                <TrashIcon/>
            </Button>
        </div>
    </ListGroup.Item>
}

export default TodoItem