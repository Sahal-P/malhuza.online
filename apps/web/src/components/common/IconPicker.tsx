import EmojiPicker, { EmojiStyle, Theme } from "emoji-picker-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import React, { FC } from "react";
import { useTheme } from "./ThemeProvider";

interface IconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
}

const IconPicker: FC<IconPickerProps> = ({ onChange, children, asChild }) => {
  const { theme: appTheme } = useTheme();
  const themeMap = {
    light: Theme.LIGHT,
    dark: Theme.DARK,
    system: Theme.AUTO,
  };
  const currentTheme = (appTheme || "dark") as keyof typeof themeMap;
  const theme = themeMap[currentTheme];
  const style = EmojiStyle.APPLE;
  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none" >
        <EmojiPicker
          emojiStyle={style}
          height={350}
          theme={theme}
          onEmojiClick={(data) => onChange(data.unified)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
