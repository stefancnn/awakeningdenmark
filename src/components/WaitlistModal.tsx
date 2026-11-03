import React, { useState } from 'react';
import { X, Flame, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { FormErrors, WaitlistEntry } from '../types';
import { validateWaitlistForm, saveWaitlistEntry } from '../utils/waitlist';
import { TicketPass } from './TicketPass';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: 'Denmark',
    postalCode: '',
    roleInterest: 'believer' as WaitlistEntry['roleInterest'],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticket, setTicket] = useState<WaitlistEntry | null>(null);

  if (!isOpen) return null;

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

    const validation = validateWaitlistForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

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
      });

      setTicket(saved);
      setIsSubmitting(false);
    }, 200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Close waitlist modal"
        >
          <X className="w-5 h-5" />
        </button>

        {ticket ? (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>Priority Pass Generated</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white">
                You&apos;re On The Waitlist!
              </h3>
            </div>

            <TicketPass entry={ticket} onClose={onClose} />
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-2">
                <Flame className="w-4 h-4 fill-red-500" />
                <span>Copenhagen · Late June 2027 (Dates TBC)</span>
              </div>
              <h2 id="modal-title" className="text-2xl sm:text-3xl font-black uppercase text-white">
                Join The Priority Waitlist
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                Enter your details to receive priority booking notice for Fire Camp Copenhagen.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-firstName" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="modal-firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full px-3 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                  {errors.firstName && (
                    <p className="text-[11px] text-red-400 mt-0.5">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-lastName" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="modal-lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full px-3 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                  {errors.lastName && (
                    <p className="text-[11px] text-red-400 mt-0.5">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-email" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.dk"
                    className="w-full px-3 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-400 mt-0.5">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="modal-phone" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="modal-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+45 ..."
                    className="w-full px-3 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-400 mt-0.5">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label htmlFor="modal-city" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="modal-city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full px-3 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                  {errors.city && (
                    <p className="text-[11px] text-red-400 mt-0.5">{errors.city}</p>
                  )}
                </div>

                <div className="col-span-1">
                  <label htmlFor="modal-country" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Country *
                  </label>
                  <select
                    id="modal-country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-2 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-red-500"
                  >
                    <option value="Denmark">Denmark</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Norway">Norway</option>
                    <option value="Finland">Finland</option>
                    <option value="Germany">Germany</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-span-1">
                  <label htmlFor="modal-postalCode" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    id="modal-postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="Postal"
                    className="w-full px-3 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                  {errors.postalCode && (
                    <p className="text-[11px] text-red-400 mt-0.5">{errors.postalCode}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="modal-roleInterest" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Role / Interest
                </label>
                <select
                  id="modal-roleInterest"
                  name="roleInterest"
                  value={formData.roleInterest}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-red-500"
                >
                  <option value="believer">Everyday Believer / Youth / Student</option>
                  <option value="evangelist">Aspiring or Active Evangelist</option>
                  <option value="pastor">Pastor or Church Leader</option>
                  <option value="volunteer">Intercessor / Volunteer</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:bg-neutral-700 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                {isSubmitting ? (
                  <span>Reserving...</span>
                ) : (
                  <>
                    <span>Confirm Waitlist Spot</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
