import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthModal } from "context/AuthModalContext";
import { getAuthToken, clearAuthToken } from "services/authApi";
import { getActiveEnrollmentTracks } from "utils/enrollmentStorage";

import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";

import logo from "../../images/logo.svg";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";

const Header = tw.header`
  flex justify-between items-center
  max-w-screen-xl mx-auto
`;

export const NavLinks = tw.div`inline-flex flex-col lg:flex-row lg:flex-nowrap lg:items-center`;

export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-2 lg:my-0 lg:whitespace-nowrap
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
export const MobileNavLinks = styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white `}
  ${(props) => (props.$show ? tw`block` : tw`hidden`)}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`;

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
  const [auth, setAuth] = useState(() => getAuthToken());
  const trackedEnrollments = getActiveEnrollmentTracks();
  const { openAuthModal } = useAuthModal();
  const nav = useNavigate();
  const { pathname } = useLocation();
  const navigateTo = navigate || nav;

  const handleSignOut = () => {
    clearAuthToken();
    setAuth(null);
    navigateTo("/");
  };

  const isActive = (path, exact = false) => {
    if (exact) return pathname === path;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const defaultLinks = [
    <NavLinks key={1}>
      {/* Journey order: learn → dates → apply → pay → track → jobs → contact */}
      <ActiveNavLink $active={isActive("/", true)} onClick={() => navigateTo("/")}>
        Home
      </ActiveNavLink>
      <ActiveNavLink $active={isActive("/about-us")} onClick={() => navigateTo("/about-us")}>
        About Us
      </ActiveNavLink>
      <ActiveNavLink $active={isActive("/course-outline")} onClick={() => navigateTo("/course-outline")}>
        Course Outline
      </ActiveNavLink>
      {/* Schedule and My Enrollment nav links disabled per client request (Aug 2026) */}
      {/* <ActiveNavLink $active={isActive("/schedule")} onClick={() => navigateTo("/schedule")}>
        Schedule
      </ActiveNavLink> */}
      <ActiveNavLink $active={isActive("/registration")} onClick={() => navigateTo("/registration")}>
        Registration
      </ActiveNavLink>
      <ActiveNavLink $active={isActive("/payment")} onClick={() => navigateTo("/payment")}>
        Payment
      </ActiveNavLink>
      {/* {!auth && (
        <ActiveNavLink $active={isActive("/my-enrollment")} onClick={() => navigateTo("/my-enrollment")}>
          My Enrollment
        </ActiveNavLink>
      )}
      {auth?.role === "student" && trackedEnrollments.length > 0 && (
        <ActiveNavLink $active={isActive("/my-enrollment")} onClick={() => navigateTo("/my-enrollment")}>
          My Enrollment
        </ActiveNavLink>
      )} */}
      <ActiveNavLink $active={isActive("/career")} onClick={() => navigateTo("/career")}>
        Career
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
            onClick={handleSignOut}
          >
            Sign Out
          </PrimaryLink>
        </>
      )}
    </NavLinks>,
  ];

  const { showNavLinks, toggleNavbar } = useAnimatedNavToggler();
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
        <MobileNavLinks $show={showNavLinks} css={collapseBreakpointCss.mobileNavLinks}>
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
