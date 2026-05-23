import { Twitter, Linkedin, Mail, Github } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@core/components/ui/avatar";
import { Card, CardContent } from "@core/components/ui/card";

type SocialLink = {
  type: 'twitter' | 'linkedin' | 'email' | 'github';
  url: string;
};

type PersonCardProps = {
  name: string;
  role?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  socialLinks?: SocialLink[];
  className?: string;
};

const socialIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  email: Mail,
  github: Github,
};

const socialLabels = {
  twitter: 'Twitter',
  linkedin: 'LinkedIn',
  email: 'Email',
  github: 'GitHub',
};

export const PersonCard = ({
  name,
  role,
  avatarSrc,
  avatarFallback,
  socialLinks,
  className,
}: PersonCardProps) => {
  return (
    <Card className={cn('', className)}>
      <CardContent className="flex flex-col items-center gap-3 px-6 py-6 text-center">
        <Avatar className="size-16">
          {avatarSrc && <AvatarImage src={avatarSrc} alt={name} />}
          <AvatarFallback>
            {avatarFallback ?? name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <h3 className="font-heading text-base font-semibold">{name}</h3>
          {role && (
            <p className="text-sm text-muted-foreground">{role}</p>
          )}
        </div>
        {socialLinks && socialLinks.length > 0 && (
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => {
              const Icon = socialIcons[link.type];
              return (
                <a
                  key={link.type}
                  href={link.url}
                  aria-label={socialLabels[link.type]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
