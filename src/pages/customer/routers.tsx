import { RouteObject } from "react-router";
import { List } from "./list";
import { customerRoutes } from "./constants/routes";
import { CustomerFormView } from "./forms";

export const routeCustomers: RouteObject[] = [
  {
    path: "/",
    children: [
      { path: customerRoutes.list(), element: <List /> },
      { path: customerRoutes.create(), element: <CustomerFormView /> },
      { path: customerRoutes.update(":id"), element: <CustomerFormView /> },
    ],
  },
];
