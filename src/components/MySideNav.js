import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import '@trendmicro/react-sidenav/dist/react-sidenav.css'

import { Link, useNavigate } from 'react-router-dom';

function MySideNav() {
    const navigate = useNavigate();
    return <SideNav
        onSelect={selected => {
            console.log(selected)
            navigate('/'+selected)
        }}>
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="create_product">
                <NavIcon><i className='fa fa-fw fa-plus' style={{ fontSize: 25 }} /></NavIcon>
                <NavText>Create Product</NavText>
            </NavItem>

            <NavItem eventKey="all_products">
                <NavIcon><i className='fa fa-fw fa-table' style={{ fontSize: 25 }} /></NavIcon>
                <NavText>All Products</NavText>
            </NavItem>
        </SideNav.Nav>
    </SideNav>
}

export default MySideNav