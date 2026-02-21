
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Target, Briefcase } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>OfferMate</h1>
            </div>
            <ul className="navbar-links">
                <li>
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/skills" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        <Target size={20} />
                        <span>Skills</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/opportunities" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        <Briefcase size={20} />
                        <span>Opportunities</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
