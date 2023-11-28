import { Button } from "@/components/ui/button";
import { FC } from "react";
import { Link } from "react-router-dom";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className="flex items-center w-full p-6 bg-background dark:bg-document_bg z-50 fixed bottom-0">
        <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
            <Link to={'/PrivacyPolicy'}><Button variant={'ghost'} size={'sm'}>Privacy Policy</Button></Link>
            <Link to={'/Terms&Conditions'}><Button variant={'ghost'} size={'sm'}>Terms & Conditions</Button></Link>
        </div>
    </div>
  );
};

export default Footer;
