import { State, Navigation } from 'react-router';
import docCookies from './cookies';
import classNames from 'classnames';

import { Link } from 'react-router';
import { SidebarBtn } from 'global/jsx/sidebar_component';

class Brand extends React.Component {
  render() {
    return (
      <NavHeader {...this.props}>
        <NavBrand tabIndex='-1'>
          Fuisz Studio
        </NavBrand>
      </NavHeader>
    );
  }
}

class LocaleMenuItem extends React.Component {
  render() {
    return (
      <MenuItem {...this.props} lang={null} href='#'>
        <Grid>
          <Row>
            <Col xs={2}>
              <img src={'/imgs/flags/flags/flat/32/'+this.props.flag+'.png'} width='32' height='32' />
            </Col>
            <Col xs={10}>
              <Entity className='lang-menu-text' entity='languageMenu' data={{lang: this.props.lang}} />
            </Col>
          </Row>
        </Grid>
      </MenuItem>
    );
  }
}

var DirectNavItem = React.createClass({
  mixins: [State, Navigation],
  render() {
    var active = false;
    var currentLocation = this.context.router.state.location.pathname;

    if(!active && this.props.path) {
      active = this.isActive(this.props.path) && (currentLocation == this.props.path);
    }

    var classes = classNames({
      'pressed': active
    });
    return (
      <NavItem className={classes} {...this.props}>
        <Link to={this.props.path}>
          <Icon bundle={this.props.bundle || 'fontello'} glyph={this.props.glyph} />
        </Link>
      </NavItem>
    );
  }
});

class BodyLayout extends React.Component {
  bodyLayoutRadioChange(value) {
  }
  handleBodyLayoutRadioChange(e) {
    this.bodyLayoutRadioChange(e.target.value);
  }
  componentDidMount() {
    this.bodyLayoutRadioChange(localStorage.getItem('bodyLayout'));
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={8}>
            <Radio browser ref='fixed-body' value='fixed-body' name='switch-body-layout' defaultChecked onChange={this.handleBodyLayoutRadioChange.bind(this)}>
              Fixed (Header + Sidebar)
            </Radio>
          </Col>
          <Col xs={4} className='text-right'>
            <Radio browser ref='static-body' value='static-body' name='switch-body-layout' onChange={this.handleBodyLayoutRadioChange.bind(this)}>
              Static
            </Radio>
          </Col>
        </Row>
      </Grid>
    );
  }
}

var HeaderNavigation = React.createClass({
  mixins: [State, Navigation],
  getInitialState() {
    return { selectedFlag: 'United-States' };
  },
  handleLogout(e) {
    $('body').addClass('fade-out');
    setTimeout(() => {
      this.transitionTo('/');
    }, 250);
  },
  componentDidMount() {
    (function() {
      var item = localStorage.getItem('settingsMenu');
      localStorage.setItem('settingsMenu', item || 'fluid');
    }.bind(this))();
  },
  componentWillUnmount() {
  },
  render() {
    return (
      <NavContent className='pull-right' {...this.props}>
        <Nav className='hidden-xs'>
          <DirectNavItem glyph='user-female' path='/app/social' className='small-font' />
        </Nav>
      </NavContent>
    );
  }
});

export default class Header extends React.Component {
  render() {
    return (
      <Grid id='navbar' {...this.props}>
        <Row>
          <Col xs={12}>
            <NavBar fixedTop id='rubix-nav-header'>
              <Container fluid>
                <Row>
                  <Col xs={3} visible='xs'>
                    <SidebarBtn />
                  </Col>
                  <Col xs={6} sm={4}>
                    <Brand />
                  </Col>
                  <Col xs={3} sm={8}>
                    <HeaderNavigation pressed={this.props.pressed} />
                  </Col>
                </Row>
              </Container>
            </NavBar>
          </Col>
        </Row>
      </Grid>
    );
  }
}
