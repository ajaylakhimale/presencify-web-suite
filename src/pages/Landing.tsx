import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { 
  Sparkles, 
  ArrowRight,
  Globe,
  Smartphone,
  Palette,
  Zap,
  Shield,
  Headphones,
  CheckCircle2,
  Code2,
  TrendingUp,
  Clock
} from "lucide-react";

const Landing = () => {
  const services = [
    {
      icon: Globe,
      title: "Professional Websites",
      description: "Beautiful, high-converting websites that make lasting impressions on your audience.",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading"],
    },
    {
      icon: Smartphone,
      title: "Web Applications",
      description: "Custom web apps that streamline operations and drive business growth.",
      features: ["Cloud-Based", "Scalable", "Secure"],
    },
    {
      icon: Code2,
      title: "B2B Software Tools",
      description: "Powerful business tools designed to automate and enhance productivity.",
      features: ["API Integration", "Custom Features", "24/7 Uptime"],
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery Call",
      description: "We learn about your business, goals, and vision to create the perfect solution.",
    },
    {
      step: "02",
      title: "Design & Planning",
      description: "Our team crafts a custom design and development roadmap tailored to your needs.",
    },
    {
      step: "03",
      title: "Development",
      description: "We build your project with cutting-edge technology and best practices.",
    },
    {
      step: "04",
      title: "Launch & Support",
      description: "Go live with confidence, backed by our ongoing support and maintenance.",
    },
  ];

  const testimonials = [
    {
      quote: "Presencify transformed our online presence. The team delivered beyond expectations!",
      author: "Sarah Johnson",
      role: "CEO, TechStart Inc",
    },
    {
      quote: "Professional, fast, and exactly what we needed. Highly recommend their services.",
      author: "Michael Chen",
      role: "Founder, Digital Solutions",
    },
    {
      quote: "The website they built doubled our conversion rate. Best investment we made.",
      author: "Emily Rodriguez",
      role: "Marketing Director",
    },
  ];

  const benefits = [
    { icon: Zap, text: "Lightning-Fast Delivery" },
    { icon: Shield, text: "Enterprise-Grade Security" },
    { icon: TrendingUp, text: "Conversion Optimized" },
    { icon: Headphones, text: "Dedicated Support Team" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section - Enhanced */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Trusted by Growing Businesses</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight tracking-tight">
              Your Digital Success
              <span className="block gradient-text mt-2">Starts Here</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We create stunning websites and powerful web applications that turn visitors into customers. Professional, affordable, and built to scale with your business.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link to="/pricing">
                <Button variant="hero" size="xl" className="text-lg">
                  View Pricing & Features
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="xl" className="text-lg">
                  Schedule Free Consultation
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.text} className="flex flex-col items-center gap-2">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-center">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              What We Build
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive digital solutions designed to elevate your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="group hover:shadow-glow transition-all duration-300 border-primary/20 bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold mb-3">{service.title}</h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                    </div>
                    <div className="space-y-2 pt-4 border-t border-border">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section - New */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Our Proven Process
            </h2>
            <p className="text-xl text-muted-foreground">
              From concept to launch, we guide you every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={item.step} className="relative">
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-1/2" />
                )}
                <Card className="h-full hover:shadow-card transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="text-5xl font-display font-bold gradient-text">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-display font-bold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real results from businesses like yours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-glow transition-all duration-300 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-8 space-y-4">
                  <div className="text-4xl text-primary opacity-20">"</div>
                  <p className="text-lg leading-relaxed">{testimonial.quote}</p>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <Card className="gradient-hero text-white border-0 shadow-glow overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
            <CardContent className="p-12 md:p-16 text-center relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Limited Slots Available</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                Ready to Build Your Dream Website?
              </h2>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join innovative businesses transforming their digital presence. Get started today with flexible pricing and expert support.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Link to="/pricing">
                  <Button variant="secondary" size="xl" className="text-lg bg-white text-primary hover:bg-white/90">
                    View Pricing
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="xl" className="text-lg border-white text-white hover:bg-white/10">
                    Book Free Consultation
                  </Button>
                </Link>
              </div>

              <div className="pt-8 flex items-center justify-center gap-2 text-sm text-white/80">
                <CheckCircle2 className="w-4 h-4" />
                <span>No commitment required</span>
                <span className="text-white/40">•</span>
                <CheckCircle2 className="w-4 h-4" />
                <span>Free project quote</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-6 h-6 text-primary" />
              <span className="text-lg font-display font-bold gradient-text">Presencify</span>
            </div>
            <p className="text-muted-foreground text-center">&copy; 2025 Presencify. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
