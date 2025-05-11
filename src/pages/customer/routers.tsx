import { RouteObject } from "react-router";
import { List } from "./list";
import { customerRoutes } from "./constants/routes";
import { CustomerFormView } from "./forms";
import { ContractFormView } from "./list/views/contractForm";
import { SendEmailView } from "./list/views/SendEmailView";

export const routeCustomers: RouteObject[] = [
  {
    path: "/",
    children: [
      { path: customerRoutes.list(), element: <List /> },
      { path: customerRoutes.create(), element: <CustomerFormView /> },
      { path: customerRoutes.update(":id"), element: <CustomerFormView /> },
      { path: customerRoutes.contract(":id"), element: <ContractFormView /> },
      { path: customerRoutes.email(":id"), element: <SendEmailView /> },
    ],
  },
];
