import React, {memo, useEffect} from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import VacationsIcon from '@material-ui/icons/AirplanemodeActive';
import ExitIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {styles} from "../meta/styles";
import NavItem from "./NavItem";
import VacationsContainer from '../../VacationsContainer'

const LIGHT_MODE = 'light'
const DARK_MODE = 'dark'

const useStyles = styles;
const icons = {
    'home': <HomeIcon />,
    'vacations': <VacationsIcon />,
};

function Navigation({ routes, user, logout, updateThemeMode }) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [mode, setMode] = React.useState('ligth');
    const [selectedKey, setSelectedKey] = React.useState(routes[0].key);

    useEffect(() => {
        const drawerItems = routes.map(route => (
            <NavItem onClick={() => setSelectedKey(route.key)}
                     selectedKey={selectedKey}
                     icon={icons[route.key]}
                     key={route.key}
                     item={route} />)
        );
        setItems(drawerItems)
    }, [routes, selectedKey]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const changeMode = () => {
        const newMode = mode === LIGHT_MODE ? DARK_MODE : LIGHT_MODE
        setMode(newMode)
        updateThemeMode(newMode)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.title}>
                        Vacations
                    </Typography>
                    <Typography variant="h6" noWrap>{user.username}</Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {items}
                </List>
                <Divider />
                <List>
                    <Switch checked={mode === LIGHT_MODE}
                        onChange={changeMode}
                        color='primary'
                        name='checkedB'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                </List>
                <Divider />
                <List>
                    {['Sign Out'].map((text, index) => (
                        <ListItem button key={text} onClick={logout}>
                            <ListItemIcon>{<ExitIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <VacationsContainer />
            </main>
        </div>
    );
}

Navigation.propTypes = {

};

export default memo(Navigation);
