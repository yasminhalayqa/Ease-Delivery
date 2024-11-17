import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import logo from '../../public/assets/images/newlogo.jpg';

const pages = [
  { label: 'الصفحة الرئيسية', route: '/home' }, 
  { label: 'من  نحن', route: '/about_us' },
  { label: 'الخدمات', route: '/services' },
  { label: 'تتبع طلبك', route: '/track_order' },
  { label: '  تواصل معنا ', route: '/contact_us' },

];

export default function Header() {
  const [activePage, setActivePage] = useState('');

  const handlePageClick = (page: React.SetStateAction<string>) => {
    setActivePage(page);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button>
              <img src={logo} alt="logo" width="70" />
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            {pages.map(({ label, route }) => ( // Iterate over pages array
              <Button
                key={label}
                component={Link} // Use Link component
                to={route} // Specify route to navigate to
                sx={{
                  color: activePage === label ? '#4b49ac' : 'black',
                  display: 'block',
                  fontSize: '1.01rem',
                  '&:hover': {
                    color: '#4b49ac',
                  },
                  marginLeft: '.25rem',
                }}
                onClick={() => handlePageClick(label)} // Optionally handle page click
              >
                {label}
              </Button>
            ))}
          </Box>
          <Button
            component={Link} // Use Link component
            to="/join_us" // Specify route to navigate to
            sx={{
              color: activePage === ' انضم إلينا ' ? '#4b49ac' : 'black',
              '&:hover': {
                color: '#4b49ac',
              },
              fontSize: '1.01rem',
              borderRadius: '5px',
              backgroundColor: '#dddcf2',
              height: 35,
              width: 120,
            }}
            onClick={() => handlePageClick('انضم الينا')} // Optionally handle page click
          >
            انضم إلينا
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

