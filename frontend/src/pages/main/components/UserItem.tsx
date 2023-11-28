import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronsLeftRight } from "lucide-react";
import { FC, useState } from "react";
import { useUser } from "./UserProvider";
import { Button } from "@/components/ui/button";
import { Logout } from "@/apis";
import { PostLogout } from "@/components/utils/helpers";
import { useNavigate } from "react-router-dom";

interface UserItemProps {}

const UserItem: FC<UserItemProps> = () => {
    const navigate = useNavigate()
    const {user} = useUser();
    const [logoutLoading, setLogoutLoading] = useState<boolean>(false)

    const handleLogout = () => {
        setLogoutLoading(true)
        Logout().then(() => {
            PostLogout()
        }).catch((err) => {
            console.log(err);
            PostLogout()
        })
        setLogoutLoading(false)
        navigate('/page')
    }
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <div role="button" className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
                <div className="gap-x-2 flex items-center max-w-[150px]">
                    <Avatar className="h-5 w-5">
                        <AvatarImage src={user?.picture} alt="main" referrerPolicy="no-referrer" />
                        <AvatarFallback>{user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-primary text-start line-clamp-1">{user?.username}&apos;s Notes</span>
                </div>
                <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
            <div className="flex flex-col space-y-4 p-2">
                <p className="text-xs font-medium leading-none text-muted-foreground">{user?.email}</p>
                <div className="flex items-center gap-x-2">
                    <div className="rounded-sm bg-secondary p-1">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.picture} alt="main-inside" referrerPolicy="no-referrer" />
                            <AvatarFallback>{user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm line-clamp-1">
                            {user?.username}&apos;s Notes
                        </p>
                    </div>
                </div>
            </div>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className="w-full ">
                <Button size={'sm'} isLoading={logoutLoading} variant={'custom'} onClick={handleLogout} >
                    Log out
                </Button>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
