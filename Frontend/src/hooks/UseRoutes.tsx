import { useState, useEffect } from 'react';
import AdminRoutes from '../routers/AdminRoutes';
import DeliveryCompanyRoutes from '../routers/DeliveryCompanyRoutes';
import { UserRole } from '../constant/UserRols';
import StoreRoutes from '../routers/StoreRoutes';
import SalesmnaRoutes from '../routers/SalesmanRoutes';
interface Route {
    to: string
    text: string;
    icon: JSX.Element
}
const useRoutes = (rolaName: string) => {
    const [routes, setRoutes] = useState<Route[]>([])
    useEffect(() => {
        if (UserRole.ADMIN == rolaName) {
            setRoutes(AdminRoutes)
        } else if (UserRole.DELIVERYCOMPANY == rolaName) {
            setRoutes(DeliveryCompanyRoutes)
        }
        else if (UserRole.STORE == rolaName) {
            setRoutes(StoreRoutes)
        }
        else if (UserRole.SALESMAN === rolaName) {
            setRoutes(SalesmnaRoutes)
        }
    }, [])
    return routes
}
export default useRoutes