/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";

export function HeaderMenu({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? "menu-item-active" : "";
  };

  const [items, setItems] = useState([
    {
      menu_id: "97e12288-8a2b-46b2-9260-98951833a441",
      menu_name: "Dashboard",
      title: "Dashboard",
      url: "/dashboard",
      icon: "/Home/Home.svg",
      childs: [],
    },
    {
      menu_id: "28b83233-8adc-4da6-bb2e-f60560b0f2b6",
      menu_name: "administration",
      title: "Administration",
      url: "/administration",
      icon: "/General/Settings-2.svg",
      childs: [
        {
          menu_id: "0979917e-d964-4a61-b68f-86b1bd778fa5",
          menu_name: "users",
          title: "User",
          url: "/administration/user",
          icon: null,
          childs: [],
        },
        {
          menu_id: "1d9c231f-9325-4125-959f-dc8a81fe7213",
          menu_name: "role",
          title: "Role",
          url: "/administration/role",
          icon: null,
          childs: [],
        },
        {
          menu_id: "a692c5ab-97c9-494b-8fd8-559b4cc50afc",
          menu_name: "policy",
          title: "Policy",
          url: "/administration/policy",
          icon: null,
          childs: [],
        },
        {
          menu_id: "79e432d7-6b6e-49d3-9d74-4f8f27154bdc",
          menu_name: "Menu",
          title: "Menu",
          url: "/administration/menu",
          icon: null,
          childs: [],
        },
        {
          menu_id: "1a6ca455-e62f-4cc5-b6fe-db56c5defdbe",
          menu_name: "Setting",
          title: "System Setting",
          url: "/administration/setting",
          icon: null,
          childs: [],
        },
        {
          menu_id: "e1a533e8-1c19-4a68-a82a-ec436e178d8e",
          menu_name: "License",
          title: "License",
          url: "/administration/license",
          icon: null,
          childs: [],
        },
        {
          menu_id: "a957ba69-86aa-40b4-9ec6-d8b2eadf26b5",
          menu_name: "Param",
          title: "Parameter",
          url: "/administration/param",
          icon: null,
          childs: [],
        },
        {
          menu_id: "daa0deb0-f931-4426-bca7-b9b1637c7096",
          menu_name: "Crash Report",
          title: "Crash Report",
          url: "/administration/crash-report",
          icon: null,
          childs: [],
        },
        {
          menu_id: "d81dbf28-530c-47dd-ae05-d46ef1db9a4f",
          menu_name: "Apilog",
          title: "Apilog",
          url: "/administration/apilog",
          icon: null,
          childs: [],
        },
        {
          menu_id: "4eeb85f4-f35a-4ea8-aa3f-326e4710abe9",
          menu_name: "Privacy Policy",
          title: "Privacy Policy",
          url: "/administration/privacy-policy",
          icon: null,
          childs: [],
        },
      ],
    },
    {
      menu_id: "01ce3589-a781-4039-ac20-7fd61ee3f063",
      menu_name: "masters",
      title: "Courses",
      url: "/course",
      icon: "/Files/Folder.svg",
      childs: [],
    },
  ]);

  return (
    <>
      <div
        id="kt_header_menu"
        className={`header-menu header-menu-left header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
      >
        {/*begin::Header Nav*/}
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {items.map((menu) => {
            if (menu.childs.length === 0) {
              return (
                /*begin::1 Level*/
                <li
                  className={`menu-item menu-item-rel ${getMenuItemActive(
                    `${menu.url}`
                  )}`}
                >
                  <NavLink className="menu-link" to={menu.url}>
                    <span className="menu-text"> {menu.title}</span>
                    {layoutProps.rootArrowEnabled && (
                      <i className="menu-arrow" />
                    )}
                  </NavLink>
                </li>
              );
            } else {
              return (
                <li
                  data-menu-toggle={layoutProps.menuDesktopToggle}
                  aria-haspopup="true"
                  className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive(
                    `${menu.url}`
                  )}`}
                >
                  <NavLink className="menu-link menu-toggle" to={menu.url}>
                    <span className="menu-text"> {menu.title}</span>
                    <i className="menu-arrow"></i>
                  </NavLink>
                  <div className="menu-submenu menu-submenu-classic menu-submenu-left">
                    <ul className="menu-subnav">
                      {/* Loop Menu Level 2 */}
                      {menu.childs.map((submenu) => {
                        if (submenu.childs.length === 0) {
                          return (
                            <li
                              className={`menu-item ${getMenuItemActive(
                                `${submenu.url}`
                              )}`}
                            >
                              <NavLink className="menu-link" to={submenu.url}>
                                <span className="menu-text">
                                  {" "}
                                  {submenu.title}
                                </span>
                              </NavLink>
                            </li>
                          );
                        } else {
                          return (
                            <li
                              className={`menu-item menu-item-submenu ${getMenuItemActive(
                                `${submenu.url}`
                              )}`}
                              data-menu-toggle="hover"
                              aria-haspopup="true"
                            >
                              <NavLink
                                className="menu-link menu-toggle"
                                to={submenu.url}
                              >
                                <span className="menu-text">
                                  {submenu.title}
                                </span>
                                <i className="menu-arrow" />
                              </NavLink>
                              <div
                                className={`menu-submenu menu-submenu-classic menu-submenu-right`}
                              >
                                <ul className="menu-subnav">
                                  {/* Loop Menu Level 3 */}
                                  {submenu.childs.map((child) => {
                                    return (
                                      <li
                                        className={`menu-item ${getMenuItemActive(
                                          `${child.url}`
                                        )}`}
                                      >
                                        <NavLink
                                          className="menu-link"
                                          to={child.url}
                                        >
                                          <i className="menu-bullet menu-bullet-dot">
                                            <span />
                                          </i>
                                          <span className="menu-text">
                                            {" "}
                                            {child.title}
                                          </span>
                                        </NavLink>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </li>
              );
            }
          })}
        </ul>
        {/*end::Header Nav*/}
      </div>
    </>
  );
}
