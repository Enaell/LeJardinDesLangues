import { buttonVariants } from '@core/components/ui/button';
import { Typography } from '@core/components/ui/typography';
import { XIcon, InstagramIcon } from '@core/icons';
import { cn } from '@/lib/utils';

const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Languages', href: '#languages' },
    { label: 'Pricing', href: '#' },
  ],
  company: [
    { label: 'About us', href: '#about' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-muted-dark text-foreground">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Typography variant="h5" className="text-foreground">
              🌿 LinguaGarden
            </Typography>
            <Typography variant="small" className="text-muted-foreground">
              Grow your language skills naturally.
            </Typography>
            <div className="flex items-center gap-2">
              <Typography variant="small" className="text-muted-foreground">
                Follow us
              </Typography>
              <a
                href="#"
                aria-label="Twitter / X"
                className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
              >
                <XIcon className="size-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
              >
                <InstagramIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-3">
            <Typography variant="small" className="font-semibold text-foreground uppercase tracking-wide">
              Product
            </Typography>
            {FOOTER_LINKS.product.map((link) => (
              <a key={link.label} href={link.href}>
                <Typography variant="small" className="text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Typography>
              </a>
            ))}
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <Typography variant="small" className="font-semibold text-foreground uppercase tracking-wide">
              Company
            </Typography>
            {FOOTER_LINKS.company.map((link) => (
              <a key={link.label} href={link.href}>
                <Typography variant="small" className="text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Typography>
              </a>
            ))}
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <Typography variant="small" className="font-semibold text-foreground uppercase tracking-wide">
              Support
            </Typography>
            {FOOTER_LINKS.support.map((link) => (
              <a key={link.label} href={link.href}>
                <Typography variant="small" className="text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Typography>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center">
          <Typography variant="small" className="text-muted-foreground">
            © {new Date().getFullYear()} LinguaGarden. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};
