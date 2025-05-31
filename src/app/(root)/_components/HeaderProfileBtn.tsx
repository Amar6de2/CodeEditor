"use client";
import LoginButton from "@/components/LoginButton";
import { SignedOut, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

function HeaderProfileBtn() {
  return (
    <>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="mt-3" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>

     <div className="mb-4">
      <SignedOut >
        <LoginButton />
      </SignedOut>
      </div>
    </>
  );
}
export default HeaderProfileBtn;
