-- Add columns to track pricing selections in contact submissions
ALTER TABLE public.contact_submissions
ADD COLUMN selected_package TEXT,
ADD COLUMN selected_addons TEXT[],
ADD COLUMN estimated_total DECIMAL(10, 2);