import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  PaletteColorOptions,
  Stack,
  Typography,
} from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { useSettings } from "../../../contexts/settingsContext";
import { Link as MuiLink } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { FcHome } from "react-icons/fc";

interface ITitle {
  title: string;
  buttonTitle?: string;
  breadcrumbs?: { label: string; path?: string | number }[];
  onNewRegisterNavigate?: () => void;
}

export const Title = ({
  title,
  buttonTitle,
  breadcrumbs,
  onNewRegisterNavigate,
}: ITitle) => {
  const { isMobile } = useSettings();
  const navigate = useNavigate();

  return (
    <>
      <Stack
        mb={0.5}
        pt={0.4}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="start" flexDirection="column">
          <Stack
            flexDirection={isMobile ? "column" : "row"}
            alignItems="center"
            justifyContent={"center"}
          >
            <Box>
              <Breadcrumbs aria-label="breadcrumb-title" separator="|">
                <MuiLink
                  variant="subtitle2"
                  color="inherit"
                  to={"/home"}
                  component={Link}
                >
                  <FcHome fontSize={22} />
                </MuiLink>
                {!isMobile && <Divider orientation="vertical" flexItem />}
              </Breadcrumbs>
            </Box>

            <Box>
              <Breadcrumbs aria-label="breadcrumb-title" separator="/">
                {breadcrumbs?.map((breadcrumb, index) => {
                  let lastIndexBreadcrumbs = breadcrumbs.length - 1;
                  let isDisable = index === lastIndexBreadcrumbs;

                  return (
                    <MuiLink
                      key={index}
                      color="inherit"
                      variant="subtitle2"
                      disabled={isDisable}
                      component={"button"}
                      onClick={() => navigate(breadcrumb.path as string)}
                      sx={{
                        fontSize: "0.9rem",
                        minHeight: 30,
                        textDecoration: "none",
                        cursor: isDisable ? "not-allowed" : "pointer",
                      }}
                    >
                      {breadcrumb.label}
                    </MuiLink>
                  );
                })}
              </Breadcrumbs>
            </Box>
          </Stack>

          <Typography fontSize={29} fontWeight="bold">
            {!isMobile ? title : ""}
          </Typography>
        </Box>

        <Box>
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              fontSize: "0.8rem",
              padding: "8px 10px",
              boxShadow: "none",
              backgroundColor: (theme) =>
                theme.palette.primary["200" as keyof PaletteColorOptions],
            }}
            onClick={onNewRegisterNavigate}
            startIcon={<IoMdAdd />}
          >
            {buttonTitle && buttonTitle?.length > 18
              ? `${buttonTitle?.slice(0, 18)}...`
              : buttonTitle ?? "Adicionar"}
          </Button>
        </Box>
      </Stack>
    </>
  );
};
