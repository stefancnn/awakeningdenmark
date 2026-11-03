import React, { useState } from 'react';
import { Flame, CheckCircle, AlertCircle, ArrowRight, UserPlus, Sparkles } from 'lucide-react';
import { FormErrors, WaitlistEntry } from '../types';
import { validateWaitlistForm, saveWaitlistEntry, getWaitlistEntries } from '../utils/waitlist';
import { TicketPass } from './TicketPass';

export const WaitlistSection: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: 'Denmark',
    postalCode: '',
    roleInterest: 'believer' as WaitlistEntry['roleInterest'],
    churchName: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<WaitlistEntry | null>(null);
  const [existingEntries, setExistingEntries] = useState<WaitlistEntry[]>(() => getWaitlistEntries());

  const countries = [
    'Denmark',
    'Sweden',
    'Norway',
    'Finland',
    'Iceland',
    'Germany',
    'United Kingdom',
    'Netherlands',
    'United States',
    'Other Europe',
    'Other Worldwide',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateWaitlistForm({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      country: formData.country,
      postalCode: formData.postalCode,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    // Simulate clean network latency (150ms)
    setTimeout(() => {
      const saved = saveWaitlistEntry({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        country: formData.country.trim(),
        postalCode: formData.postalCode.trim(),
        roleInterest: formData.roleInterest,
        churchName: formData.churchName.trim() || undefined,
      });

      setCurrentTicket(saved);
      setExistingEntries(getWaitlistEntries());
      setIsSubmitting(false);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        country: 'Denmark',
        postalCode: '',
        roleInterest: 'believer',
        churchName: '',
      });
    }, 200);
  };

  return (
    <section id="waitlist" className="py-24 bg-neutral-950 text-white relative">
      {/* Background Accents */}
      <div className="absolute inset-0 bg-radial from-red-950/20 via-neutral-950 to-neutral-950 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/90 border border-red-800 text-red-400 font-bold text-xs uppercase tracking-widest mb-3">
            <Flame className="w-3.5 h-3.5 fill-red-500" />
            <span>Priority Access</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            Join The Waitlist Now
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            Be the first to receive confirmed dates, venue locations, and early registration passes for <strong>Fire Camp Copenhagen</strong> (Late June 2027, Dates TBC).
          </p>
        </div>

        {/* If user just received a ticket, display the TicketPass */}
        {currentTicket ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                <CheckCircle className="w-5 h-5" />
                <span>You are officially on the Copenhagen Priority Waitlist!</span>
              </div>
              <p className="text-xs text-neutral-400">
                A confirmation has been saved to your browser pass. Keep your pass number handy.
              </p>
            </div>

            <TicketPass entry={currentTicket} />

            <div className="text-center pt-4">
              <button
                onClick={() => setCurrentTicket(null)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register another family member or church leader</span>
              </button>
            </div>
          </div>
        ) : (
          /* The Registration Form */
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="e.g. Mathias"
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.firstName
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-neutral-800 focus:border-red-500 focus:ring-red-500/30'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.firstName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="e.g. Lindqvist"
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.lastName
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-neutral-800 focus:border-red-500 focus:ring-red-500/30'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.lastName}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Email & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. mathias@example.dk"
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-neutral-800 focus:border-red-500 focus:ring-red-500/30'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +45 20 12 34 56"
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-neutral-800 focus:border-red-500 focus:ring-red-500/30'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: City, Country, Postal Code */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Copenhagen"
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.city
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-neutral-800 focus:border-red-500 focus:ring-red-500/30'
                    }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.city}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="country" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all cursor-pointer"
                  >
                    {countries.map((c) => (
                      <option key={c} value={c} className="bg-neutral-950 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="e.g. 1050"
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-950 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.postalCode
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-neutral-800 focus:border-red-500 focus:ring-red-500/30'
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.postalCode}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 4: Primary Area of Interest / Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <label htmlFor="roleInterest" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    I Want to Attend As
                  </label>
                  <select
                    id="roleInterest"
                    name="roleInterest"
                    value={formData.roleInterest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all cursor-pointer"
                  >
                    <option value="believer" className="bg-neutral-950">Everyday Believer / Youth / Student</option>
                    <option value="evangelist" className="bg-neutral-950">Aspiring or Active Evangelist</option>
                    <option value="pastor" className="bg-neutral-950">Pastor or Church Leader</option>
                    <option value="volunteer" className="bg-neutral-950">Intercessor / Logistics Volunteer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="churchName" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Home Church / Fellowship <span className="text-neutral-500 text-[10px] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="churchName"
                    name="churchName"
                    value={formData.churchName}
                    onChange={handleInputChange}
                    placeholder="e.g. Citykirken, Hillsong CPH, Apostolic..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all"
                  />
                </div>
              </div>

              {/* Notice */}
              <div className="text-xs text-neutral-400 flex items-start gap-2 pt-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  The launch takes place in <strong>Copenhagen during the last week of June 2027</strong> (dates to be confirmed). Waitlist members will receive priority ticket notifications via email and SMS before registration opens to the general public.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:bg-neutral-700 text-white font-black text-base sm:text-lg rounded-xl shadow-xl shadow-red-950/60 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Reserving Your Priority Spot...</span>
                ) : (
                  <>
                    <span>Confirm My Waitlist Registration</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

            </form>
          </div>
        )}

        {/* Existing Registrations on Device (if any) */}
        {!currentTicket && existingEntries.length > 0 && (
          <div className="mt-12 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
              Your Saved Waitlist Passes ({existingEntries.length})
            </div>
            <div className="space-y-2">
              {existingEntries.slice(0, 3).map((entry) => (
                <div 
                  key={entry.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs"
                >
                  <div>
                    <span className="font-bold text-white">{entry.firstName} {entry.lastName}</span>
                    <span className="text-neutral-500 ml-2 font-mono">({entry.ticketNumber})</span>
                  </div>
                  <button
                    onClick={() => setCurrentTicket(entry)}
                    className="text-red-400 hover:text-red-300 font-semibold"
                  >
                    View Pass
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
