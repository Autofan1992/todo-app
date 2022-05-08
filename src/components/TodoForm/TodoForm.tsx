import { FC, FormEvent, useRef, useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import { useTodos } from '../../context/todoList-context'

const TodoForm: FC = () => {
    const { addTodo } = useTodos()
    const [validated, setValidated] = useState(false)
    const textRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!e.currentTarget.checkValidity()) {
            e.stopPropagation()
        } else if (textRef.current) {
            addTodo(textRef.current.value)
        }

        setValidated(true)
    }

    return <Form noValidate onSubmit={handleSubmit} validated={validated}>
        <Stack direction="horizontal">
            <Form.Group className="me-3" controlId="name">
                <Form.Control type="text" ref={textRef} required placeholder="Type todo text"/>
            </Form.Group>
            <Button variant="primary" type="submit">Add todo</Button>
        </Stack>
    </Form>
}

export default TodoForm