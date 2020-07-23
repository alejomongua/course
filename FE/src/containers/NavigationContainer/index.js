import { connect } from 'react-redux';
import Navigation from './components/Navigation';
import { logout } from 'containers/AuthContainer/meta/actions'
import { getUser } from '../AuthContainer/meta/selectors'
import { updateThemeMode } from 'containers/App/meta/actions'

const mapStateToProps = state => ({
    routes: [{ key: 'home', path: 'home', text: 'Home' }, { key: 'vacations', path: 'vacations', text: 'Vacations' }],
    user: getUser(state)
});

const mapDispatchToProps = {
    logout,
    updateThemeMode,
};

const NavigationContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navigation);

export default NavigationContainer;
