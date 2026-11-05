import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Lock,
  ShieldCheck,
  LogOut,
  Download,
  Trash2,
  Search,
  RefreshCw,
  Users,
  Flame,
  Building,
  HeartHandshake,
  MapPin,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { WaitlistEntry } from '../types';
import {
  loginAdmin,
  getAdminWaitlist,
  deleteAdminWaitlistEntry,
  logoutAdmin,
  getStoredAdminToken,
  verifyAdminSession,
} from '../services/api';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  // Auth state
  const [token, setToken] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Data state
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [isLoadingEntries, setIsLoadingEntries] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Check stored session on mount or open
  useEffect(() => {
    if (!isOpen) return;

    const stored = getStoredAdminToken();
    if (stored.token) {
      verifyAdminSession(stored.token).then((res) => {
        if (res.authenticated) {
          setToken(stored.token);
          setAdminEmail(res.email || stored.email);
        } else {
          setToken(null);
          setAdminEmail(null);
        }
      });
    }
  }, [isOpen]);

  // Load entries when authenticated
  useEffect(() => {
    if (token) {
      loadEntries();
    }
  }, [token]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const loadEntries = async () => {
    if (!token) return;
    setIsLoadingEntries(true);
    setFetchError(null);
    try {
      const data = await getAdminWaitlist(token);
      setEntries(data);
    } catch (err: any) {
      setFetchError(err.message || 'Failed to fetch waitlist');
    } finally {
      setIsLoadingEntries(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const result = await loginAdmin(emailInput, passwordInput);
      setToken(result.token);
      setAdminEmail(result.email);
      setPasswordInput('');
      setStatusMessage({ text: 'Authentication successful', type: 'success' });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setAuthError(err.message || 'Invalid email or password');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin(token);
    setToken(null);
    setAdminEmail(null);
    setEntries([]);
    setStatusMessage({ text: 'Logged out successfully', type: 'success' });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!token) return;
    if (!window.confirm(`Are you sure you want to remove "${name}" from the waitlist? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteAdminWaitlistEntry(token, id);
      setEntries((prev) => prev.filter((item) => item.id !== id));
      setStatusMessage({ text: `Entry for ${name} deleted`, type: 'success' });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      alert(`Error deleting record: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered entries
  const filteredEntries = useMemo(() => {
    return entries.filter((item) => {
      // Role filter
      if (selectedRole !== 'all' && item.roleInterest !== selectedRole) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
        const email = item.email.toLowerCase();
        const phone = item.phone.toLowerCase();
        const city = item.city.toLowerCase();
        const church = (item.churchName || '').toLowerCase();
        const ticket = (item.ticketNumber || '').toLowerCase();
        return (
          fullName.includes(q) ||
          email.includes(q) ||
          phone.includes(q) ||
          city.includes(q) ||
          church.includes(q) ||
          ticket.includes(q)
        );
      }
      return true;
    });
  }, [entries, searchQuery, selectedRole]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = entries.length;
    const evangelists = entries.filter((e) => e.roleInterest === 'evangelist').length;
    const pastors = entries.filter((e) => e.roleInterest === 'pastor').length;
    const believers = entries.filter((e) => e.roleInterest === 'believer').length;
    const volunteers = entries.filter((e) => e.roleInterest === 'volunteer').length;

    // Cities count
    const cityMap: Record<string, number> = {};
    entries.forEach((e) => {
      const city = e.city.trim();
      if (city) {
        cityMap[city] = (cityMap[city] || 0) + 1;
      }
    });

    const topCities = Object.entries(cityMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    return { total, evangelists, pastors, believers, volunteers, topCities };
  }, [entries]);

  // Export to CSV
  const handleExportCSV = () => {
    if (entries.length === 0) {
      alert('No records available to export.');
      return;
    }

    const headers = [
      'Ticket Number',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'City',
      'Country',
      'Postal Code',
      'Role Interest',
      'Home Church',
      'Registration Date',
    ];

    const rows = entries.map((e) => [
      `"${e.ticketNumber || ''}"`,
      `"${(e.firstName || '').replace(/"/g, '""')}"`,
      `"${(e.lastName || '').replace(/"/g, '""')}"`,
      `"${(e.email || '').replace(/"/g, '""')}"`,
      `"${(e.phone || '').replace(/"/g, '""')}"`,
      `"${(e.city || '').replace(/"/g, '""')}"`,
      `"${(e.country || '').replace(/"/g, '""')}"`,
      `"${(e.postalCode || '').replace(/"/g, '""')}"`,
      `"${(e.roleInterest || '').replace(/"/g, '""')}"`,
      `"${(e.churchName || '').replace(/"/g, '""')}"`,
      `"${e.createdAt || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `denmark-harvest-waitlist-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to JSON
  const handleExportJSON = () => {
    if (entries.length === 0) {
      alert('No records available to export.');
      return;
    }
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(entries, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `denmark-harvest-waitlist-${dateStr}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-portal-title"
    >
      <div className="relative w-full max-w-6xl bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl text-neutral-100 my-auto flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-950">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="admin-portal-title" className="text-base font-black uppercase tracking-wider text-white">
                  Awakening Denmark · Admin Portal
                </h2>
                {token && (
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 border border-emerald-800 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Authorized Session
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400">
                {token ? `Authenticated as ${adminEmail}` : 'Restricted to authorized harvest organizers'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Log out of admin session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status notification toast */}
        {statusMessage && (
          <div
            className={`px-6 py-2 text-xs font-medium flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950 text-emerald-300 border-b border-emerald-900'
                : 'bg-red-950 text-red-300 border-b border-red-900'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!token ? (
            /* ========================================================= */
            /* LOGIN SCREEN                                              */
            /* ========================================================= */
            <div className="max-w-md mx-auto py-8 sm:py-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 text-red-500 mb-4 shadow-inner">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                  Organizer Sign-In
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Enter your registered organizer email and password to access the Copenhagen waitlist database.
                </p>
              </div>

              {authError && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Authentication Failed</p>
                    <p className="text-[11px] text-red-400/90 mt-0.5">{authError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="admin-email" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Authorized Email Address
                  </label>
                  <input
                    type="email"
                    id="admin-email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g. stefancnn@gmail.com"
                    required
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="admin-password" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="admin-password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:bg-neutral-800 text-white font-bold text-sm tracking-wide shadow-lg shadow-red-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {authLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying credentials...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Access Admin Dashboard</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-neutral-900 text-center text-[11px] text-neutral-500">
                <span>Access is strictly audited. Only designated coordinator accounts can view confidential registrations.</span>
              </div>
            </div>
          ) : (
            /* ========================================================= */
            /* AUTHENTICATED ADMIN DASHBOARD                             */
            /* ========================================================= */
            <div className="space-y-6">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                  <div className="flex items-center justify-between text-neutral-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Total Signups</span>
                    <Users className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">{stats.total}</div>
                  <p className="text-[10px] text-neutral-400 mt-1">Confirmed priority passes</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                  <div className="flex items-center justify-between text-neutral-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Evangelists</span>
                    <Flame className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">{stats.evangelists}</div>
                  <p className="text-[10px] text-neutral-400 mt-1">National reach callers</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                  <div className="flex items-center justify-between text-neutral-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Pastors</span>
                    <Building className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-purple-300">{stats.pastors}</div>
                  <p className="text-[10px] text-neutral-400 mt-1">Church leaders</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                  <div className="flex items-center justify-between text-neutral-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Believers</span>
                    <Users className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-blue-300">{stats.believers}</div>
                  <p className="text-[10px] text-neutral-400 mt-1">Everyday witnesses</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                  <div className="flex items-center justify-between text-neutral-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Volunteers</span>
                    <HeartHandshake className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">{stats.volunteers}</div>
                  <p className="text-[10px] text-neutral-400 mt-1">Intercessors & crew</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800">
                  <div className="flex items-center justify-between text-neutral-400 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Top Cities</span>
                    <MapPin className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-xs font-semibold text-neutral-200 space-y-0.5">
                    {stats.topCities.length > 0 ? (
                      stats.topCities.slice(0, 2).map(([city, count]) => (
                        <div key={city} className="flex justify-between">
                          <span className="truncate max-w-[80px]">{city}</span>
                          <span className="text-neutral-400">({count})</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-neutral-500 text-[11px]">No data</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800">
                {/* Search & Filter */}
                <div className="flex flex-1 flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name, email, phone, city, or pass #..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500 cursor-pointer"
                  >
                    <option value="all">All Roles ({entries.length})</option>
                    <option value="evangelist">Evangelists ({stats.evangelists})</option>
                    <option value="pastor">Pastors / Leaders ({stats.pastors})</option>
                    <option value="believer">Believers ({stats.believers})</option>
                    <option value="volunteer">Volunteers ({stats.volunteers})</option>
                  </select>
                </div>

                {/* Data Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={loadEntries}
                    disabled={isLoadingEntries}
                    className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Reload latest registrations"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingEntries ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>

                  <button
                    onClick={handleExportCSV}
                    className="px-3 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-xs font-bold text-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Download registration list as CSV for Excel / Google Sheets"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={handleExportJSON}
                    className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-bold text-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Download JSON data"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>JSON</span>
                  </button>
                </div>
              </div>

              {/* Table / List */}
              <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/40">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-900 text-neutral-400 font-bold uppercase tracking-wider text-[10px] border-b border-neutral-800">
                      <tr>
                        <th className="py-3 px-4">Pass ID</th>
                        <th className="py-3 px-4">Full Name</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Role / Calling</th>
                        <th className="py-3 px-4">Home Church</th>
                        <th className="py-3 px-4">Registered</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60">
                      {isLoadingEntries ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-neutral-400">
                            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-red-500 mb-2" />
                            <span>Loading waitlist registrations from server...</span>
                          </td>
                        </tr>
                      ) : filteredEntries.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-neutral-400">
                            <Users className="w-8 h-8 mx-auto text-neutral-600 mb-2" />
                            <p className="font-semibold text-neutral-300">No registrations found</p>
                            <p className="text-[11px] text-neutral-500 mt-1">
                              {searchQuery || selectedRole !== 'all'
                                ? 'Try adjusting your search filters.'
                                : 'Waitlist submissions from the landing page will appear here instantly.'}
                            </p>
                          </td>
                        </tr>
                      ) : (
                        filteredEntries.map((item) => (
                          <tr key={item.id} className="hover:bg-neutral-800/40 transition-colors">
                            <td className="py-3 px-4 font-mono text-[11px] font-bold text-red-400 whitespace-nowrap">
                              {item.ticketNumber || 'PENDING'}
                            </td>
                            <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                              {item.firstName} {item.lastName}
                            </td>
                            <td className="py-3 px-4">
                              <div>
                                <a
                                  href={`mailto:${item.email}`}
                                  className="text-neutral-200 hover:text-white hover:underline block"
                                >
                                  {item.email}
                                </a>
                                <a
                                  href={`tel:${item.phone}`}
                                  className="text-[11px] text-neutral-400 hover:text-neutral-300 font-mono block mt-0.5"
                                >
                                  {item.phone}
                                </a>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-neutral-300 whitespace-nowrap">
                              <div>{item.city}, {item.country}</div>
                              <div className="text-[10px] text-neutral-500 font-mono">{item.postalCode}</div>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  item.roleInterest === 'evangelist'
                                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                    : item.roleInterest === 'pastor'
                                    ? 'bg-purple-950 text-purple-300 border border-purple-800'
                                    : item.roleInterest === 'volunteer'
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                    : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                                }`}
                              >
                                {item.roleInterest}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-neutral-400 text-[11px]">
                              {item.churchName || <span className="text-neutral-600 italic">None stated</span>}
                            </td>
                            <td className="py-3 px-4 text-neutral-500 text-[10px] whitespace-nowrap">
                              {item.createdAt ? new Date(item.createdAt).toLocaleDateString('da-DK', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              }) : '—'}
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleDelete(item.id, `${item.firstName} ${item.lastName}`)}
                                disabled={deletingId === item.id}
                                className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                                title="Remove from waitlist"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer info */}
                <div className="p-3 bg-neutral-900/80 border-t border-neutral-800 text-[11px] text-neutral-400 flex flex-col sm:flex-row justify-between items-center gap-2">
                  <span>
                    Showing {filteredEntries.length} of {entries.length} total registrants
                  </span>
                  <span className="text-[10px] text-neutral-500">
                    Live connection to backend waitlist repository
                  </span>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
