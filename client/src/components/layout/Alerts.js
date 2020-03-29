import React, { useContext } from 'react'
import AlertContext from './../../context/Alert/AlertContext';

const Alerts = () => {
    const alertContext = useContext(AlertContext);
    console.log(alertContext.alerts,'alerts initial');
    return (
        alertContext.alerts.length ? alertContext.alerts.map((alert) => (<div key={alert.id} className={`alert alert-${alert.type}`}>
            <i className="fas fa-info-circle" /> {alert.msg}
        </div>)):null
    )
}

export default Alerts
