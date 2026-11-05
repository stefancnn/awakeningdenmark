import { useState } from 'react';
import { CheckCircle, AlertCircle, ArrowRight, UserPlus, Sparkles } from 'lucide-react';
import { FormErrors, WaitlistEntry } from '../types';
import { validateWaitlistForm, getWaitlistEntries } from '../utils/waitlist';
import { submitWaitlist } from '../services/api';
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

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      const saved = await submitWaitlist({
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
    } catch (err: any) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="py-16 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-950">
            Join The Waitlist Now
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Get early notification for confirmed dates, location, and registration for <strong>Fire Camp Copenhagen</strong> (Late June 2027, Dates TBC).
          </p>
        </div>

        {/* If user just received a ticket, display the TicketPass */}
        {currentTicket ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm mb-1">
                <CheckCircle className="w-5 h-5" />
                <span>You are officially registered on the Copenhagen Priority Waitlist!</span>
              </div>
              <p className="text-xs text-slate-500">
                A copy has been saved to your browser pass. Keep your pass number handy.
              </p>
            </div>

            <TicketPass entry={currentTicket} />

            <div className="text-center pt-2">
              <button
                onClick={() => setCurrentTicket(null)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register another family member or church leader</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* The Registration Form - Clean Light Theme */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
              
                {/* Row 1: First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="e.g. Mathias"
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.firstName
                          ? 'border-red-500 focus:ring-red-500/30'
                          : 'border-slate-300 focus:border-red-600 focus:ring-red-600/20'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.firstName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="e.g. Lindqvist"
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.lastName
                          ? 'border-red-500 focus:ring-red-500/30'
                          : 'border-slate-300 focus:border-red-600 focus:ring-red-600/20'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.lastName}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Email & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. mathias@example.dk"
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-500/30'
                          : 'border-slate-300 focus:border-red-600 focus:ring-red-600/20'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +45 20 12 34 56"
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.phone
                          ? 'border-red-500 focus:ring-red-500/30'
                          : 'border-slate-300 focus:border-red-600 focus:ring-red-600/20'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3: City, Country, Postal Code */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      City <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Copenhagen"
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.city
                          ? 'border-red-500 focus:ring-red-500/30'
                          : 'border-slate-300 focus:border-red-600 focus:ring-red-600/20'
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.city}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Country <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all cursor-pointer"
                    >
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Postal Code <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="e.g. 1050"
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.postalCode
                          ? 'border-red-500 focus:ring-red-500/30'
                          : 'border-slate-300 focus:border-red-600 focus:ring-red-600/20'
                      }`}
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.postalCode}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 4: Primary Area of Interest / Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label htmlFor="roleInterest" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      I Want to Attend As
                    </label>
                    <select
                      id="roleInterest"
                      name="roleInterest"
                      value={formData.roleInterest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all cursor-pointer"
                    >
                      <option value="believer">Everyday Believer / Youth / Student</option>
                      <option value="evangelist">Aspiring or Active Evangelist</option>
                      <option value="pastor">Pastor or Church Leader</option>
                      <option value="volunteer">Intercessor / Logistics Volunteer</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="churchName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Home Church / Fellowship <span className="text-slate-400 text-[10px] font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="churchName"
                      name="churchName"
                      value={formData.churchName}
                      onChange={handleInputChange}
                      placeholder="e.g. Citykirken, Hillsong CPH..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all"
                    />
                  </div>
                </div>

                {/* Important Date Notice */}
                <div className="text-xs text-slate-500 flex items-start gap-2 pt-1">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    Planned for <strong>Copenhagen during the last week of June 2027</strong> (dates to be confirmed). You will receive early access before general release.
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-slate-300 text-white font-bold text-base rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Your Registration...</span>
                  ) : (
                    <>
                      <span>Confirm Waitlist Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>
        )}

        {/* Existing Registrations on Device */}
        {!currentTicket && existingEntries.length > 0 && (
          <div className="mt-8 p-4 rounded-xl bg-white border border-slate-200">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Saved Passes on this Device ({existingEntries.length})
            </div>
            <div className="space-y-1.5">
              {existingEntries.slice(0, 3).map((entry) => (
                <div 
                  key={entry.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900">{entry.firstName} {entry.lastName}</span>
                    <span className="text-slate-400 ml-2 font-mono">({entry.ticketNumber})</span>
                  </div>
                  <button
                    onClick={() => setCurrentTicket(entry)}
                    className="text-red-600 hover:text-red-700 font-semibold cursor-pointer"
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
