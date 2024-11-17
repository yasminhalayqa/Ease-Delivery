import { useEffect } from 'react'
import './App.css'
import i18n from './i18n/i18n'
import { useTheme, ThemeProvider } from '@mui/material/styles' // Import ThemeProvider
import '../public/assets/styles/general.scss'
import { Route, Routes } from 'react-router-dom'
import routes from './routers/Routes'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const theme = useTheme();
  document.body.dir = i18n.dir();

  useEffect(() => {
    i18n.changeLanguage("ar");
    document.body.dir = i18n.dir();
    theme.direction = i18n.dir();
    document.body.style.backgroundColor = '#f6f6f8'
  }, []);

  return (
    <ThemeProvider theme={theme}> {/* Wrap your app with ThemeProvider */}
      <Routes>
        {routes.map(route => (<Route  key={route.path} path={route.path} element={<route.element />} />))}
      </Routes>
    </ThemeProvider>
  )
}

export default App
