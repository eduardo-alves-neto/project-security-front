export const routes = {
  list: () => "customers",
  create: () => "/customers/create",
  update: (uuid: string) => "/customers/update/" + uuid,
};
