import React, { useRef } from 'react';
import { useState } from 'react';
import { ProgressBar, Button, Form } from 'react-bootstrap';
import { getRankImgURL, getTitleFromPoints, getNextThreshold, isValidPeriodString } from '../utils/constants';
import { handlePointsUpdate, handleInputChange, handlePeriodsUpdate, handlePcoinUpdate, handlePstockUpdate } from '../utils/firebaseHelpers';
import EditableColumn from './EditableColumn';

const UserRow = ({ isAdmin, user, index, pointsInputs, setPointsInputs, selectedUsers, setSelectedUsers, pcoinInputs, setPcoinInputs, pstockInputs, setPstockInputs }) => {
    const [periodInput, setPeriodInput] = useState(user.Period.join(","));
    const [periodError, setPeriodError] = useState("");

    const inputRef = useRef(null);

    const handleCheckboxChange = (userId, isChecked) => {
        setSelectedUsers(prevState => ({
            ...prevState,
            [userId]: isChecked
        }));
    };

    const handlePeriodsChange = (e) => {
        const newPeriods = e.target.value;
        setPeriodInput(newPeriods);

        if (isValidPeriodString(newPeriods)) {
            setPeriodError("");
            handlePeriodsUpdate(user.id, newPeriods.split(',').map(period => period.trim()));
        } else {
            setPeriodError("Invalid input. Use numbers 1-7, comma-separated without spaces.");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            const nextIndex = event.shiftKey ? index - 1 : index + 1;
            const nextInput = document.querySelector(`#points-input-${nextIndex}`);
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <div className="name-with-image">
                    <img src={getRankImgURL(user.Points)} alt="Rank Icon" className="rank-icon" />
                    <span style={{ fontWeight: 'bold' }}>{user.Name}</span>
                    {index === 0 && <span className='decor'>&nbsp;🏆</span>}
                    {index > 0 && index < 5 && <span className='decor'>&nbsp;⭐</span>}
                </div>
            </td>
            <td>
                <div className="points-with-text">
                    <span className="points-text">{getTitleFromPoints(user.Points)} -</span>
                    <span className="points-value">{user.Points}</span>
                </div>
            </td>
            <td>
                <ProgressBar variant="custom" className="custom-progress-bar" now={user.Points >= 2500 ? 100 : ((user.Points - (getNextThreshold(user.Points) - 500)) / 500) * 100} />
            </td>
            {/* Pcoin column */}
            <EditableColumn
                isAdmin={isAdmin}
                value={user.pcoin + "₽"}
                userId={user.id}
                columnKey="pcoin"
                inputs={pcoinInputs}
                setInputs={setPcoinInputs}
                handleUpdate={handlePcoinUpdate}
                placeholder="pcoin"
            />

            {/* Pstock column */}
            <EditableColumn
                isAdmin={isAdmin}
                value={user.pstock + " shares"}
                userId={user.id}
                columnKey="pstock"
                inputs={pstockInputs}
                setInputs={setPstockInputs}
                handleUpdate={handlePstockUpdate}
                placeholder="pstock"
            />
            <td>
                {isAdmin ? (
                    <>
                        <Form.Control 
                            type="text"
                            value={periodInput}
                            onChange={handlePeriodsChange}
                        />
                        {periodError && <div style={{ color: 'red' }}>{periodError}</div>}
                    </>
                ) : (
                    user.Period.join(", ")
                )}
            </td>
            {isAdmin && (
                <td>
                    <Form.Group className="input-group">
                        <Form.Control
                            id={`points-input-${index}`}
                            type="number"
                            placeholder="Points"
                            value={pointsInputs[user.id] || ''}
                            onChange={(e) => handleInputChange(user.id, e.target.value, setPointsInputs)}
                            onKeyDown={handleKeyDown}
                            ref={inputRef}
                        />
                        <Button onClick={() => handlePointsUpdate(user.id, pointsInputs[user.id], pointsInputs, setPointsInputs)}>
                            Add Points
                        </Button>
                    </Form.Group>
                </td>
            )}
            {isAdmin && (
                <td>
                    <Form.Check
                        type="checkbox"
                        checked={selectedUsers[user.id] || false}
                        onChange={(e) => handleCheckboxChange(user.id, e.target.checked)}
                    />
                </td>
            )}
        </tr>
    );
};

export default UserRow;