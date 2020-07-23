import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import Vacation from "./Vacation";

const useStyles = makeStyles({
    vacationsRoot: {
        display: 'grid',
        gridColumnGap: '10px',
        gridRowGap: '15px',
        gridTemplateColumns: '2fr 2fr 2fr',
        marginTop: '70px'
    },
});

function Vacations({ getVacations, vacations }) {

    const [items, setItems] = React.useState([]);

    useEffect(() => {
        if (getVacations) {
            getVacations()
        }
    }, [getVacations]);

    useEffect(() => {
        const vacationsElements = vacations && vacations.vacations.map(vacation => (
            <Vacation key={vacation.id} vacation={vacation} />)
        );
        setItems(vacationsElements)
    }, [vacations]);

    const classes = useStyles();

    return <div className={classes.vacationsRoot}>
        {items}
    </div>;
}

Vacations.propTypes = {
    getVacations: PropTypes.func,
    vacations: PropTypes.object,
};

export default Vacations;
