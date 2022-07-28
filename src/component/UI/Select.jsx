import * as SelectPrimitive from "@radix-ui/react-select";
import { styled } from "@stitches/react";

export const SelectTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 13,
  lineHeight: 1,
  height: 35,
  gap: 5,
  backgroundColor: "white",
  color: "black",
  border: "1px solid black",
  span: { color: "Black" },
  "&:hover": { backgroundColor: "rgba(9, 11, 15, 0.15)", cursor: "pointer" },
  "&:focus": { boxShadow: `0 0 0 2px black` },
  "&[data-placeholder]": { color: "rgba(9, 11, 15, 0.15)" },
});

export const SelectIcon = styled(SelectPrimitive.SelectIcon, {
  color: "AliceBlue",
});

export const SelectContent = styled(SelectPrimitive.Content, {
  overflow: "hidden",
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
});

export const SelectViewport = styled(SelectPrimitive.Viewport, {
  padding: 5,
  backgroundColor: "white",
});

export const SelectItem = styled(SelectPrimitive.Item, {
  all: "unset",
  fontSize: 13,
  lineHeight: 1,
  color: "black",
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 35px 0 25px",
  position: "relative",
  userSelect: "none",

  "&[data-disabled]": {
    color: "grey",
    pointerEvents: "none",
  },

  "&[data-highlighted]": {
    backgroundColor: "rgba(9, 11, 15, 0.15)",
    color: "black",
    cursor: "pointer",
  },
});

export const SelectItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

export const scrollButtonStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 25,
  backgroundColor: "white",
  color: "AliceBlue",
  cursor: "default",
};

export const SelectScrollUpButton = styled(
  SelectPrimitive.ScrollUpButton,
  scrollButtonStyles
);

export const SelectScrollDownButton = styled(
  SelectPrimitive.ScrollDownButton,
  scrollButtonStyles
);
