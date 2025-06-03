import React from 'react';

const Alert = (props) => {
    if (!props.alert) return null;
    return (
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            {props.alert.message}
        </div>
    );
};

export default Alert;