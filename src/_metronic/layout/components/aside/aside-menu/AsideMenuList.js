/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
// import { selectUser } from "../../../../../app/modules/Auth/_redux/authRedux";
import { useSelector } from "react-redux";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  // const user = useSelector(selectUser);

  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
          "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
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
      title: "Master",
      url: "/master",
      icon: "/Files/Folder.svg",
      childs: [
        {
          menu_id: "6b780c40-73a0-468c-90ce-6fc49609248f",
          menu_name: "companies",
          title: "Company",
          url: "/master/company",
          icon: null,
          childs: [],
        },
        {
          menu_id: "495fa896-8005-48c6-b4e6-daa3c66d07a6",
          menu_name: "customers",
          title: "Customer",
          url: "/master/customer",
          icon: null,
          childs: [],
        },
        {
          menu_id: "a8795614-d880-4128-acb5-66b566597827",
          menu_name: "Branch",
          title: "Branch",
          url: "/master/branch",
          icon: null,
          childs: [],
        },
        {
          menu_id: "70d83784-e74e-400c-845e-c1d5be2213af",
          menu_name: "uoms",
          title: "UOM",
          url: "/master/uom",
          icon: null,
          childs: [],
        },
        {
          menu_id: "6e504b2f-239b-4c9a-a7a2-0e17935cf962",
          menu_name: "products",
          title: "Product",
          url: "/master/product",
          icon: null,
          childs: [],
        },
        {
          menu_id: "0cc0c47f-e3cc-40ba-bc85-33b8ebece2f8",
          menu_name: "pricelists",
          title: "Price List",
          url: "/master/pricelist",
          icon: null,
          childs: [],
        },
        {
          menu_id: "e2bb6a2a-b29c-4aec-b664-fac0f1df094c",
          menu_name: "Regular Discount",
          title: "Regular Discount",
          url: "/master/reguler-disc",
          icon: null,
          childs: [],
        },
        {
          menu_id: "5f5ee92d-584b-488f-92dd-ec08713731b9",
          menu_name: "Special Discount",
          title: "Special Discount",
          url: "/master/special-disc",
          icon: null,
          childs: [],
        },
        {
          menu_id: "9e0172ed-e608-4c4a-b0c7-567d1f08c67b",
          menu_name: "journey_settings",
          title: "Journey Setting",
          url: "/master/journey-setting",
          icon: null,
          childs: [],
        },
        {
          menu_id: "4c5a8e69-203a-49f7-aafb-b3909b8ef353",
          menu_name: "initial_load_settings",
          title: "Initial Load Setting",
          url: "/master/initial-load",
          icon: null,
          childs: [],
        },
        {
          menu_id: "0a121b8c-e558-42cd-ae7e-01e45aa914ce",
          menu_name: "adjustment_plans",
          title: "Adjustment Plan",
          url: "/master/adjustment",
          icon: null,
          childs: [],
        },
        {
          menu_id: "9e8226eb-e315-414c-b56e-b701a5f09fb3",
          menu_name: "Geolocation Map",
          title: "Geolocation Map",
          url: "/master/geolocation-map",
          icon: null,
          childs: [],
        },
        {
          menu_id: "4cc46ef7-0b63-4ed5-ae7c-deb8c4a98a65",
          menu_name: "Area",
          title: "Area",
          url: "/master/area",
          icon: null,
          childs: [],
        },
      ],
    },
    {
      menu_id: "2eb9fd15-77c0-43fb-ade7-b7fb6d5beed5",
      menu_name: "transaction",
      title: "Transaction",
      url: "/transaction",
      icon: "/Communication/Clipboard-check.svg",
      childs: [
        {
          menu_id: "4cfef501-dbb3-47a0-96ce-65c7f44e0ef8",
          menu_name: "journies",
          title: "Journey",
          url: "/transaction/journey",
          icon: null,
          childs: [],
        },
        {
          menu_id: "20c09a4a-ca30-4f75-a7e4-138008e653f0",
          menu_name: "orders",
          title: "Order",
          url: "/transaction/order",
          icon: null,
          childs: [],
        },
        {
          menu_id: "6f5f850d-99f1-48c0-bd08-160ca9ce6e23",
          menu_name: "Sell In",
          title: "Sell In",
          url: "/transaction/sell-in",
          icon: null,
          childs: [],
        },
      ],
    },
    {
      menu_id: "94fcb110-3314-4631-8f7a-c7cbdb44e0fd",
      menu_name: "Report",
      title: "Report",
      url: "/report",
      icon: "/General/Clipboard.svg",
      childs: [],
    },
    {
      menu_id: "4bf59e6e-270e-4e76-8b56-eb950e98955c",
      menu_name: "Report Consolidation",
      title: "Report Consolidation",
      url: "/consolidation-report",
      icon: "/General/Clipboard.svg",
      childs: [],
    },
    {
      menu_id: "c8c6372e-3d83-45f1-b263-4bf09725c3a3",
      menu_name: "Survey",
      title: "Survey",
      url: "/survey/form",
      icon: "/Shopping/Chart-pie.svg",
      childs: [],
    },
  ]);

  // useEffect(() => {
  //   setItems(user.navigation);
  // });

  return (
    <>
      {/* Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/* Loop Menu Level 1 */}
        {items.map((menu) => {
          if (menu.childs.length === 0) {
            // Render don't have child
            return (
              <li
                className={`menu-item ${getMenuItemActive(
                  `${menu.url}`,
                  false
                )}`}
                aria-haspopup="true"
              >
                <NavLink className="menu-link" to={menu.url}>
                  <span className="svg-icon menu-icon">
                    <SVG src={toAbsoluteUrl(`/media/svg/icons/${menu.icon}`)} />
                  </span>
                  <span className="menu-text font-weight-bold">
                    {menu.title}
                  </span>
                </NavLink>
              </li>
            );
          } else {
            // Render if have child
            return (
              <li
                className={`menu-item menu-item-submenu ${getMenuItemActive(
                  `${menu.url}`,
                  true
                )}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <NavLink className="menu-link menu-toggle" to={menu.url}>
                  <span className="svg-icon menu-icon">
                    <SVG src={toAbsoluteUrl(`/media/svg/icons/${menu.icon}`)} />
                  </span>
                  <span className="menu-text font-weight-bold">
                    {menu.title}
                  </span>

                  <i className="menu-arrow" />
                </NavLink>
                <div className="menu-submenu ">
                  <ul className="menu-subnav">
                    <ul className="menu-subnav">
                      {/* Loop Menu Level 2 */}
                      {menu.childs.map((submenu) => {
                        if (submenu.childs.length === 0) {
                          // Render if don't have child
                          return (
                            <li
                              className={`menu-item ${getMenuItemActive(
                                `${submenu.url}`
                              )}`}
                              aria-haspopup="true"
                            >
                              <NavLink className="menu-link" to={submenu.url}>
                                <i className="menu-bullet menu-bullet-dot">
                                  <span />
                                </i>
                                <span className="menu-text font-weight-bold">
                                  {submenu.title}
                                </span>
                              </NavLink>
                            </li>
                          );
                        } else {
                          // Render if have child
                          return (
                            <li
                              className={`menu-item menu-item-submenu ${getMenuItemActive(
                                `${submenu.url}`,
                                true
                              )}`}
                              aria-haspopup="true"
                              data-menu-toggle="hover"
                            >
                              <NavLink
                                className="menu-link menu-toggle"
                                to={submenu.url}
                              >
                                <span className="svg-icon menu-icon">
                                  <SVG
                                    src={toAbsoluteUrl(
                                      `/media/svg/icons/${submenu.icon}`
                                    )}
                                  />
                                </span>
                                <span className="menu-text font-weight-bold">
                                  {submenu.title}
                                </span>

                                <i className="menu-arrow" />
                              </NavLink>

                              <div className="menu-submenu ">
                                <ul className="menu-subnav">
                                  <ul className="menu-subnav"></ul>
                                  {/* Loop Menu Level 3 */}
                                  {submenu.childs.map((child) => {
                                    return (
                                      <li
                                        className={`menu-item ${getMenuItemActive(
                                          `${child.url}`
                                        )}`}
                                        aria-haspopup="true"
                                      >
                                        <NavLink
                                          className="menu-link"
                                          to={child.url}
                                        >
                                          <i className="menu-bullet menu-bullet-dot">
                                            <span />
                                          </i>
                                          <span className="menu-text font-weight-bold">
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
                  </ul>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}
