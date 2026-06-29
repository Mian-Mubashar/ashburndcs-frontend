import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { clearAuthToken } from "services/authApi";
import logo from "images/logo.svg";

import { ReactComponent as LayoutIcon } from "feather-icons/dist/icons/layout.svg";
import { ReactComponent as UsersIcon } from "feather-icons/dist/icons/users.svg";
import { ReactComponent as CalendarIcon } from "feather-icons/dist/icons/calendar.svg";
import { ReactComponent as FileIcon } from "feather-icons/dist/icons/file-text.svg";
import { ReactComponent as HomeIcon } from "feather-icons/dist/icons/home.svg";
import { ReactComponent as LogOutIcon } from "feather-icons/dist/icons/log-out.svg";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { ReactComponent as ClockIcon } from "feather-icons/dist/icons/clock.svg";
import { ReactComponent as CheckIcon } from "feather-icons/dist/icons/check-circle.svg";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutIcon },
  { id: "pending", label: "Pending", Icon: ClockIcon, countKey: "pending" },
  { id: "approved", label: "Approved", Icon: CheckIcon, countKey: "approved" },
  { id: "completed", label: "Completed", Icon: UsersIcon, countKey: "completed" },
  { id: "schedules", label: "Schedules", Icon: CalendarIcon },
  { id: "materials", label: "Materials", Icon: FileIcon },
];

const Shell = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f0f2f8;
`;

const Sidebar = styled.aside`
  width: 260px;
  background: linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  transform: ${(p) => (p.$open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.25s ease;

  @media (min-width: 1024px) {
    transform: translateX(0);
    position: sticky;
    top: 0;
    height: 100vh;
  }
`;

const SidebarOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 90;
  display: ${(p) => (p.$open ? "block" : "none")};

  @media (min-width: 1024px) {
    display: none;
  }
`;

const LogoWrap = styled.div`
  padding: 24px 20px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const LogoButton = styled.button`
  display: block;
  width: 100%;
  padding: 4px 0;
  border: none;
  background: transparent;
  cursor: pointer;

  img {
    width: 6.5rem;
    height: auto;
    display: block;
    margin: 0 auto;
    filter: brightness(0) invert(1);
    opacity: 0.92;
  }

  &:hover img {
    opacity: 1;
  }
`;

const PortalLabel = styled.p`
  margin: 12px 0 0;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: center;
  font-weight: 600;
`;

const Nav = styled.nav`
  flex: 1;
  padding: 20px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 13px 16px;
  border: none;
  border-radius: 12px;
  background: ${(p) => (p.$active ? "linear-gradient(135deg, #6415ff, #7c3aed)" : "transparent")};
  color: ${(p) => (p.$active ? "#fff" : "rgba(255,255,255,0.75)")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  box-shadow: ${(p) => (p.$active ? "0 8px 20px rgba(100,21,255,0.35)" : "none")};

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  span.label {
    flex: 1;
  }

  span.count {
    font-size: 11px;
    min-width: 22px;
    padding: 2px 8px;
    border-radius: 999px;
    text-align: center;
    background: ${(p) => (p.$active ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)")};
  }

  &:hover {
    background: ${(p) => (p.$active ? "linear-gradient(135deg, #6415ff, #7c3aed)" : "rgba(255,255,255,0.08)")};
    color: #fff;
  }
`;

const SidebarFooter = styled.div`
  padding: 16px 14px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const Main = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.header`
  background: #fff;
  border-bottom: 1px solid #e8ecf4;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 50;
`;

const TopLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  h1 {
    margin: 0;
    font-size: 22px;
    font-weight: 800;
    color: #0f172a;
  }

  p {
    margin: 2px 0 0;
    font-size: 13px;
    color: #64748b;
  }
`;

const MenuBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    color: #334155;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const TopRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserBadge = styled.div`
  display: none;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  background: #f8fafc;
  border-radius: 999px;
  border: 1px solid #e2e8f0;

  @media (min-width: 640px) {
    display: flex;
  }

  span {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6415ff, #7c3aed);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
  }

  div {
    font-size: 13px;
    font-weight: 600;
    color: #334155;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const SignOutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #6415ff, #430ce5);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const Content = styled.main`
  flex: 1;
  padding: 24px;
  overflow-x: hidden;

  @media (min-width: 768px) {
    padding: 28px 32px 40px;
  }
`;

export default function AdminLayout({
  activeTab,
  onTabChange,
  enrollmentTabCounts = {},
  title,
  subtitle,
  userEmail,
  children,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (id) => {
    onTabChange(id);
    setSidebarOpen(false);
  };

  const handleSignOut = () => {
    clearAuthToken();
    navigate("/");
  };

  const initials = userEmail ? userEmail.charAt(0).toUpperCase() : "A";

  return (
    <Shell>
      <SidebarOverlay $open={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      <Sidebar $open={sidebarOpen}>
        <LogoWrap>
          <LogoButton type="button" onClick={() => navigate("/")} aria-label="Ashburn ADCS Home">
            <img src={logo} alt="Ashburn ADCS" />
          </LogoButton>
          <PortalLabel>Admin Portal</PortalLabel>
        </LogoWrap>
        <Nav>
          {NAV_ITEMS.map(({ id, label, Icon, countKey }) => (
            <NavItem key={id} type="button" $active={activeTab === id} onClick={() => handleNav(id)}>
              <Icon />
              <span className="label">{label}</span>
              {countKey && <span className="count">{enrollmentTabCounts[countKey] ?? 0}</span>}
            </NavItem>
          ))}
        </Nav>
        <SidebarFooter>
          <NavItem type="button" onClick={() => navigate("/")}>
            <HomeIcon />
            <span className="label">Back to Website</span>
          </NavItem>
        </SidebarFooter>
      </Sidebar>

      <Main>
        <TopBar>
          <TopLeft>
            <MenuBtn type="button" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Menu">
              {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </MenuBtn>
            <div>
              <h1>{title}</h1>
              {subtitle && <p>{subtitle}</p>}
            </div>
          </TopLeft>
          <TopRight>
            <UserBadge>
              <span>{initials}</span>
              <div>{userEmail}</div>
            </UserBadge>
            <SignOutBtn type="button" onClick={handleSignOut}>
              <LogOutIcon />
              Sign Out
            </SignOutBtn>
          </TopRight>
        </TopBar>
        <Content>{children}</Content>
      </Main>
    </Shell>
  );
}
