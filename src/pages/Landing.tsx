import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { 
  Sparkles, 
  Code, 
  Rocket, 
  Shield, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  Globe,
  Smartphone,
  Palette
} from "lucide-react";

const Landing = () => {
  const services = [
    {
      icon: Globe,
      title: "Professional Websites",
      description: "Stunning, responsive websites that perfectly represent your brand and engage your audience.",
    },
    {
      icon: Code,
      title: "Web Applications",
      description: "Custom web apps built with cutting-edge technology for optimal performance and user experience.",
    },
    {
      icon: Smartphone,
      title: "Online Software Tools",
      description: "B2B tools and SaaS solutions designed to streamline your business operations.",
    },
    {
      icon: Palette,
      title: "Website Redesign",
      description: "Modernize your existing website with fresh design and enhanced functionality.",
    },
  ];

  const features = [
    "Lightning-fast performance",
    "Mobile-first responsive design",
    "SEO optimized",
    "Secure & scalable architecture",
    "Ongoing support & maintenance",
    "Custom feature development",
  ];

  const stats = [
    { value: "500+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Team Members" },
    { value: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Your Digital Success Partner</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Build Your Digital
              <span className="gradient-text"> Presence</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We create professional websites, web applications, and online software tools that transform businesses and drive growth.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button variant="hero" size="xl">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="xl">
                  View Pricing
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="group hover:shadow-glow transition-all duration-300 border-primary/20">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">Why Choose Us</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold">
                  Built for Performance & Growth
                </h2>
                <p className="text-xl text-muted-foreground">
                  Every project is crafted with precision, powered by modern technology, and optimized for your success.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-glow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <Rocket className="w-24 h-24 mx-auto text-primary animate-float" />
                  <p className="text-2xl font-bold">Ready to Launch?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-8 p-12 rounded-2xl gradient-card shadow-glow">
            <Shield className="w-16 h-16 mx-auto text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join hundreds of satisfied clients who trust Presencify with their digital success.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button variant="hero" size="xl">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="xl">
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 Presencify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
