import * as React from "react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@core/components/ui/card";

type FeatureCardProps = {
  image?: string | React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};

export const FeatureCard = ({
  image,
  title,
  description,
  className,
  children,
}: FeatureCardProps) => {
  return (
    <Card
      className={cn(
        'transition-shadow duration-200 hover:shadow-md',
        className
      )}
    >
      {image && (
        <div className="w-full overflow-hidden rounded-t-xl">
          {typeof image === 'string' ? (
            <img
              src={image}
              alt=""
              className="h-48 w-full object-cover"
            />
          ) : (
            <div className="flex h-48 w-full items-center justify-center bg-muted">
              {image}
            </div>
          )}
        </div>
      )}
      <CardContent className="flex flex-col items-center gap-2 px-6 py-4 text-center">
        <h3 className="font-heading text-lg font-semibold leading-snug">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {children}
      </CardContent>
    </Card>
  );
};
