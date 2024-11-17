import GridViewIcon from '@mui/icons-material/GridView';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CachedIcon from '@mui/icons-material/Cached';
import QuizIcon from '@mui/icons-material/Quiz';
const DeliveryCompanyRoutes = [
    {
        to: '/dashboard',
        text: 'لوحة التحكم',
        icon: <GridViewIcon />
    },
    {
        to: '/create_order',
        text: ' إنشاء شحنة',
        icon: <AddCircleOutlineIcon />
    },
    {
        to: '/orders',
        text: ' الشحنات ',
        icon: <LocalShippingOutlinedIcon />
    },
    {
        to: '/pending_orders',
        text: 'الشحنات قيد الانتظار',
        icon: <CachedIcon />
    },
    {
        to: '/stores',
        text: ' الشركات ',
        icon: <ApartmentOutlinedIcon />
    },
    {
        to: '/salesman',
        text: ' مناديب التوصيل ',
        icon: <GroupsIcon />
    },
    {
        to: '/invoices',
        text: 'الفواتير',
        icon: <PriceCheckOutlinedIcon />
    },
    {
        to: '/tickets',
        text: 'الدعم الفني',
        icon: <QuizIcon />
    },
    {
        to: '/inquiry_consignee',
        text: 'الاستعلام عن زبون',
        icon: <PersonSearchOutlinedIcon />
    },
    {
        to: '/cities',
        text: 'المدن',
        icon: <PlaceIcon />
    },
    {
        to: '/areas',
        text: 'المناطق',
        icon: <MyLocationIcon />
    },
    {
        to: '/order_types',
        text: 'أنواع الشحنات',
        icon: <MergeTypeIcon />
    },

]

export default DeliveryCompanyRoutes