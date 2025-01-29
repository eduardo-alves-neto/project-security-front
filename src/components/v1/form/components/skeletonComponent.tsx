import { Skeleton, Stack } from "@mui/material";

export const SkeletonComponent = () => {
  return (
    <Stack gap={1}>
      <Skeleton variant="rounded" height={50} animation={"wave"} />
      <Skeleton variant="rounded" height={50} animation={"wave"} />
      <Skeleton variant="rounded" height={50} animation={"wave"} />
    </Stack>
  );
};
