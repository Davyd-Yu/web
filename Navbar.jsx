import React, { useState } from 'react';
import Logo from "../Asserts/logo.png"
import { Link } from 'react-router-dom';
import { HiOutlineBars3 } from "react-icons/hi2";
import {
    Box,
    Drawer,
    ListItem,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider 
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";


const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const menuOptions = [
        {
            text: "Home",
            icon: <HomeIcon />,
        },
        {
            text: "Catalog",
            icon: <InfoIcon />,
        },
        {
            text: "Cart",
            icon: <ShoppingCartRoundedIcon />,
        },
    ];
    return (
        <nav className="nav-container">
            <div className="nav-logo-container">
                <img src={Logo} id="img_logo_b" alt="logo" />
            </div>
            <div className="navbar-links-container">
                <Link to="/" style={{ color: '#ffffff' }}  className ="nav_link">Home</Link>
                <Link to="/catalog" style={{ color: '#ffffff' }} className ="nav_link">Catalog</Link>
                <Link to="/cart" style={{ color: '#ffffff' }} className ="nav_link">Cart</Link>
            </div>
            <div className="navbar-menu-container">
                <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
            </div>

            <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={() => setOpenMenu(false)}
                    onKeyDown={() => setOpenMenu(false)}
                >
                    <List>
                        {menuOptions.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
        </nav>
    );
};

export default Navbar;