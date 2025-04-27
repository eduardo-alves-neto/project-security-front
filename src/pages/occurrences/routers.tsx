import { RouteObject } from "react-router";
import { List } from "./list";
import { occurrenceRoutes } from "./constants/routes";
import { OccurrenceFormView } from "./forms";

export const routeOccurrences: RouteObject[] = [
  {
    path: "/",
    children: [
      { path: occurrenceRoutes.list(), element: <List /> },
      { path: occurrenceRoutes.create(), element: <OccurrenceFormView /> },
      { path: occurrenceRoutes.update(":id"), element: <OccurrenceFormView /> },
    ],
  },
];
