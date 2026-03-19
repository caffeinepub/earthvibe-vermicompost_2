import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  Instagram,
  Leaf,
  Mail,
  Menu,
  Package,
  Phone,
  ShoppingCart,
  Smile,
  Sprout,
  Star,
  TreePine,
  Truck,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitInquiry } from "./hooks/useQueries";

const queryClient = new QueryClient();

const PRODUCTS = [
  {
    id: 1n,
    name: "Starter Pack",
    weight: "1 kg",
    mrp: 300,
    price: 150,
    image: "/assets/uploads/1773907105449-1.png",
    badge: "1 kg",
    popular: false,
    desc: "Perfect for home pots & small gardens",
  },
  {
    id: 2n,
    name: "Family Pack",
    weight: "5 kg",
    mrp: 390,
    price: 320,
    image: "/assets/uploads/1773908231636-3.png",
    badge: "5 kg",
    popular: true,
    desc: "Ideal for kitchen gardens & raised beds",
  },
  {
    id: 3n,
    name: "Garden Pro",
    weight: "10 kg",
    mrp: 690,
    price: 600,
    image: "/assets/uploads/1773908908861-1-1.png",
    badge: "10 kg",
    popular: false,
    desc: "Best value for larger gardens & farms",
  },
];

const BENEFITS = [
  {
    icon: <Leaf className="w-7 h-7" />,
    title: "100% Organic & Natural",
    desc: "No chemicals, no additives. Just pure worm castings harvested from healthy earthworms fed on organic matter.",
  },
  {
    icon: <FlaskConical className="w-7 h-7" />,
    title: "Rich in Nutrients",
    desc: "Packed with nitrogen, phosphorus, potassium, and beneficial microbes that plants crave for vigorous growth.",
  },
  {
    icon: <Sprout className="w-7 h-7" />,
    title: "Healthier Soil & Plants",
    desc: "Improves soil structure, boosts water retention, and enhances root development for stronger, greener plants.",
  },
];

const STEPS = [
  {
    icon: <Package className="w-8 h-8" />,
    step: "01",
    title: "Choose Your Pack",
    desc: "Select the right size for your garden — from 1 kg starter packs to 10 kg bulk orders.",
  },
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    step: "02",
    title: "Place Your Order",
    desc: "Fill in the inquiry form or reach us directly via phone, email, or Instagram.",
  },
  {
    icon: <Truck className="w-8 h-8" />,
    step: "03",
    title: "We Deliver",
    desc: "Fresh vermicompost packed carefully and delivered right to your doorstep.",
  },
  {
    icon: <Smile className="w-8 h-8" />,
    step: "04",
    title: "Grow Happily",
    desc: "Watch your plants thrive with the power of nature's best organic fertiliser.",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {["s1", "s2", "s3", "s4", "s5"].map((k) => (
        <Star key={k} className="w-4 h-4 fill-brand-gold text-brand-gold" />
      ))}
    </div>
  );
}

