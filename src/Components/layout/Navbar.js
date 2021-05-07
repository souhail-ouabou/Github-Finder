import React  from 'react'
import PropTypes from 'prop-types' // impt

 const Navbar = ({icon , title}) => {
        return (
            <nav className='navbar bg-primary'>
                <h1>
                     <i className={icon}/> {title}
                </h1>
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
