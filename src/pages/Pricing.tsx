import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$2,999",
      description: "Perfect for small businesses and startups",
      features: [
        "5-page responsive website",
        "Mobile-optimized design",
        "Basic SEO optimization",
        "Contact form integration",
        "2 rounds of revisions",
        "30 days support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: "$5,999",
      description: "Ideal for growing businesses",
      features: [
        "10-page responsive website",
        "Custom design & branding",
        "Advanced SEO optimization",
        "CMS integration",
        "E-commerce functionality",
        "Analytics setup",
        "4 rounds of revisions",
        "90 days support",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large-scale applications",
      features: [
        "Unlimited pages",
        "Custom web application",
        "API integrations",
        "Advanced features",
        "Database design",
        "User authentication",
        "Unlimited revisions",
        "1 year support",
        "Dedicated project manager",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Transparent Pricing</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-muted-foreground">
              Flexible pricing options designed to match your business needs and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.popular 
                    ? "border-primary shadow-glow scale-105" 
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-hero text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className="text-center pb-8 pt-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground"> / project</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-8">
                  <Link to="/contact" className="w-full">
                    <Button 
                      variant={plan.popular ? "hero" : "outline"} 
                      className="w-full"
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Additional Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Website Maintenance</h3>
                  <p className="text-muted-foreground mb-4">
                    Keep your website secure, updated, and running smoothly
                  </p>
                  <p className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
                    Starting at $299/month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Feature Development</h3>
                  <p className="text-muted-foreground mb-4">
                    Add new features and functionality to your existing website
                  </p>
                  <p className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
                    Starting at $150/hour
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Note */}
          <div className="mt-16 max-w-2xl mx-auto text-center p-8 rounded-2xl bg-muted/30">
            <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-muted-foreground mb-6">
              Every project is unique. Contact us to discuss your specific requirements and get a tailored quote.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Contact Us
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
