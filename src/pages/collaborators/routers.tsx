import type { RouteObject } from "react-router"
import { List } from "./list"
import { collaboratorRoutes } from "./constants/routes"
import { CollaboratorFormView } from "./forms"

export const routeCollaborators: RouteObject[] = [
  {
    path: "/",
    children: [
      { path: collaboratorRoutes.list(), element: <List /> },
      { path: collaboratorRoutes.create(), element: <CollaboratorFormView /> },
      { path: collaboratorRoutes.update(":id"), element: <CollaboratorFormView /> },
    ],
  },
]
