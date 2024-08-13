import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Logo from '../../image.svg';
import './Nav.css';

const Navigation: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgb(50, 170, 60)' }}>
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <img className="navbar-brand-img" src={Logo} alt="Logo" />
          </Box>
          <Box>
            <IconButton edge="end" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;