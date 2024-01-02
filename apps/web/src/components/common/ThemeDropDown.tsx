/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Moon,
    Sun,
    SunMoon,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useTheme } from "./ThemeProvider"
  
  export function ThemeDropDown() {
    const { setTheme } = useTheme()
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={"sm"}>Theme</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4"  />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("light")} >
              <Sun className="mr-2 h-4 w-4"/>
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <SunMoon className="mr-2 h-4 w-4"/>
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  