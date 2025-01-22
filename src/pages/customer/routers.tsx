import { RouteObject } from "react-router";
import { List } from "./list";
import { routes } from "./constants/routes";
import { CustomerFormView } from "./forms";

export const routeCustomers: RouteObject[] = [
  {
    path: "/",
    children: [
      { path: routes.list(), element: <List /> },
      { path: routes.create(), element: <CustomerFormView /> },
    ],
  },
];
