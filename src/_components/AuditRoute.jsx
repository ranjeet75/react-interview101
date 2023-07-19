import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '_helpers';

export { AuditRoute };

function AuditRoute() {
    const auth = useSelector(x => x.auth.value);

    if (!auth) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/account/login" state={{ from: history.location }} />
    }

    if (auth?.role == 'Auditor') {
        return <Outlet />;
    }

    return <Navigate to="/users" state={{ from: history.location }} />
}