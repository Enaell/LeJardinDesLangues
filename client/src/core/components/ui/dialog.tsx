import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Backdrop>;

const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => (
  <DialogPrimitive.Backdrop
    data-slot="dialog-overlay"
    className={cn(
      'fixed inset-0 bg-black/50 z-50',
      'data-open:animate-in data-open:fade-in-0',
      'data-closed:animate-out data-closed:fade-out-0',
      className
    )}
    {...props}
  />
);

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Popup> & {
  hideCloseButton?: boolean;
};

const DialogContent = ({ className, children, hideCloseButton, ...props }: DialogContentProps) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />
    <DialogPrimitive.Popup
      data-slot="dialog-content"
      className={cn(
        'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
        'bg-background rounded-xl shadow-xl p-6 w-full max-w-md',
        'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
        'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
        className
      )}
      {...props}
    >
      {children}
      {!hideCloseButton && (
        <DialogPrimitive.Close
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Fermer"
        >
          <XIcon className="size-4" />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Popup>
  </DialogPrimitive.Portal>
);

type DialogTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <DialogPrimitive.Title
    data-slot="dialog-title"
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
);

type DialogDescriptionProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;

const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => (
  <DialogPrimitive.Description
    data-slot="dialog-description"
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
