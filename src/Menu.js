import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Usuarios from './Usuarios';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
/*
function getActivo(){
    try {
        const token = localStorage.getItem('TOKEN_APP_TALLER');
        const activo = localStorage.getItem('ESTA_ACTIVO'); // revisa si el campo esta activo
        if (token == null) {
            window.location = '/login';
        }
        if (activo == false){
            alert(token)
            localStorage.removeItem('TOKEN_APP_TALLER');
            window.location = '/login';
        }
    } catch (error) {
       alert(error)
    }
}
*/

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    }
}));

export default function Menu() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        const token = localStorage.getItem('TOKEN_APP_TALLER'); // token almacenado localmente
        const activo = localStorage.getItem('ESTA_ACTIVO'); // se almacena el campo de si esta activo o no

        if (!token || token == null || token == undefined) { // Consulta si el token es invalido, no esta definidido o es nulo
            window.location = '/login'; // redirecciona a /login
        }
        if (activo === 'false'){ // compara el contenido de la constante activo, que fue guardado en la linea 76 como item
            localStorage.removeItem('TOKEN_APP_TALLER'); // Remueve el token ya que el campo activo es false, que quiere decir que no esta activo
            window.location = '/'; // Redirecciona a la página inicial
        }
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Usuarios" {...a11yProps(0)} />
                    <Tab label="Autor" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                    <Tab label="Nuevo" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Usuarios/>
            </TabPanel>
            <TabPanel value={value} index={1}>

            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>

            <TabPanel value={value} index={3}>
                Aqui va a ir el menu nuevo
            </TabPanel>
        </div>
    );
}