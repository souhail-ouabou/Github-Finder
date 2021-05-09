import React  from 'react'
import PropTypes from 'prop-types' // impt
import {Link} from 'react-router-dom';
 const Navbar = ({icon , title}) => {
        return (
            <nav className='navbar bg-primary'>
                <Link to='/'>
                <h1>
                     <i className={icon}/> {title}
                </h1>
                 </Link>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/About'>About</Link></li>
                </ul>
               
            </nav>
        )
}
  //default props
     Navbar.defaultProps = {
        title: 'Github Finder',
        icon: 'fab fa-github'
    };
    //propTypes
    Navbar.propTypes = {
        title : PropTypes.string.isRequired,
        icon : PropTypes.string.isRequired
    }
export default Navbar
