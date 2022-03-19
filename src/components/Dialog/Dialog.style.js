import { styled } from "@mui/material/styles";
import styledComponent from "styled-components";
import Dialog from "@mui/material/Dialog";

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
}));

export const contentWrapper = styledComponent.div``;