function Header({ onOrderClick }: { onOrderClick: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#products", label: "Products" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2"
          data-ocid="nav.link"
        >
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-primary">
            EarthVibe
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            onClick={onOrderClick}
            className="hidden md:flex bg-primary hover:bg-primary/90 text-white rounded-full px-5"
            data-ocid="nav.primary_button"
          >
            Order Now
          </Button>
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-border bg-white"
          >
            <nav className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-foreground/70 hover:text-primary py-1 transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  onOrderClick();
                }}
                className="mt-2 bg-primary hover:bg-primary/90 text-white rounded-full"
                data-ocid="nav.primary_button"
              >
                Order Now
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ onOrderClick }: { onOrderClick: () => void }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.44 0.098 138) 0%, oklch(0.36 0.085 138) 50%, oklch(0.30 0.07 138) 100%)",
      }}
    >
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
        style={{
          background: "oklch(0.7 0.1 100)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
        style={{
          background: "oklch(0.7 0.1 100)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
        <motion.div
          className="flex-1 text-white text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5">
            <Leaf className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-medium text-white/90">
              100% Organic Vermicompost
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 text-balance">
            Feed Your Soil,
            <br />
            <span className="text-brand-gold italic">Grow Your Plants</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0">
            Premium organic vermicompost crafted from nature's finest worm
            castings. Give your plants the nutrition they deserve.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Button
              onClick={onOrderClick}
              size="lg"
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-dark font-semibold rounded-full px-7 shadow-lg"
              data-ocid="hero.primary_button"
            >
              Order Now <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/40 text-white bg-white/10 hover:bg-white/20 rounded-full px-7 backdrop-blur-sm"
              data-ocid="hero.secondary_button"
            >
              <a href="#products">View Products</a>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-4 justify-center md:justify-start">
            <StarRating />
            <span className="text-white/70 text-sm">
              Trusted by 500+ happy gardeners
            </span>
          </div>
        </motion.div>

        <motion.div
          className="flex-shrink-0 w-64 md:w-80"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-30"
              style={{ background: "oklch(0.7 0.14 100)" }}
            />
            <img
              src="/assets/uploads/1773908908861-1-1.png"
              alt="EarthVibe 10kg Vermicompost"
              className="relative w-full drop-shadow-2xl object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhyEarthVibe() {
  return (
    <section id="about" className="bg-brand-tint py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Our Promise
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Why EarthVibe?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            We believe in the power of nature. Our vermicompost is produced with
            care and delivered fresh to your doorstep.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              className="bg-white rounded-xl p-6 shadow-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Products({
  onOrderClick,
}: { onOrderClick: (productId?: bigint) => void }) {
  return (
    <section id="products" className="py-16 md:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Our Products
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Choose Your Pack
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Available in three convenient sizes. Special introductory prices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id.toString()}
              className={`relative bg-white rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden flex flex-col ${
                product.popular ? "ring-2 ring-primary" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`products.item.${i + 1}`}
            >
              {product.popular && (
                <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  Best Seller
                </div>
              )}
              <div className="relative bg-brand-tint px-6 pt-8 pb-4 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={`EarthVibe ${product.weight} vermicompost`}
                  className="w-40 h-40 object-contain drop-shadow-lg"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-primary font-bold text-sm">
                    {product.badge}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display font-bold text-lg text-foreground">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-1 mb-3">
                  {product.desc}
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-primary">
                    ₹{product.price}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    / {product.weight}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-muted-foreground line-through">
                    MRP ₹{product.mrp}
                  </span>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    {Math.round(
                      ((product.mrp - product.price) / product.mrp) * 100,
                    )}
                    % off
                  </span>
                </div>
                <Button
                  onClick={() => onOrderClick(product.id)}
                  className="mt-auto bg-primary hover:bg-primary/90 text-white rounded-full w-full"
                  data-ocid={`products.primary_button.${i + 1}`}
                >
                  Order Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="bg-brand-tint py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Simple Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            How It Works
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              className="relative bg-white rounded-xl p-6 shadow-card text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-1/3 -right-3 z-10">
                  <ChevronRight className="w-5 h-5 text-primary/40" />
                </div>
              )}
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                {step.icon}
              </div>
              <div className="text-primary font-bold text-xs tracking-widest mb-2">
                STEP {step.step}
              </div>
              <h3 className="font-display font-bold text-base text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({
  defaultProduct,
  formRef,
}: {
  defaultProduct?: bigint;
  formRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [productId, setProductId] = useState<string>(
    defaultProduct ? defaultProduct.toString() : "",
  );
  const [message, setMessage] = useState("");
  const { mutate: submitInquiry, isPending } = useSubmitInquiry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !productId) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submitInquiry(
      { name: name.trim(), phone: phone.trim(), productId: BigInt(productId) },
      {
        onSuccess: () => {
          toast.success("Inquiry submitted! We'll contact you shortly. 🌱");
          setName("");
          setPhone("");
          setProductId("");
          setMessage("");
        },
        onError: () => {
          toast.error("Something went wrong. Please try again.");
        },
      },
    );
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            Order & Inquiries
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Ready to grow? Fill the form or reach out directly. We respond
            within 24 hours.
          </p>
        </motion.div>

        <div ref={formRef} className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            className="bg-white rounded-xl shadow-card p-6 md:p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-ocid="contact.panel"
          >
            <h3 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-primary" />
              Send an Inquiry
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">
                  Your Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                  data-ocid="contact.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="e.g. 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  required
                  data-ocid="contact.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="product">
                  Product Size <span className="text-destructive">*</span>
                </Label>
                <Select value={productId} onValueChange={setProductId}>
                  <SelectTrigger id="product" data-ocid="contact.select">
                    <SelectValue placeholder="Select a pack size" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCTS.map((p) => (
                      <SelectItem key={p.id.toString()} value={p.id.toString()}>
                        {p.weight} — ₹{p.price} (MRP ₹{p.mrp})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Message (optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Anything else you'd like to share..."
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  data-ocid="contact.textarea"
                />
              </div>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full mt-2"
                data-ocid="contact.submit_button"
              >
                {isPending ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </form>
          </motion.div>

          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-card p-6 md:p-8">
              <h3 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                <TreePine className="w-5 h-5 text-primary" />
                Contact Us
              </h3>
              <div className="space-y-5">
                <a
                  href="tel:9236102943"
                  className="flex items-center gap-4 group"
                  data-ocid="contact.link"
                >
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Phone
                    </div>
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      +91 9236102943
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:_earthvibevermicompost@gmail.com"
                  className="flex items-center gap-4 group"
                  data-ocid="contact.link"
                >
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Email
                    </div>
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm truncate">
                      _earthvibevermicompost@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://instagram.com/_earthvibevermicompost"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                  data-ocid="contact.link"
                >
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Instagram
                    </div>
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      @_earthvibevermicompost
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-brand-tint rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">
                  Why order from us?
                </span>
              </div>
              <ul className="space-y-2">
                {[
                  "Fresh stock harvested weekly",
                  "Doorstep delivery available",
                  "Bulk discounts on 10kg+",
                  "Expert growing tips included",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Leaf className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-brand-gold" />
              </div>
              <span className="font-display font-bold text-xl">EarthVibe</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Premium organic vermicompost for healthier plants and richer soil.
              Nature's best fertiliser, delivered to you.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/90">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Products", "About", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                    data-ocid="footer.link"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/90">Follow Us</h4>
            <a
              href="https://instagram.com/_earthvibevermicompost"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 text-sm transition-colors"
              data-ocid="footer.link"
            >
              <Instagram className="w-4 h-4" />
              @_earthvibevermicompost
            </a>
            <div className="mt-5">
              <div className="text-white/40 text-xs mb-2">Contact</div>
              <a
                href="tel:9236102943"
                className="block text-white/70 hover:text-white text-sm transition-colors"
                data-ocid="footer.link"
              >
                +91 9236102943
              </a>
              <a
                href="mailto:_earthvibevermicompost@gmail.com"
                className="block text-white/70 hover:text-white text-sm transition-colors mt-1 truncate"
                data-ocid="footer.link"
              >
                _earthvibevermicompost@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-white/40">
          <p>© {year} EarthVibe Vermicompost. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/70 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function AppContent() {
  const contactRef = useRef<HTMLDivElement | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<bigint | undefined>(
    undefined,
  );

  const scrollToContact = (productId?: bigint) => {
    if (productId !== undefined) setSelectedProduct(productId);
    setTimeout(() => {
      contactRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOrderClick={() => scrollToContact()} />
      <main className="flex-1">
        <Hero onOrderClick={() => scrollToContact()} />
        <WhyEarthVibe />
        <Products onOrderClick={scrollToContact} />
        <HowItWorks />
        <Contact defaultProduct={selectedProduct} formRef={contactRef} />
      </main>
      <Footer />
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
