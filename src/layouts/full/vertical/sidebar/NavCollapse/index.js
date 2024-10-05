import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ListItemIcon, ListItem, Collapse, styled, ListItemText } from '@mui/material';
import NavItem from '../NavItem';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';

const NavCollapse = ({ menu, level, pathWithoutLastPart, pathDirect, onClick, hideMenu }) => {
  const theme = useTheme()
  const isLightMode = theme.palette.mode === 'light';
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // This determines if any child is active
  const isChildActive = menu.children.some((child) => pathname.includes(child.href));

  // Automatically open the collapse if any child is active
  useEffect(() => {
    if (isChildActive) {
      setOpen(true);
    }
  }, [pathname, isChildActive]);

  const handleClick = () => {
    setOpen(!open);
    onClick?.();
  };


  const ListItemStyled = styled(ListItem)(({ theme, open, level, pathname, menu, hideMenu, customizer }) => ({
    marginBottom: '2px',
    padding: '8px 10px',
    // paddingLeft: hideMenu ? '10px' : level > 2 ? ${level * 15}px : '10px',
    backgroundColor: 'transparent', // Default background is transparent
    whiteSpace: 'nowrap',
    color: isLightMode ? '#535f6b': '#fff',
    position: 'relative', // To enable absolute positioning of the pseudo-element
    '& .MuiListItemIcon-root': {
      color: isLightMode ? '#535f6b': '#fff',
    },
    // ;
    // Hover state
    '&:hover': {
      backgroundColor: 'rgba(71, 136, 255, .1)', // Background when hovered
      color: '#4788ff', // Text color when hovered
      
      '& .MuiListItemIcon-root': {
        color: '#4788ff', // Icon color when hovered
      },
  
      // Left border on hover
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '5px', // Padding on top
        bottom: '5px', // Padding on bottom
        left: 0,
        width: '4px', // Left border width
        backgroundColor: '#4788ff', // Border color
        borderRadius: '10px', // Full-rounded left border
      },
    },
  
    // Selected state
    '&.Mui-selected': {
      backgroundColor: 'rgba(71, 136, 255, .1)', // Background when selected
      color: '#4788ff', // Text color when selected
      '& .MuiListItemIcon-root': {
        color: '#4788ff', // Icon color when selected
      },
  
      // Left border when selected
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '5px', // Padding on top
        bottom: '5px', // Padding on bottom
        left: 0,
        width: '4px', // Left border width
        backgroundColor: '#4788ff', // Border color
        borderRadius: '10px', // Full-rounded left border
      },
  
      // Keep the hover effect when selected
      '&:hover': {
        backgroundColor: 'rgba(71, 136, 255, .1)', // Keep background on hover when selected
        color: '#4788ff', // Keep text color on hover when selected
      },
    },
  }));

  const ListItemIconStyled = styled(ListItemIcon)({
    minWidth: '36px',
    display: 'flex',
    justifyContent: hideMenu ? 'center' : 'space-between',
  });

  return (
    <>
      <ListItemStyled button selected={isChildActive || pathname.includes(menu.href)} onClick={handleClick}>
        <ListItemIconStyled>{<menu.icon stroke={1.5} size={level > 1 ? '1rem' : '1.3rem'} />}</ListItemIconStyled>
        <ListItemText>{hideMenu ? '' : menu.title}</ListItemText>
        {!open ? <IconChevronDown size="1rem" /> : <IconChevronUp size="1rem" />}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit className={`${isLightMode ? 'borderrr' : '' }`}>
        {menu.children.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            level={level + 1}
            pathDirect={pathDirect}
            hideMenu={hideMenu}
            onClick={onClick}
            isChild
          />
        ))}
      </Collapse>
    </>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object.isRequired,
  level: PropTypes.number,
  pathDirect: PropTypes.string,
  pathWithoutLastPart: PropTypes.string,
  hideMenu: PropTypes.bool,
  onClick: PropTypes.func,
};

export default NavCollapse;
