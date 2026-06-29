import React, { useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthModal } from "context/AuthModalContext";
import { getAuthToken } from "services/authApi";
import { getActiveEnrollmentTracks } from "utils/enrollmentStorage";

import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";

import logo from "../../images/logo.svg";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";

const ChevronDown = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const Header = tw.header`
  flex justify-between items-center
  max-w-screen-xl mx-auto
`;

export const NavLinks = tw.div`inline-flex flex-col lg:flex-row lg:flex-nowrap lg:items-center`;

export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-3 lg:my-0 lg:whitespace-nowrap
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
  cursor-pointer
`;

const ActiveNavLink = styled(NavLink)`
  ${({ $active }) => $active && tw`text-primary-500 border-primary-500`}
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-6 py-2 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

const DropdownWrap = styled.div`
  position: relative;
  display: inline-block;
  ${tw`my-2 lg:my-0 lg:mx-3`}

  @media (min-width: 1024px) {
    &.open .nav-dropdown,
    &:focus-within .nav-dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      pointer-events: auto;
    }
  }

  &.open .nav-dropdown {
    display: block;

    @media (min-width: 1024px) {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      pointer-events: auto;
    }
  }
`;

const DropdownTrigger = styled.button`
  ${tw`text-lg lg:text-sm font-semibold tracking-wide transition duration-300 text-gray-900`}
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0 0 1px;
  cursor: pointer;
  white-space: nowrap;

  &:hover,
  &:focus {
    ${tw`text-primary-500 border-primary-500`}
    outline: none;
  }

  svg {
    width: 14px;
    height: 14px;
    transition: transform 0.2s;
  }

  ${(p) => p.$open && "svg { transform: rotate(180deg); }"}
  ${(p) => p.$active && tw`text-primary-500 border-primary-500`}
`;

const DropdownMenu = styled.div`
  @media (min-width: 1024px) {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 220px;
    padding-top: 8px;
    z-index: 200;
    opacity: 0;
    visibility: hidden;
    transform: translateY(6px);
    transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
    pointer-events: none;
  }

  @media (max-width: 1023px) {
    display: none;
    padding: 4px 0 4px 12px;
  }
`;

const DropdownMenuPanel = styled.div`
  @media (min-width: 1024px) {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    border: 1px solid #f3f4f6;
    padding: 6px 0;
    overflow: hidden;
  }
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #faf5ff;
    color: #6415ff;
  }

  @media (max-width: 1023px) {
    text-align: center;
    font-size: 16px;
    padding: 8px 12px;
  }
`;

export const LogoLink = styled(NavLink)`
  ${tw`items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-10 mr-3`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300 
`;
export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white `}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center cursor-pointer flex-nowrap
`;

