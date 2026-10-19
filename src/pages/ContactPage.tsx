import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ShieldCheck, 
  GraduationCap,
  MessageSquare
} from 'lucide-react';
import { ContactMessage } from '../types';

export const ContactPage: React.FC = () => {
  const { submitContactMessage } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<ContactMessage['category']>('General Inquiry');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please provide your name, email, and message content.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    const res = await submitContactMessage(name.trim(), email.trim(), category, message.trim());
    if (!res.success) {
      setError(res.message);
      return;
    }
    setSubmittedId(res.reference ?? null);

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-md">
          <Mail className="w-3.5 h-3.5" />
          <span>Sustainability Office Liaison</span>
        </div>
        <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight">
          Contact & Campus Feedback
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Connect with the university sustainability coordinator, report a campus water leak or e-waste bin overflow, or submit recommendations for eco-club collaboration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/90 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">
              Send Inquiries & Environmental Feedback
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Your message is validated and saved to the campus database.
            </p>
          </div>

          {submittedId && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1.5 animate-in fade-in duration-200">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Inquiry Staged Successfully! Reference #{submittedId}</span>
              </div>
              <p className="text-emerald-900 leading-relaxed">
                Thank you for your feedback. In an operational production deployment, this ticket routes directly to the Campus Environmental Officer's triage desk.
              </p>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul.v@campus.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                Category of Inquiry <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="General Inquiry">General Sustainability Inquiry</option>
                <option value="Campus Eco-Club">Campus Eco-Club Membership & Events</option>
                <option value="Report Issue">Report Facility Issue (e.g. Water Leak, Bin Overflow)</option>
                <option value="Suggest Collaboration">Suggest Departmental Collaboration</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                Message Content <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Share your question, observation, or suggestion with campus organizers..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-500 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Submission Notice:</strong> This form demonstrates full client validation and user notification. It records demo feedback directly in your session.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch Feedback (Demo)</span>
            </button>
          </form>
        </div>

        {/* Right Column: Office Details & Directory (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Physical Office Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-neutral-900">
              Campus Sustainability Office
            </h3>

            <div className="space-y-3 text-xs text-neutral-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Environmental Science Complex, Ground Floor, Room 104, North Campus Plaza</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-mono">sustainability-office@college.edu</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>+1 (555) 234-7890 (Campus Helpline Ext: 420)</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Monday – Friday: 09:00 AM – 05:00 PM</span>
              </div>
            </div>
          </div>

          {/* Key Coordinators Directory */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-neutral-900">
              Campus Environmental Directory
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <div className="font-bold text-neutral-900">Dr. Sunita Rao</div>
                <div className="text-emerald-700 text-[11px]">Faculty Director, Center for Sustainable Development</div>
                <div className="text-neutral-500 text-[10px] mt-1">Office: Tech Block A, Room 312 · dr.rao@college.edu</div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <div className="font-bold text-neutral-900">Aditya Nair</div>
                <div className="text-emerald-700 text-[11px]">President, Student Eco-Action Society</div>
                <div className="text-neutral-500 text-[10px] mt-1">Student Union Office · eco-club@student.college.edu</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
