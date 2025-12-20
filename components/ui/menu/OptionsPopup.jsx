"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  ListItemButton,
  ListItemText,
  Divider,
  Slide,
  ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaEdit, FaTrashAlt, FaFlag } from "react-icons/fa";
import { useLogin } from "@/Context/logincontext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// --- Base Dialog Style ---
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 16,
    width: 260,
    background: theme.palette.mode === "dark"
      ? "linear-gradient(135deg, #1f2937, #111827)"
      : "linear-gradient(135deg, #f9fafb, #f3f4f6)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    border: theme.palette.mode === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
    padding: theme.spacing(0.5, 0),
  },
}));

// --- Common Item Style ---
const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 10,
  margin: "4px 8px",
  display: "flex",
  alignItems: "center",
  transition: "background-color 0.2s ease, transform 0.15s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
  "& .MuiListItemText-primary": {
    fontWeight: 500,
    fontFamily: "Inter, Poppins, sans-serif",
    fontSize: "0.95rem",
  },
  "& .MuiListItemIcon-root": {
    minWidth: 36,
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
  },
}));

export default function OptionsPopup({ open, onClose, onEdit, onDelete, onReport }) {
  const { user } = useLogin();

  return (
    <>
      {user && (
        <StyledDialog
          open={open}
          onClose={onClose}
          keepMounted
          TransitionComponent={Transition}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <DialogContent sx={{ p: 0 }}>
            {/* ✏️ EDIT - Professional Blue */}
            <StyledListItem
              onClick={onEdit}
              sx={{
                "& .MuiListItemIcon-root": { color: "#2563eb" }, // blue
                "& .MuiListItemText-primary": { color: "#1e3a8a" },
                "&:hover": { backgroundColor: "#dbeafe" }, // light blue hover
              }}
            >
              <ListItemIcon>
                <FaEdit />
              </ListItemIcon>
              <ListItemText primary="Edit Post" />
            </StyledListItem>

            <Divider variant="middle" />

            {/* 🚩 REPORT - Amber/Orange */}
            <StyledListItem
              onClick={onReport}
              sx={{
                "& .MuiListItemIcon-root": { color: "#d97706" }, // amber
                "& .MuiListItemText-primary": { color: "#92400e" },
                "&:hover": { backgroundColor: "#fef3c7" }, // light amber hover
              }}
            >
              <ListItemIcon>
                <FaFlag />
              </ListItemIcon>
              <ListItemText primary="Report Post" />
            </StyledListItem>

            <Divider variant="middle" />

            {/* 🗑️ DELETE - Red (danger) */}
            <StyledListItem
              onClick={onDelete}
              sx={{
                "& .MuiListItemIcon-root": { color: "#dc2626" }, // red
                "& .MuiListItemText-primary": { color: "#991b1b" },
                "&:hover": { backgroundColor: "#fee2e2" }, // light red hover
              }}
            >
              <ListItemIcon>
                <FaTrashAlt />
              </ListItemIcon>
              <ListItemText primary="Delete Post" />
            </StyledListItem>
          </DialogContent>
        </StyledDialog>
      )}
    </>
  );
}
