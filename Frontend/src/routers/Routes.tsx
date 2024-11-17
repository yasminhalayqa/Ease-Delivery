import AddSubscriber from "../views/AdminViews/AddSubscriber";
import EditSubscriber from "../views/AdminViews/EditSubscribers";
import Subscribers from "../views/AdminViews/Subscribers";
import SubscriptionRequests from "../views/AdminViews/SubscriptionRequests";
import HomePage from "../views/ClientsViews/HomePage";
import AddArea from "../views/DeliveryCompanyViews/AddArea";
import AddCity from "../views/DeliveryCompanyViews/AddCity";
import AddOrderType from "../views/DeliveryCompanyViews/AddOrderType";
import AddSalesman from "../views/DeliveryCompanyViews/AddSalesman";
import AddStore from "../views/DeliveryCompanyViews/AddStore";
import Areas from "../views/DeliveryCompanyViews/Areas";
import Cities from "../views/DeliveryCompanyViews/Cities";
import ConfirmOrder from "../views/DeliveryCompanyViews/ConfirmOrder";
import CreateOrder from "../views/DeliveryCompanyViews/CreateOrder";
import Dashboard from "../views/DeliveryCompanyViews/Dashboard";
import EditSalesman from "../views/DeliveryCompanyViews/EditSalesman";
import EditStore from "../views/DeliveryCompanyViews/EditStore";
import InquiryConsignee from "../views/DeliveryCompanyViews/InquiryCustomer";
import InvoiceDetails from "../views/DeliveryCompanyViews/InvoiceDetails";
import Invoices from "../views/DeliveryCompanyViews/Invoices";
import OrderTypes from "../views/DeliveryCompanyViews/OrderTypes";
import Orders from "../views/DeliveryCompanyViews/Orders";
import PendingOrders from "../views/DeliveryCompanyViews/PendingOrders";
import Salesmen from "../views/DeliveryCompanyViews/Salesman";
import SingleOrderDetails from "../views/DeliveryCompanyViews/SingleOrderDetails";
import SingleOrderStatus from "../views/DeliveryCompanyViews/SingleOrderStatus";
import Stores from "../views/DeliveryCompanyViews/Stores";
import Login from "../views/Login";
import SalesmanOrders from "../views/SalesmanViews/SalesmanOrders";
import CreateTicket from "../views/StoreViews/CreateTicket";
import StoreAreas from "../views/StoreViews/StoreAreas";
import StoreCities from "../views/StoreViews/StoreCities";
import StoreCreateOrder from "../views/StoreViews/StoreCreateOrder";
import StoreDashboard from "../views/StoreViews/StoreDashboard";
import StoreInquiryConsignee from "../views/StoreViews/StoreInquiryCustomer";
import StoreInvoiceDetails from "../views/StoreViews/StoreInvoiceDetails";
import StoreInvoices from "../views/StoreViews/StoreInvoices";
import StoreOrderTypes from "../views/StoreViews/StoreOrderTypes";
import StoreOrders from "../views/StoreViews/StoreOrders";
import StoreSingleOrderDetails from "../views/StoreViews/StoreSingleOrderDetails";
import StoreSingleOrderStatus from "../views/StoreViews/StoreSingleOrderStatus";
import SingleTicket from "../views/StoreViews/SingleTicket";
import EditTicket from "../views/StoreViews/EditTicket";
import Tickets from "../views/DeliveryCompanyViews/Tickets";
import AboutUs from "../views/ClientsViews/Aboutus";
import RequestToJoin from "../views/ClientsViews/JoinSystem";
import Services from "../views/ClientsViews/ServicesView";
import TrackOrder from "../views/ClientsViews/TrackOrderPage";
import ContactUs from "../views/ClientsViews/Contactus";

