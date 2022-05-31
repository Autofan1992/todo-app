import { FC } from 'react'
import { useTodos } from '../../context/todos-context'
import { Formik } from 'formik'
import { TodoType } from '../../types/todos-types'
import * as Yup from 'yup'
import { Button, Form, Stack } from 'react-bootstrap'

const todoSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required')
        .max(100, 'Title can\'t be longer than 100 characters')
        .min(2, 'Title must have at least 2 characters')
})

const TodoForm: FC = () => {
    const { addTodo } = useTodos()

    return <Formik
        validationSchema={todoSchema}
        initialValues={{
            title: ''
        } as TodoType}
        onSubmit={({ title }, { resetForm, setSubmitting }) => {
            addTodo(title)
            resetForm()
            setSubmitting(false)
        }}
    >
        {({ handleSubmit, touched, errors, handleChange, values }) => <Form onSubmit={handleSubmit}>
            <Stack direction="horizontal" className='align-items-start'>
                <Form.Group className="me-3 position-relative flex-grow-1">
                    <Form.Control
                        className={touched.title && errors.title ? 'is-invalid' : undefined}
                        placeholder="Type todo title"
                        onChange={handleChange}
                        value={values.title}
                        name="title"
                        type="text"
                        required
                    />
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">Add todo</Button>
            </Stack>
        </Form>
        }
    </Formik>
}

export default TodoForm