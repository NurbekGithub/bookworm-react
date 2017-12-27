import React from 'react';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';
import { allBooksSelector } from '../../reducers/books';

const TopNavigation = ({ user, logout, hasBooks }) => {
  
  return (
    <Menu secondary pointing>
      <Menu.Item as={Link} to='/dashboard'>Dashboard</Menu.Item>
      { hasBooks && <Menu.Item as={Link} to='/books/new'>Add new book</Menu.Item> }
      <Menu.Item position='right'>
        <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}>
          <Dropdown.Menu>
            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
}

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  hasBooks: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user,
    hasBooks: allBooksSelector(state).length > 0
  }
}

export default connect(mapStateToProps, { logout })(TopNavigation);