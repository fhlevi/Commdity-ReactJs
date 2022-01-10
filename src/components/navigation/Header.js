import { AppBar, Box, Toolbar } from '@mui/material';
import efisheryLogo from 'assets/images/icon/efishery.png';

function Header() {
    return ( 
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" className="header-navigation shadow">
                    <Toolbar sx={{ mx: 2.5 }}>
                        <img src={efisheryLogo} alt="efishery-logo" />
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default Header;