export const collaboratorRoutes = {
  list: () => "collaborators",
  create: () => "/collaborators/create",
  update: (id: string) => "/collaborators/update/" + id,
}
