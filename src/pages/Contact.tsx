import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Phone, MapPin, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone number must be at least 10 characters").max(20).optional().or(z.literal("")),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricingSelection, setPricingSelection] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  useEffect(() => {
    // Check if user came from pricing page with selections
    const savedSelection = sessionStorage.getItem('pricing_selection');
    if (savedSelection) {
      const selection = JSON.parse(savedSelection);
      setPricingSelection(selection);
      
      // Pre-fill message with selected items
      const addonsList = selection.addons.length > 0 
        ? `\n\nSelected Add-ons:\n${selection.addons.map((a: string) => `- ${a}`).join('\n')}\n\nEstimated Total: $${selection.total.toLocaleString()}`
        : '';
      
      form.setValue('message', `I'm interested in the Professional Website package.${addonsList}\n\nAdditional details: `);
    }
  }, [form]);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const submissionData: any = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        message: data.message,
      };

      // Add pricing selection data if available
      if (pricingSelection) {
        submissionData.selected_package = 'Professional Website';
        submissionData.selected_addons = pricingSelection.addons;
        submissionData.estimated_total = pricingSelection.total;
      }

      const { error } = await supabase
        .from("contact_submissions")
        .insert([submissionData]);

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      form.reset();
      // Clear pricing selection from session storage
      sessionStorage.removeItem('pricing_selection');
      setPricingSelection(null);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Error sending message",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "hello@presencify.com",
      link: "mailto:hello@presencify.com",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Office",
      content: "123 Tech Street, San Francisco, CA 94105",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Get in Touch</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold">
              Let's Build Something Amazing
            </h1>
            <p className="text-xl text-muted-foreground">
              {pricingSelection 
                ? `You've selected: Professional Website${pricingSelection.addons.length > 0 ? ` + ${pricingSelection.addons.length} add-on${pricingSelection.addons.length > 1 ? 's' : ''}` : ''}`
                : "Have a project in mind? We'd love to hear about it. Fill out the form below and we'll get back to you shortly."
              }
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <Card key={info.title} className="hover:shadow-card transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          {info.link ? (
                            <a 
                              href={info.link}
                              className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              <Card className="gradient-card shadow-glow">
                <CardContent className="p-6 space-y-4">
                  {pricingSelection ? (
                    <>
                      <Sparkles className="w-8 h-8 text-primary" />
                      <h3 className="text-xl font-bold">Your Selection</h3>
                      <div className="space-y-2 text-sm">
                        <p className="font-semibold">Base Package: ${pricingSelection.basePrice.toLocaleString()}</p>
                        {pricingSelection.addons.length > 0 && (
                          <div>
                            <p className="font-semibold mb-1">Add-ons:</p>
                            <ul className="space-y-1 text-muted-foreground">
                              {pricingSelection.addons.map((addon: string, idx: number) => (
                                <li key={idx}>• {addon}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="pt-2 border-t border-border">
                          <p className="font-bold text-lg gradient-text">
                            Estimated Total: ${pricingSelection.total.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-8 h-8 text-primary" />
                      <h3 className="text-xl font-bold">Quick Response</h3>
                      <p className="text-sm text-muted-foreground">
                        We typically respond to all inquiries within 24 hours during business days.
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Company" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
