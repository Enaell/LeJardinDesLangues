import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@core/components/ui/avatar";
import { Card, CardContent } from "@core/components/ui/card";
import { Separator } from "@core/components/ui/separator";
import { StarRating } from "@core/components/ui/star-rating";

type TestimonialCardProps = {
  quote: string;
  authorName: string;
  authorRole?: string;
  authorAvatarSrc?: string;
  rating?: number;
  className?: string;
};

export const TestimonialCard = ({
  quote,
  authorName,
  authorRole,
  authorAvatarSrc,
  rating,
  className,
}: TestimonialCardProps) => {
  return (
    <Card className={cn('', className)}>
      <CardContent className="flex flex-col gap-4 px-6 py-5">
        {/* Quote mark */}
        <span
          aria-hidden
          className="text-4xl font-bold leading-none text-primary/30 select-none"
        >
          "
        </span>

        {/* Quote text */}
        <p className="text-sm italic text-foreground leading-relaxed -mt-3">
          {quote}
        </p>

        {/* Rating */}
        {rating !== undefined && (
          <StarRating value={rating} readonly size="sm" />
        )}

        <Separator />

        {/* Author */}
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            {authorAvatarSrc && (
              <AvatarImage src={authorAvatarSrc} alt={authorName} />
            )}
            <AvatarFallback>
              {authorName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{authorName}</span>
            {authorRole && (
              <span className="text-xs text-muted-foreground">{authorRole}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
