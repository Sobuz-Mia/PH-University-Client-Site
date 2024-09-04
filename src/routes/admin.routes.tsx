import { ReactNode } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import { NavLink } from "react-router-dom";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";

type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};

export const adminPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic-Management",
    children: [
      {
        name: "Create-A. Semester",
        path: "create-a.semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic-Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create-A. Faculty",
        path: "create-a.faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic-Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create-A. Department",
        path: "create-a.department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic-Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User-Management",
    children: [
      {
        name: "Create-Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Create-faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create-Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
    ],
  },
];

export const adminSidebarItems = adminPath.reduce(
  (acc: TSidebarItem[], item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }
    return acc;
  },
  []
);

// * Hard coded routes handle *//

// export const adminPaths = [
//   {
//     path: "dashboard",
//     element: <AdminDashboard />,
//   },
//   {
//     path: "create-student",
//     element: <CreateStudent />,
//   },
//   {
//     path: "create-admin",
//     element: <CreateAdmin />,
//   },
//   {
//     path: "create-faculty",
//     element: <CreateFaculty />,
//   },
// ];
