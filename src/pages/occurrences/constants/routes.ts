export const occurrenceRoutes = {
  list: () => "/occurrences",
  create: () => "/occurrences/create",
  update: (id: string) => "/occurrences/update/" + id,
};
