"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
   // const { setTheme } = useTheme()
   const { theme, setTheme } = useTheme()

   const toggleTheme = () => {
      switch (theme) {
         case "light":
            setTheme("dark")
            break
         case "dark":
            setTheme("light")
            break
         default:
            setTheme("dark")
            break
      }
   }

   return (
      <Button variant="ghost" size="icon" onClick={toggleTheme}>
         <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100" />
         <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:rotate-0 dark:scale-0" />
         <span className="sr-only">Toggle theme</span>
      </Button>
      // <button
      //    onClick={toggleTheme}
      //    className="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      //    aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      // >
      //    {isDark ? (
      //       <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      //    ) : (
      //       <Moon className="h-5 w-5 text-gray-500" />
      //    )}
      // </button>
      // <DropdownMenu>
      //    <DropdownMenuTrigger asChild>
      //       <Button variant="outline" size="icon">
      //          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      //          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      //          <span className="sr-only">Toggle theme</span>
      //       </Button>
      //    </DropdownMenuTrigger>
      //    <DropdownMenuContent align="end">
      //       <DropdownMenuItem onClick={() => setTheme("light")}>
      //          Light
      //       </DropdownMenuItem>
      //       <DropdownMenuItem onClick={() => setTheme("dark")}>
      //          Dark
      //       </DropdownMenuItem>
      //    </DropdownMenuContent>
      // </DropdownMenu>
   )
}