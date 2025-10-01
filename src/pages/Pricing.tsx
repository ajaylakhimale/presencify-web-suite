import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import { CheckCircle2, ArrowRight, Sparkles, Plus } from "lucide-react";

interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
}

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const basePrice = 3999;
  
  const addons: Addon[] = [
    {
      id: "ecommerce",
      name: "E-commerce Integration",
      description: "Full online store with payment gateway, product management, and shopping cart",
      price: 2500,
    },
    {
      id: "cms",
      name: "Content Management System",
      description: "Easy-to-use admin panel to manage your website content without coding",
      price: 1200,
    },
    {
      id: "blog",
      name: "Blog & News Section",
      description: "Professional blog platform with categories, tags, and SEO optimization",
      price: 800,
    },
    {
      id: "booking",
      name: "Booking System",
      description: "Online appointment scheduling with calendar integration and notifications",
      price: 1800,
    },
    {
      id: "membership",
      name: "User Authentication & Membership",
      description: "Secure user accounts with login, registration, and member-only content",
      price: 1500,
    },
    {
      id: "multilingual",
      name: "Multi-language Support",
      description: "Support for multiple languages with easy language switching",
      price: 1000,
    },
    {
      id: "analytics",
      name: "Advanced Analytics Dashboard",
      description: "Custom analytics and reporting with detailed insights and metrics",
      price: 900,
    },
    {
      id: "api",
      name: "API Integration",
      description: "Connect with third-party services and external APIs",
      price: 1200,
    },
    {
      id: "custom-features",
      name: "Custom Features",
      description: "Tailored functionality specific to your business needs",
      price: 0, // Custom pricing
    },
  ];

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const calculateTotal = () => {
    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);
    return basePrice + addonsTotal;
  };

  const handleGetQuote = () => {
    const selectedAddonsList = selectedAddons.map(id => 
      addons.find(a => a.id === id)?.name
    ).filter(Boolean);
    
    // Store selections in sessionStorage to pass to contact page
    sessionStorage.setItem('pricing_selection', JSON.stringify({
      basePrice,
      addons: selectedAddonsList,
      total: calculateTotal(),
    }));
    
    navigate('/contact');
  };

  const baseFeatures = [
    "Up to 10 responsive pages",
    "Mobile-optimized design",
    "Professional custom design",
    "Basic SEO optimization",
    "Contact form integration",
    "Social media integration",
    "SSL certificate included",
    "Fast loading performance",
    "Cross-browser compatibility",
    "3 rounds of revisions",
    "60 days post-launch support",
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Flexible Pricing</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold">
              Build Your Perfect Website
            </h1>
            <p className="text-xl text-muted-foreground">
              Start with our professional website package and add the features you need
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Base Package */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-primary shadow-glow">
                <CardHeader className="text-center pb-8">
                  <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Professional Website</CardTitle>
                  <div className="mb-2">
                    <span className="text-5xl font-bold gradient-text">
                      ${basePrice.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-sm block mt-2">Base Package</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Everything you need for a professional online presence
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Included Features
                    </h4>
                    <ul className="space-y-3">
                      {baseFeatures.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="flex-col gap-4 pt-8">
                  <div className="w-full p-4 rounded-lg bg-muted/50 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Your Total</p>
                    <p className="text-3xl font-bold gradient-text">
                      ${calculateTotal().toLocaleString()}
                    </p>
                    {selectedAddons.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {selectedAddons.length} add-on{selectedAddons.length !== 1 ? 's' : ''} selected
                      </p>
                    )}
                  </div>
                  <Button 
                    variant="hero" 
                    className="w-full"
                    size="lg"
                    onClick={handleGetQuote}
                  >
                    Get Your Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Add-ons */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-6">
                  <Plus className="w-5 h-5 text-primary" />
                  <h3 className="text-2xl font-bold">Choose Your Add-ons</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Enhance your website with additional features tailored to your needs
                </p>

                <div className="grid gap-4">
                  {addons.map((addon) => (
                    <Card 
                      key={addon.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-card ${
                        selectedAddons.includes(addon.id) 
                          ? 'border-primary shadow-card' 
                          : 'border-border'
                      }`}
                      onClick={() => toggleAddon(addon.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Checkbox
                            checked={selectedAddons.includes(addon.id)}
                            onCheckedChange={() => toggleAddon(addon.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-lg">{addon.name}</h4>
                              {addon.price > 0 ? (
                                <span className="text-lg font-bold text-primary">
                                  +${addon.price.toLocaleString()}
                                </span>
                              ) : (
                                <span className="text-sm font-semibold text-accent">
                                  Custom Quote
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {addon.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="mt-20 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Ongoing Support & Maintenance</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Monthly Maintenance</h3>
                  <p className="text-muted-foreground mb-4">
                    Keep your website secure, updated, and performing at its best
                  </p>
                  <ul className="space-y-2 mb-4 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Regular security updates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Content updates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Performance monitoring
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Priority support
                    </li>
                  </ul>
                  <p className="text-2xl font-bold gradient-text">
                    From $299/month
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Website Redesign</h3>
                  <p className="text-muted-foreground mb-4">
                    Modernize your existing website with fresh design and functionality
                  </p>
                  <ul className="space-y-2 mb-4 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Complete design overhaul
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Mobile optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Content migration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      SEO improvements
                    </li>
                  </ul>
                  <p className="text-2xl font-bold gradient-text">
                    From $2,999
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 max-w-2xl mx-auto text-center p-8 rounded-2xl bg-muted/30">
            <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
            <p className="text-muted-foreground mb-6">
              Not sure which features you need? Our team can help you build the perfect package for your business.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Schedule a Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
