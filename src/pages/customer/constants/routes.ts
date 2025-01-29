export const customerRoutes = {
  list: () => "customers",
  create: () => "/customers/create",
  update: (id: string) => "/customers/update/" + id,
};
