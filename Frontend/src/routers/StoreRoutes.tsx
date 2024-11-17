import GridViewIcon from '@mui/icons-material/GridView';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import MyLocationIcon from '@mui/icons-material/MyLocation';
const StoreRoutes = [
    {
        to: '/store/dashboard',
        text: 'لوحة التحكم',
        icon: <GridViewIcon />
    },
    {
        to: '/store/create_order',
        text: ' إنشاء شحنة',
        icon: <AddCircleOutlineIcon />
    },
    {
        to: '/store/orders',
        text: ' الشحنات ',
        icon: <LocalShippingOutlinedIcon />
    },
    {
        to: '/store/invoices',
        text: 'الفواتير',
        icon: <PriceCheckOutlinedIcon />
    },
    {
        to: '/store/inquiry_consignee',
        text: 'الاستعلام عن زبون',
        icon: <PersonSearchOutlinedIcon />
    },
    {
        to: '/store/cities',
        text: 'المدن',
        icon: <PlaceIcon />
    },
    {
        to: '/store/areas',
        text: 'المناطق',
        icon: <MyLocationIcon />
    },
    {
        to: '/store/order_types',
        text: 'أنواع الشحنات',
        icon: <MergeTypeIcon />
    },

]

export default StoreRoutes