const routes = [
    { path: '/subscribers', name: ' المشتركين', element: Subscribers },
    // { path: '/', name: ' المشتركين', element: Subscribers },
    { path: '/add_subscriber', name: 'إضافة مشتركين', element: AddSubscriber },
    { path: '/login', name: ' تسجيل الدخول', element: Login },
    { path: '/dashboard', name: ' لوحة التحكم', element: Dashboard },
    { path: '/create_order', name: '  إنشاء شحنة', element: CreateOrder },
    { path: '/orders', name: '   الشحنات', element: Orders },
    { path: '/subscription_requests', name: '   الشحنات', element: SubscriptionRequests },
    { path: '/edit_subscriber/:id', name: ' تحديث بيانات المشترك', element: EditSubscriber },
    { path: '/stores', name: 'الشركات', element: Stores },
    { path: '/add_store', name: 'الشركات', element: AddStore },
    { path: '/salesman', name: 'مناديب التوصيل', element: Salesmen },
    { path: '/add_salesman', name: 'إضافة مندوب توصيل', element: AddSalesman },
    { path: '/edit_salesman/:id', name: 'تعديل مندوب التوصيل', element: EditSalesman },
    { path: '/edit_store/:id', name: 'الشركات', element: EditStore },
    { path: '/order_details_status/:id', name: 'حالة الشحنة', element: SingleOrderStatus },
    { path: '/invoices', name: 'invoices', element: Invoices },
    { path: '/invoice_details/:id', name: 'invoice details', element: InvoiceDetails },
    { path: '/inquiry_consignee', name: 'inquiry consignee', element: InquiryConsignee },
    { path: '/order_details/:id', name: 'تفاصيل الشحنة', element: SingleOrderDetails },
    { path: '/cities', name: 'المدن', element: Cities },
    { path: '/add_city', name: 'إضافة مدينة', element: AddCity },
    { path: '/areas', name: 'المناطق', element: Areas },
    { path: '/add_area', name: 'إضافة منطقة', element: AddArea },
    { path: '/order_types', name: 'أنواع الشحنات', element: OrderTypes },
    { path: '/add_order_type', name: 'إضافة نوع جديد', element: AddOrderType },
    { path: '/store/order_details_status/:id', name: 'حالة الشحنة', element: StoreSingleOrderStatus },
    { path: '/store/invoices', name: 'invoices', element: StoreInvoices },
    { path: '/store/invoice_details/:id', name: 'invoice details', element: StoreInvoiceDetails },
    { path: '/store/inquiry_consignee', name: 'inquiry consignee', element: StoreInquiryConsignee },
    { path: '/store/order_details/:id', name: 'تفاصيل الشحنة', element: StoreSingleOrderDetails },
    { path: '/store/cities', name: 'المدن', element: StoreCities },
    { path: '/store/areas', name: 'المناطق', element: StoreAreas },
    { path: '/store/order_types', name: 'أنواع الشحنات', element: StoreOrderTypes },
    { path: '/store/dashboard', name: ' لوحة التحكم', element: StoreDashboard },
    { path: '/store/create_order', name: '  إنشاء شحنة', element: StoreCreateOrder },
    { path: '/store/orders', name: '   الشحنات', element: StoreOrders },
    { path: '/pending_orders', name: 'الشحنات قيد الانتظار', element: PendingOrders },
    { path: '/confirm_order/:id', name: 'تأكيد الشحنة', element: ConfirmOrder },
    { path: '/salesman_orders', name: 'الشحنات', element: SalesmanOrders },
    { path: '/create_ticket', name: 'الدعم الفني', element: CreateTicket },
    { path: '/ticket/:id', name: 'تذكرة', element: SingleTicket },
    { path: '/edit_ticket/:id', name: 'تعديل التذكرة', element: EditTicket },
    { path: '/tickets', name: 'جدول الدعم الفني', element: Tickets },
    { path: '/home', name: 'الصفحة الرئيسية', element: HomePage },
    { path: '/', name: 'الصفحة الرئيسية', element: HomePage },
    { path: '/about_us', name: 'من نحن', element: AboutUs },
    { path: '/contact_us', name: 'اتصل بنا', element: ContactUs },
    { path: '/join_us', name: 'انضم الينا', element: RequestToJoin },
    { path: '/services', name: 'الخدمات', element: Services },
    { path: '/track_order', name: 'تتبع طلبك', element: TrackOrder },








]


export default routes