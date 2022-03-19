import React, { useContext } from "react";
import PropTypes from "prop-types";
import DialogContent from "@mui/material/DialogContent";
import DialogHeader from "./DialogHeader";
import { StyledDialog } from "./Dialog.style";
import themeContext from "../../themeContext";

export default function CustomizedDialog({
  modalTitle,
  children,
  isOpen,
  onClose,
  ariaLabel,
  fullScreen,
  maxWidth,
}) {
  const { isThemeDark } = useContext(themeContext);

  return (
    <StyledDialog
      className={isThemeDark ? "theme-dark" : "theme-light"}
      onClose={onClose}
      aria-labelledby={ariaLabel}
      open={isOpen}
      fullScreen={fullScreen}
      maxWidth={maxWidth}
    >
      {modalTitle && (
        <DialogHeader id={ariaLabel} onClose={onClose}>
          {modalTitle}
        </DialogHeader>
      )}
      <DialogContent dividers>{children}</DialogContent>
      {/* TODO if needed
         <DialogActions>
         </DialogActions> */}
    </StyledDialog>
  );
}

CustomizedDialog.propTypes = {
  modalTitle: PropTypes.node,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  fullScreen: PropTypes.bool,
  maxWidth: PropTypes.string,
};

CustomizedDialog.defaultProps = {
  modalTitle: "",
  ariaLabel: "Modal",
  fullScreen: false,
  maxWidth: "md",
};
