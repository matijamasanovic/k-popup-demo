import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, CreditCard } from "lucide-react"

const footerLinks = {
  shop: [
    { name: "Noodles", href: "/category/noodles" },
    { name: "Spices", href: "/category/spices" },
    { name: "Sweets", href: "/category/sweets" },
    { name: "Drinks", href: "/category/drinks" },
    { name: "Teas", href: "/category/teas" },
  ],
  brands: [
    { name: "Shin Ramyun", href: "/brand/shin" },
    { name: "Buldak", href: "/brand/buldak" },
    { name: "Chapagetti", href: "/brand/chapagetti" },
    { name: "Jin Mild", href: "/brand/jin-mild" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faq" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Track Order", href: "/track" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-foreground rounded-xl flex items-center justify-center">
                <span className="text-primary font-bold text-lg">K</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-secondary-foreground">K-Popup</span>
                <span className="text-[10px] text-secondary-foreground/70 uppercase tracking-widest">Korean Food Store</span>
              </div>
            </Link>
            <p className="text-secondary-foreground/80 mb-6 max-w-xs text-sm leading-relaxed">
              Your one-stop shop for authentic Korean food. From ramen to snacks, we bring Korea&apos;s best to your doorstep.
            </p>
            
            {/* Contact info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-secondary-foreground/80">
                <MapPin className="w-4 h-4" />
                <span>123 K-Food Street, Seoul District</span>
              </div>
              <div className="flex items-center gap-2 text-secondary-foreground/80">
                <Phone className="w-4 h-4" />
                <span>+1 (234) 567-890</span>
              </div>
              <div className="flex items-center gap-2 text-secondary-foreground/80">
                <Mail className="w-4 h-4" />
                <span>hello@kpopup.com</span>
              </div>
            </div>
          </div>
          
          {/* Shop links */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Brands links */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Brands</h4>
            <ul className="space-y-2">
              {footerLinks.brands.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support links */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company links */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-secondary-foreground/70">
              © {new Date().getFullYear()} K-Popup. All rights reserved.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary-foreground/20 transition-colors"
                >
                  <social.icon className="w-4 h-4 text-secondary-foreground" />
                </a>
              ))}
            </div>
            
            {/* Payment methods */}
            <div className="flex items-center gap-2">
              <CreditCard className="w-8 h-5 text-secondary-foreground/70" />
              <span className="text-xs text-secondary-foreground/70">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
