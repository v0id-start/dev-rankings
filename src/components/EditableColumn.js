// EditableColumn.js
import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditableColumn = ({ isAdmin, value, userId, columnKey, inputs, setInputs, handleUpdate, placeholder }) => {
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        const { value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [userId]: value,
        }));
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            const nextInput = document.querySelector(`#${columnKey}-input-${userId + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    return (
        <>
        <td>
            {value}
        </td>
        {isAdmin &&
        <td>
            <Form.Group className="input-group">
                <Form.Control
                    id={`${columnKey}-input-${userId}`}
                    type="number"
                    placeholder={placeholder}
                    value={inputs[userId] || ''}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
                <Button onClick={() => handleUpdate(userId, inputs[userId], inputs, setInputs)}>
                    Add {placeholder}
                </Button>
            </Form.Group>
        </td>
            
        }


        </>
    );
};

export default EditableColumn;