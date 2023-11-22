import React from "react";
import * as AiIcons from 'react-icons/ai'
import * as MdIcons from 'react-icons/md'
import * as BsIcons from 'react-icons/bs'
import * as RiIcons from 'react-icons/ri'



export const Sidebardata = [
    {
        title: "Dashboard",
        path: "/admin/home",
        icons:<AiIcons.AiFillDashboard/>,
        
    },
    {
        title: "Catalog",
        icons: <AiIcons.AiFillDashboard />,
        iconClosed: <RiIcons.RiArrowDropDownFill />,
        iconOpened: <RiIcons.RiArrowDropUpFill />,
        subNav: [
            {
                title: "Categories",
                path: "/admin/home/catalog/categories",
                icons: <MdIcons.MdKeyboardDoubleArrowRight />,
            },
            {
                title: "Products",
                path: "/admin/home/catalog/products",
                icons: <MdIcons.MdKeyboardDoubleArrowRight />,
            }
        ]
    },    
    {
        title: "Design",
        icons:<RiIcons.RiComputerLine/>,
        iconClosed: <RiIcons.RiArrowDropDownFill />,
        iconOpened: <RiIcons.RiArrowDropUpFill />,
        subNav: [
            {
                title: "Layout",
                path: "/admin/home/design/layout",
                icons:<MdIcons.MdKeyboardDoubleArrowRight/>, 
            },
            {
                title: "Theme Editor",
                path: "/admin/home/design/themeeditor",
                icons:<MdIcons.MdKeyboardDoubleArrowRight/>, 
            }
        ]
    },
    {
        title: "Sales",
        icons:<BsIcons.BsFillCartFill/>,
        iconClosed: <RiIcons.RiArrowDropDownFill />,
        iconOpened: <RiIcons.RiArrowDropUpFill />,
        subNav: [
            {
                title: "Orders",
                path: "/admin/home/sales/orders",
                icons:<MdIcons.MdKeyboardDoubleArrowRight/>, 
            },
            {
                title: "returns",
                path: "/admin/home/sales/returns",
                icons:<MdIcons.MdKeyboardDoubleArrowRight/>, 
            }
        ]
    },
    {
        title: "Customer",
        icons:<BsIcons.BsFillPersonFill/>,
        iconClosed: <RiIcons.RiArrowDropDownFill />,
        iconOpened: <RiIcons.RiArrowDropUpFill />,
        subNav: [
            {
                title: "Customer",
                path: "/admin/home/customer/customer",
                icons:<MdIcons.MdKeyboardDoubleArrowRight/>, 
            },
            {
                title: "Customer Group",
                path: "/admin/home/customer/customergroup",
                icons:<MdIcons.MdKeyboardDoubleArrowRight/>, 
            }
        ]
    },

]