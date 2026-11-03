import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  PencilLine,
  Phone,
  Send,
} from 'lucide-react';
import {
  CompanyConfig,
  CustomizerTab,
  EnquiryFormData,
  ServiceItem,
} from '../types/site';

interface ContactSectionProps {
  config: CompanyConfig;
  services: ServiceItem[];
  preselectedService: string;
  preselectedSectorNote: string;
  formInputRef: React.RefObject<HTMLInputElement | null>;
  onOpenCustomizer: (tab: CustomizerTab) => void;
}

const INITIAL_FORM_STATE: EnquiryFormData = {
  fullName: '',
  companyName: '',
  mobileNumber: '',
  emailAddress: '',
  serviceRequired: '',
  projectLocation: '',
  projectRequirements: '',
};

type FormErrors = Partial<Record<keyof EnquiryFormData, string>>;

export const ContactSection: React.FC<ContactSectionProps> = ({
  config,
  services,
  preselectedService,
  preselectedSectorNote,
  formInputRef,
  onOpenCustomizer,
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] =
    useState<EnquiryFormData | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setSubmittedRecord(null);
      setFormData((prev) => ({
        ...prev,
        serviceRequired: preselectedService,
      }));
      setErrors((prev) => ({ ...prev, serviceRequired: undefined }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedSectorNote) {
      setSubmittedRecord(null);
      setFormData((prev) => ({
        ...prev,
        projectRequirements: prev.projectRequirements
          ? prev.projectRequirements
          : `Enquiring regarding roofing requirements for ${preselectedSectorNote}.`,
      }));
    }
  }, [preselectedSectorNote]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.companyName.trim()) {
      nextErrors.companyName = 'Please enter your company or organization name.';
    }

    const cleanedPhone = formData.mobileNumber.replace(/[\s()-]/g, '');
    const indianOrIntlPhoneRegex = /^(\+91)?[6-9]\d{9}$|^\+?\d{10,14}$/;
    if (!cleanedPhone) {
      nextErrors.mobileNumber = 'Mobile number is required.';
    } else if (!indianOrIntlPhoneRegex.test(cleanedPhone)) {
      nextErrors.mobileNumber =
        'Enter a valid 10-digit mobile number (e.g., 98XXXXXXXX or +91 98XXXXXXXX).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!formData.emailAddress.trim()) {
      nextErrors.emailAddress = 'Business or contact email address is required.';
    } else if (!emailRegex.test(formData.emailAddress.trim())) {
      nextErrors.emailAddress = 'Please enter a valid email address.';
    }

    if (!formData.serviceRequired) {
      nextErrors.serviceRequired = 'Please select the service required.';
    }

    if (!formData.projectLocation.trim()) {
      nextErrors.projectLocation =
        'Please enter the site or project location (e.g., Talwade, Chakan, Pune).';
    }

    if (
      !formData.projectRequirements.trim() ||
      formData.projectRequirements.trim().length < 10
    ) {
      nextErrors.projectRequirements =
        'Please share brief project details (minimum 10 characters).';
    }

    return nextErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof EnquiryFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRecord(formData);
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
    }, 320);
  };

  const mapEmbedUrl =
    'https://maps.google.com/maps?q=No.+55,+Gat,+Dehu+Alandi+Road,+Tukaram+Nagar,+Talawade+Gaon,+Talwade,+Pimpri-Chinchwad,+Maharashtra+411062&t=&z=15&ie=UTF8&iwloc=&output=embed';

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#F4F6F8] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-xs font-semibold text-[#52606D]">
            <span className="font-mono text-[#de7a18] tabular-nums">07</span>
            <span aria-hidden="true">·</span>
            <span>Contact &amp; Project Consultation</span>
          </div>

          <h2
            id="contact-heading"
            className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10263D]"
          >
            Connect With Kaustubh Roofing Industries
          </h2>

          <p className="mt-3 text-base text-[#3E4C59]">
            Share your industrial or commercial roofing requirement, or reach our
            Talwade office directly.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT SIDE — Contact Details + Google Map */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs font-semibold text-[#616E7C]">
                    Corporate Office
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold text-[#10263D]">
                    {config.companyName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenCustomizer('contact')}
                  className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#10263D] whitespace-nowrap shrink-0 hover:bg-slate-50 transition-colors"
                >
                  <PencilLine className="h-3.5 w-3.5 text-[#de7a18]" />
                  <span>Edit Info</span>
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {/* Verified Address */}
                <div className="flex items-start gap-3.5">
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#F4F6F8] text-[#10263D]"
                    aria-hidden="true"
                  >
                    <MapPin className="h-4 w-4 text-[#de7a18]" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[#52606D]">
                      Office Address · Verified
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#202A35]">
                      {config.verifiedAddress}
                    </p>
                  </div>
                </div>

                {/* Editable Phone Number Placeholder */}
                <div className="flex items-start gap-3.5">
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#F4F6F8] text-[#10263D]"
                    aria-hidden="true"
                  >
                    <Phone className="h-4 w-4 text-[#de7a18]" />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-[#52606D]">
                      Phone Number
                    </p>
                    {config.phone ? (
                      <a
                        href={`tel:${config.phone.replace(/\s+/g, '')}`}
                        className="mt-1 inline-block text-sm font-semibold text-[#10263D] hover:text-[#de7a18] tabular-nums"
                      >
                        {config.phone}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onOpenCustomizer('contact')}
                        className="mt-1 text-left text-sm font-medium text-[#616E7C] underline decoration-dotted underline-offset-4 hover:text-[#10263D]"
                      >
                        [Editable Phone Placeholder — Click to Set Before Publishing]
                      </button>
                    )}
                  </div>
                </div>

                {/* Editable Email Placeholder */}
                <div className="flex items-start gap-3.5">
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#F4F6F8] text-[#10263D]"
                    aria-hidden="true"
                  >
                    <Mail className="h-4 w-4 text-[#de7a18]" />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-[#52606D]">
                      Email Address
                    </p>
                    {config.email ? (
                      <a
                        href={`mailto:${config.email}`}
                        className="mt-1 inline-block text-sm font-semibold text-[#10263D] hover:text-[#de7a18]"
                      >
                        {config.email}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onOpenCustomizer('contact')}
                        className="mt-1 text-left text-sm font-medium text-[#616E7C] underline decoration-dotted underline-offset-4 hover:text-[#10263D]"
                      >
                        [Editable Email Placeholder — Click to Set Before Publishing]
                      </button>
                    )}
                  </div>
                </div>

                {/* Editable Business Hours Placeholder */}
                <div className="flex items-start gap-3.5">
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#F4F6F8] text-[#10263D]"
                    aria-hidden="true"
                  >
                    <Clock className="h-4 w-4 text-[#de7a18]" />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-[#52606D]">
                      Business Hours
                    </p>
                    {config.businessHours ? (
                      <p className="mt-1 text-sm font-medium text-[#202A35]">
                        {config.businessHours}
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onOpenCustomizer('contact')}
                        className="mt-1 text-left text-sm font-medium text-[#616E7C] underline decoration-dotted underline-offset-4 hover:text-[#10263D]"
                      >
                        [Working Hours Pending Confirmation — Click to Configure]
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps Location */}
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <div className="border-b border-slate-100 px-5 py-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#10263D]">
                  Talwade Location Map · Pimpri-Chinchwad
                </span>
                <a
                  href="https://maps.google.com/?q=No.+55,+Gat,+Dehu+Alandi+Road,+Tukaram+Nagar,+Talawade+Gaon,+Talwade,+Pimpri-Chinchwad,+Maharashtra+411062"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#de7a18] hover:underline whitespace-nowrap shrink-0"
                >
                  Open in Maps
                </a>
              </div>
              <iframe
                title="Kaustubh Roofing Industries Pvt. Ltd. Location Map — Talwade, Pimpri-Chinchwad"
                src={mapEmbedUrl}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* RIGHT SIDE — Project Enquiry Form */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-7">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-5">
              <div>
                <h3 className="font-display text-xl font-bold text-[#10263D]">
                  Request a Roofing Enquiry
                </h3>
                <p className="mt-1 text-xs text-[#616E7C]">
                  Fields marked with <span className="text-red-600">*</span> are
                  required.
                </p>
              </div>
              <span className="text-xs font-medium text-[#616E7C]">
                Frontend Demo · Email Routing Pending
              </span>
            </div>

            {submittedRecord ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50/60 p-6 sm:p-8"
              >
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" />
                  <div className="flex-1">
                    <h4 className="font-display text-lg font-bold text-[#10263D]">
                      Enquiry Recorded in Demo Preview
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#3E4C59]">
                      Thank you,{' '}
                      <strong className="font-semibold text-[#10263D]">
                        {submittedRecord.fullName}
                      </strong>{' '}
                      ({submittedRecord.companyName}). Your simulated enquiry for{' '}
                      <strong className="font-semibold text-[#10263D]">
                        {submittedRecord.serviceRequired}
                      </strong>{' '}
                      at{' '}
                      <strong className="font-semibold text-[#10263D]">
                        {submittedRecord.projectLocation}
                      </strong>{' '}
                      has been validated successfully.
                    </p>

                    <div className="mt-4 rounded-md border border-slate-200 bg-white p-4 text-xs text-[#52606D]">
                      <strong className="text-[#10263D]">
                        Technical Implementation Note:
                      </strong>{' '}
                      This presentation demo uses client-side form simulation.
                      Server-side email notification and CRM integration will be
                      connected once official company email credentials are
                      supplied.
                    </div>

                    <button
                      type="button"
                      onClick={() => setSubmittedRecord(null)}
                      className="mt-6 inline-flex min-h-10 items-center justify-center rounded-md bg-[#10263D] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#183654] transition-colors"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold text-[#202A35]"
                    >
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      ref={formInputRef}
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g., Rajesh Kulkarni"
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'err-fullName' : undefined}
                      className={`mt-1.5 block w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[#202A35] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F28C28] ${
                        errors.fullName ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.fullName && (
                      <p
                        id="err-fullName"
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-xs font-semibold text-[#202A35]"
                    >
                      Company Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      autoComplete="organization"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g., Precision Auto Components Pvt. Ltd."
                      aria-invalid={Boolean(errors.companyName)}
                      aria-describedby={
                        errors.companyName ? 'err-companyName' : undefined
                      }
                      className={`mt-1.5 block w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[#202A35] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F28C28] ${
                        errors.companyName ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.companyName && (
                      <p
                        id="err-companyName"
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.companyName}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Mobile Number */}
                  <div>
                    <label
                      htmlFor="mobileNumber"
                      className="block text-xs font-semibold text-[#202A35]"
                    >
                      Mobile Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      autoComplete="tel"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      aria-invalid={Boolean(errors.mobileNumber)}
                      aria-describedby={
                        errors.mobileNumber ? 'err-mobileNumber' : undefined
                      }
                      className={`mt-1.5 block w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[#202A35] placeholder:text-slate-400 tabular-nums focus:outline-none focus:ring-2 focus:ring-[#F28C28] ${
                        errors.mobileNumber ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.mobileNumber && (
                      <p
                        id="err-mobileNumber"
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.mobileNumber}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="emailAddress"
                      className="block text-xs font-semibold text-[#202A35]"
                    >
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="emailAddress"
                      name="emailAddress"
                      type="email"
                      autoComplete="email"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      aria-invalid={Boolean(errors.emailAddress)}
                      aria-describedby={
                        errors.emailAddress ? 'err-emailAddress' : undefined
                      }
                      className={`mt-1.5 block w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[#202A35] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F28C28] ${
                        errors.emailAddress ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                    {errors.emailAddress && (
                      <p
                        id="err-emailAddress"
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.emailAddress}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Service Required Dropdown */}
                  <div>
                    <label
                      htmlFor="serviceRequired"
                      className="block text-xs font-semibold text-[#202A35]"
                    >
                      Service Required <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="serviceRequired"
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.serviceRequired)}
                      aria-describedby={
                        errors.serviceRequired ? 'err-serviceRequired' : undefined
                      }
                      className={`mt-1.5 block w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[#202A35] focus:outline-none focus:ring-2 focus:ring-[#F28C28] ${
                        errors.serviceRequired
                          ? 'border-red-500'
                          : 'border-slate-300'
                      }`}
                    >
                      <option value="">Select a roofing solution...</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="General Roofing Consultation">
                        General Roofing Consultation
                      </option>
                    </select>
                    {errors.serviceRequired && (
                      <p
                        id="err-serviceRequired"
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.serviceRequired}</span>
                      </p>
                    )}
                  </div>

                  {/* Project Location */}
                  <div>
                    <label
                      htmlFor="projectLocation"
                      className="block text-xs font-semibold text-[#202A35]"
                    >
                      Project Location <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="projectLocation"
                      name="projectLocation"
                      type="text"
                      value={formData.projectLocation}
                      onChange={handleChange}
                      placeholder="e.g., Talwade, Chakan MIDC, Bhosari, Pune"
                      aria-invalid={Boolean(errors.projectLocation)}
                      aria-describedby={
                        errors.projectLocation ? 'err-projectLocation' : undefined
                      }
                      className={`mt-1.5 block w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[#202A35] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F28C28] ${
                        errors.projectLocation
                          ? 'border-red-500'
                          : 'border-slate-300'
                      }`}
                    />
                    {errors.projectLocation && (
                      <p
                        id="err-projectLocation"
                        className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.projectLocation}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Project Requirements */}
                <div>
                  <label
                    htmlFor="projectRequirements"
                    className="block text-xs font-semibold text-[#202A35]"
                  >
                    Project Requirements <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="projectRequirements"
                    name="projectRequirements"
                    rows={4}
                    value={formData.projectRequirements}
                    onChange={handleChange}
                    placeholder="Describe approximate roof area, building type (factory, warehouse, commercial), new installation or replacement, and target timeline..."
                    aria-invalid={Boolean(errors.projectRequirements)}
                    aria-describedby={
                      errors.projectRequirements
                        ? 'err-projectRequirements'
                        : undefined
                    }
                    className={`mt-1.5 block w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[#202A35] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F28C28] ${
                      errors.projectRequirements
                        ? 'border-red-500'
                        : 'border-slate-300'
                    }`}
                  />
                  {errors.projectRequirements && (
                    <p
                      id="err-projectRequirements"
                      className="mt-1.5 flex items-center gap-1 text-xs text-red-600"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.projectRequirements}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-[#616E7C]">
                    Simulated demo submission · Backend/email integration pending.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#F28C28] px-7 py-3 text-sm font-bold text-[#10263D] whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[#ffa042] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28C28]"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? 'Validating...' : 'Submit Enquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
