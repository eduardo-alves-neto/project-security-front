export const customerRoutes = {
  list: () => "customers",
  create: () => "/customers/create",
  update: (id: string) => "/customers/update/" + id,
  contract: (id: string) => "/customers/contract/" + id,
  email: (id: string) => "/customers/email/" + id,
};
