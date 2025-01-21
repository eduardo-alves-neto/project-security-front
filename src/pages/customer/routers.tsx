import { RouteObject } from "react-router";
import { List } from ".";
import { routes } from "./constants/routes";
import { CustomerForm } from "./forms";

export const routeCustomers: RouteObject[] = [
  {
    path: "customers",
    children: [
      { path: routes["list"], element: <List /> },
      { path: routes["form"], element: <CustomerForm /> },
    ],
  },
];