export default ({
  roundedHeaderButton = false,
  logoLink,
  links,
  className,
  collapseBreakpointClass = "lg",
  navigate = useNavigate(),
}) => {
  const auth = getAuthToken();
  const trackedEnrollments = getActiveEnrollmentTracks();
  const { openAuthModal } = useAuthModal();
  const nav = useNavigate();
  const { pathname } = useLocation();
  const navigateTo = navigate || nav;
  const [servicesOpen, setServicesOpen] = useState(false);

  const isActive = (path, exact = false) => {
    if (exact) return pathname === path;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const isServicesActive = ["/services", "/d-services", "/career"].some((path) => isActive(path));

  const go = (path) => {
    setServicesOpen(false);
    navigateTo(path);
  };

  const isDesktopNav = () => window.matchMedia("(min-width: 1024px)").matches;

  const openServicesMenu = () => {
    if (isDesktopNav()) setServicesOpen(true);
  };

  const closeServicesMenu = () => {
    if (isDesktopNav()) setServicesOpen(false);
  };

  const toggleServicesMenu = () => {
    setServicesOpen((v) => !v);
  };

  const servicesDropdown = (
    <DropdownWrap
      className={servicesOpen ? "open" : ""}
      onMouseEnter={openServicesMenu}
      onMouseLeave={closeServicesMenu}
    >
      <DropdownTrigger
        type="button"
        $open={servicesOpen}
        $active={isServicesActive}
        aria-expanded={servicesOpen}
        aria-haspopup="true"
        onClick={toggleServicesMenu}
      >
        IT Services
        <ChevronDown />
      </DropdownTrigger>
      <DropdownMenu className="nav-dropdown">
        <DropdownMenuPanel>
          <DropdownItem type="button" onClick={() => go("/services")}>
            IT Services
          </DropdownItem>
          <DropdownItem type="button" onClick={() => go("/d-services")}>
            Data Center Services
          </DropdownItem>
          <DropdownItem type="button" onClick={() => go("/career")}>
            Career
          </DropdownItem>
        </DropdownMenuPanel>
      </DropdownMenu>
    </DropdownWrap>
  );

  const defaultLinks = [
    <NavLinks key={1}>
      <ActiveNavLink $active={isActive("/", true)} onClick={() => navigateTo("/")}>
        Home
      </ActiveNavLink>
      {servicesDropdown}
      <ActiveNavLink $active={isActive("/schedule")} onClick={() => navigateTo("/schedule")}>
        Schedule
      </ActiveNavLink>
      {!auth && (
        <ActiveNavLink $active={isActive("/my-enrollment")} onClick={() => navigateTo("/my-enrollment")}>
          My Enrollment
        </ActiveNavLink>
      )}
      {auth?.role === "student" && trackedEnrollments.length > 0 && (
        <ActiveNavLink $active={isActive("/my-enrollment")} onClick={() => navigateTo("/my-enrollment")}>
          My Enrollment
        </ActiveNavLink>
      )}
      <ActiveNavLink $active={isActive("/about-us")} onClick={() => navigateTo("/about-us")}>
        About Us
      </ActiveNavLink>
      <ActiveNavLink $active={isActive("/contact-us")} onClick={() => navigateTo("/contact-us")}>
        Contact Us
      </ActiveNavLink>

      {!auth ? (
        <>
          <NavLink onClick={() => openAuthModal("login")} tw="lg:ml-4!">
            Login
          </NavLink>
          <PrimaryLink
            css={roundedHeaderButton && tw`rounded-full`}
            onClick={() => openAuthModal("signup")}
          >
            Sign Up
          </PrimaryLink>
        </>
      ) : (
        <>
          {auth?.role === "admin" && (
            <ActiveNavLink $active={isActive("/admin")} onClick={() => navigateTo("/admin")}>
              Dashboard
            </ActiveNavLink>
          )}
          {auth?.role === "student" && (
            <ActiveNavLink $active={isActive("/dashboard")} onClick={() => navigateTo("/dashboard")}>
              Dashboard
            </ActiveNavLink>
          )}
          <PrimaryLink
            css={roundedHeaderButton && tw`rounded-full`}
            onClick={() => {
              window.localStorage.clear();
              navigateTo("/");
              window.location.reload();
            }}
          >
            Sign Out
          </PrimaryLink>
        </>
      )}
    </NavLinks>,
  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss =
    collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <LogoLink onClick={() => navigateTo("/")}>
      <img src={logo} alt="logo" style={{ width: "6.5rem" }} />
    </LogoLink>
  );

  logoLink = logoLink || defaultLogoLink;
  links = links || defaultLinks;
  return (
    <Header style={className} className={className || "header-light"}>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer
        css={collapseBreakpointCss.mobileNavLinksContainer}
      >
        {logoLink}
        <MobileNavLinks
          initial={{ x: "150%", display: "none" }}
          animate={animation}
          css={collapseBreakpointCss.mobileNavLinks}
        >
          {links}
        </MobileNavLinks>
        <NavToggle
          onClick={toggleNavbar}
          className={showNavLinks ? "open" : "closed"}
        >
          {showNavLinks ? (
            <CloseIcon tw="w-6 h-6" />
          ) : (
            <MenuIcon tw="w-6 h-6" />
          )}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`,
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`,
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
};
