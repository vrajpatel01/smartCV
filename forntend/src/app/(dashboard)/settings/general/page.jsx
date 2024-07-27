"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import GeneralSettingsBlock from "./components/generalSettingBlock";
import { PasswordInput } from "@/components/ui/password-input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";

export default function PersonalInfoScreen() {
  const { setTheme } = useTheme();
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  return (
    <div className="max-w-[800px] mx-auto space-y-5">
      <GeneralSettingsBlock
        title="General Settings"
        description="Update your personal information and Periodization"
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="John Doe" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="example@example.com" />
        </div>
        <div>
          <Label htmlFor="themeMode">Theme options</Label>
          <Select
            defaultValue="system"
            onValueChange={(value) => setTheme(value)}
          >
            <SelectTrigger>
              <SelectValue id="themeMode" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem defaultChecked={true} value="system">
                  System
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </GeneralSettingsBlock>
      <Separator />
      <GeneralSettingsBlock
        title="Update Password"
        description="Your new password should be at least 8 characters long and include a mix of uppercase and lowercase letters, numbers, and special characters."
      >
        <div>
          <Label htmlFor="oldPassword">Old Password</Label>
          <PasswordInput
            value={password.oldPassword}
            onChange={(e) =>
              setPassword({ ...password, oldPassword: e.target.value })
            }
            id="oldPassword"
            placeholder="••••••••"
          />
        </div>
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <PasswordInput
            value={password.newPassword}
            onChange={(e) =>
              setPassword({ ...password, newPassword: e.target.value })
            }
            id="newPassword"
            placeholder="••••••••"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <PasswordInput
            value={password.confirmPassword}
            onChange={(e) =>
              setPassword({ ...password, confirmPassword: e.target.value })
            }
            id="confirmPassword"
            placeholder="••••••••"
          />
        </div>
      </GeneralSettingsBlock>
      <Separator />
      <GeneralSettingsBlock title="Security" description="">
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <p>Two Factor Authentication</p>
            <Switch id="twoFactorAuth" />
          </div>
          <p className="text-muted-foreground text-sm">
            Enhance the security of your account by enabling Two-Factor
            Authentication. This adds an extra layer of protection by requiring
            a second form of verification in addition to your password.
          </p>
        </div>
      </GeneralSettingsBlock>
      {/* <GeneralSettingsBlock
                title="Security"
                description="">
                <div>
                    <div>
                        <p className="text-sm">Last accessed</p>
                        <p>7 seconds ago</p>
                    </div>

                    <p className="text-sm">Details</p>
                    <p>Mumbai, Maharashtra, India
                        <br />
                        (Approximate location)</p>

                    <p>MAC OS X</p>

                    <p>IP Address:</p>
                    <p>2409:40c1:102f:52ee:6824:d245:febf:4982</p>

                    <p>IP Address Owner:</p>
                    <p>Reliance Jio Infocomm Limited</p>
                </div>
            </GeneralSettingsBlock> */}
    </div>
  );
}
