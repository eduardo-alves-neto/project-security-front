import { RouteObject } from "react-router";
import { List } from ".";

export const routeCustomers: RouteObject[] = [
  {
    path: "customers",
    children: [{ path: "list", element: <List /> }],
  },
];
