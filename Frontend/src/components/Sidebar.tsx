import * as React from 'react';
import { styled, useTheme, Theme, CSSObject, Menu, MenuItem, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge } from '@mui/material';
import logo from '../../public/assets/images/logo90.jpg'
import { useLocation } from 'react-router-dom';
import useRoutes from '../hooks/UseRoutes';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import useFetchData from '../hooks/useFetchData';
interface AppBarPrpos extends MuiAppBarProps {
    open?: boolean
}
interface MiniDrawerProps {
    children: React.ReactNode
}
const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    right: '0',
    borderLeft: '1px solid rgba(224, 224, 224, 1)'
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    right: '0',
    borderLeft: '1px solid rgba(224, 224, 224, 1)'

});

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarPrpos>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: '5rem',
    borderRadius: '.25rem',
    width: '92%',
    ...(open && {
        marginRight: 260,
        width: `calc(97% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    })
}))
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0, whiteSpace: 'nowrap', boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
)

const MiniDrawer: React.FC<MiniDrawerProps> = ({ children }) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const location = useLocation();
    const roleID = sessionStorage.getItem('role_id')
    const routes = useRoutes(roleID || '')
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate()
    const [value, setValue] = React.useState('')
    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setAuth(event.target.checked);
    // };
    const name = sessionStorage.getItem('name')


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };


    const logout = () => {
        sessionStorage.clear()
        navigate('/login')
        setAnchorEl(null);
    }


    const search = () => {

        navigate(`/order_details/${value}`)
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position='fixed' open={open} sx={{ backgroundColor: 'white', marginTop: '.75rem', }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex' }}>
                        <IconButton color='inherit'
                            onClick={() => setOpen(true)}
                            sx={{ ...(open && { display: 'none' }) }}>
                            <MenuIcon sx={{ color: 'black' }} />

                        </IconButton>
                        {/* <img src={logo} alt='logo' width='150' style={{ display: open ? 'none' : 'block' }} /> */}
                    </Box>
                    {roleID !== '1' && (
                        <Box>
                            <TextField size='small' placeholder={`ابحث باستخدام رقم الشحنة`}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                sx={{ width: 400 }} />
                            <Button variant='contained' sx={{ marginRight: '10px', backgroundColor: '#4b49ac' }} onClick={search}>
                                <SearchIcon />
                            </Button>
                        </Box>
                    )}

                    <Box>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <Badge color="error">
                                <NotificationsIcon sx={{ color: '#4b49ac' }} />
                            </Badge>

                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle sx={{ color: '#4b49ac' }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            className='mt-5'
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}> {name}</MenuItem>
                            {/* <MenuItem onClick={handleClose}><PersonIcon /> ملفي الشخصي</MenuItem> */}
                            <MenuItem onClick={logout}><LogoutIcon /> تسجيل الخروج </MenuItem>
                        </Menu>

                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant='permanent' open={open} dir='rtl'>
                <DrawerHeader >
                    {open ? <>
                        Ease Delivery<img src={logo} alt='logo' width='65' />
                        <IconButton onClick={() => setOpen(false)}>
                            {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </> : <img src={logo} alt='logo' width='50' />}

                </DrawerHeader>
                <Divider />
                <List>
                    {/* <Avatar>OP</Avatar> */}
                    {routes.map((item, index) => (
                        <ListItem key={index} disablePadding sx={{ display: 'block' }}
                        >
                            <Link to={item.to} style={{ textDecoration: 'none', color: 'black' }}>
                                <Box
                                    sx={{
                                        minHeight: 48,
                                        // justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        backgroundColor: location.pathname === item.to ? '#4b49ac' : 'white',
                                        margin: '.35rem',
                                        borderRadius: '.35rem',
                                        color: location.pathname === item.to ? 'white' : '#6e6f73',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    {item.icon}
                                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0, marginRight: '10px', textAlign: 'right' }} />
                                </Box>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}

export default MiniDrawer