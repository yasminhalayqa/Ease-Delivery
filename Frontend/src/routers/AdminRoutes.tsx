import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
const AdminRoutes = [
    {
        to: '/subscribers',
        text: 'قائمة المشتركين',
        icon: <PeopleAltOutlinedIcon />,
    },
    {
        to: '/subscription_requests',
        text: ' طلبات الاشتراك',
        icon: <NotificationsActiveOutlinedIcon />,
    }
]
export default AdminRoutes