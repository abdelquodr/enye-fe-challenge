import React from 'react';

const pagination = ({ obj }) => {
    const { FirstName, LastName, Gender } = obj;
    return (
        <li className="list-group-item text-primary py-3 font-weight-bold list-group-item-action list-group-item-light">
            <div className="row">
                <div className="col-md-4 text-center">{FirstName}</div>
                <div className="col-md-4 text-center">{LastName}</div>
                <div className="col-md-4 text-center" style={{ color: Gender === 'Prefer to skip' ? '#FF5733' : '#2E86C1' }}>{Gender}</div>
            </div>
        </li>
    );
}

export default pagination;
