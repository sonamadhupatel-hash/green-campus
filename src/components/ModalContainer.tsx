import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Users, 
  Leaf, 
  Sparkles, 
  Upload, 
  BookOpen, 
  AlertCircle,
  HelpCircle,
  Code2,
  Layers,
  Lightbulb,
  ShieldCheck
} from 'lucide-react';
import { Initiative, Project, Activity, StudentIdea } from '../types';

export const ModalContainer: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    activities, 
    registerForActivity, 
    submitContribution, 
    submitIdea,
    openModal,
    user
  } = useApp();

  // Registration Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regDept, setRegDept] = useState('');
  const [regError, setRegError] = useState('');

  // Contribution Form State
  const [contribName, setContribName] = useState('');
  const [contribEmail, setContribEmail] = useState('');
  const [contribActivityId, setContribActivityId] = useState('');
  const [contribTitle, setContribTitle] = useState('');
  const [contribDesc, setContribDesc] = useState('');
  const [contribImage, setContribImage] = useState('');
  const [contribError, setContribError] = useState('');

  // Idea Form State
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaCategory, setIdeaCategory] = useState<StudentIdea['category']>('Energy');
  const [ideaBenefit, setIdeaBenefit] = useState('');
  const [ideaDesc, setIdeaDesc] = useState('');
  const [ideaStudentName, setIdeaStudentName] = useState('');
  const [ideaError, setIdeaError] = useState('');

  // Prefill forms with the logged-in user's details
  useEffect(() => {
    if (!user) return;
    setRegName((v) => v || user.name);
    setRegEmail((v) => v || user.email);
    setContribName((v) => v || user.name);
    setContribEmail((v) => v || user.email);
    setIdeaStudentName((v) => v || user.name);
  }, [user]);

  if (!activeModal.type) return null;

  // Handle Activity Registration Submit
  const handleRegSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim() || !regEmail.trim()) {
      setRegError('Please enter your full name and college email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail.trim())) {
      setRegError('Please provide a valid email format (e.g., student@college.edu).');
      return;
    }

    const activityId = activeModal.data?.id;
    const res = await registerForActivity(activityId, regName, regEmail, regDept);
    
    if (res.success) {
      setRegName('');
      setRegEmail('');
      setRegDept('');
      closeModal();
    } else {
      setRegError(res.message);
    }
  };

  // Handle Contribution Submit
  const handleContribSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContribError('');

    if (!contribName.trim() || !contribTitle.trim() || !contribDesc.trim()) {
      setContribError('Please fill in your name, contribution title, and description.');
      return;
    }

    const selectedAct = activities.find((a) => a.id === contribActivityId) || activities[0];

    const res = await submitContribution({
      studentName: contribName.trim(),
      studentEmail: contribEmail.trim() || 'student@campus.edu',
      activityId: selectedAct.id,
      activityTitle: selectedAct.title,
      title: contribTitle.trim(),
      description: contribDesc.trim(),
      imageUrl: contribImage || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'
    });

    if (!res.success) {
      setContribError(res.message);
      return;
    }

    setContribName('');
    setContribTitle('');
    setContribDesc('');
    setContribImage('');
    closeModal();
  };

  // Handle Idea Submit
  const handleIdeaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIdeaError('');

    if (!ideaTitle.trim() || !ideaDesc.trim() || !ideaBenefit.trim() || !ideaStudentName.trim()) {
      setIdeaError('All fields are required to submit an environmental proposal.');
      return;
    }

    const res = await submitIdea({
      title: ideaTitle,
      description: ideaDesc,
      category: ideaCategory,
      expectedBenefit: ideaBenefit,
      studentName: ideaStudentName
    });

    if (!res.success) {
      setIdeaError(res.message);
      return;
    }

    setIdeaTitle('');
    setIdeaDesc('');
    setIdeaBenefit('');
    setIdeaStudentName('');
    closeModal();
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (keep uploads small; stored in DB)
      if (file.size > 800 * 1024) {
        setContribError('For demo browser storage, please select an image smaller than 800 KB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setContribImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-2">
            {activeModal.type === 'register' && <Calendar className="w-5 h-5 text-emerald-600" />}
            {activeModal.type === 'contribution' && <Upload className="w-5 h-5 text-emerald-600" />}
            {activeModal.type === 'idea' && <Lightbulb className="w-5 h-5 text-amber-500" />}
            {activeModal.type === 'initiative_detail' && <Leaf className="w-5 h-5 text-emerald-600" />}
            {activeModal.type === 'project_detail' && <Layers className="w-5 h-5 text-teal-600" />}
            {activeModal.type === 'viva_docs' && <BookOpen className="w-5 h-5 text-emerald-700" />}

            <h2 className="text-base font-bold text-neutral-900">
              {activeModal.type === 'register' && 'Join Green Campus Activity'}
              {activeModal.type === 'contribution' && 'Submit Student Green Contribution'}
              {activeModal.type === 'idea' && 'Propose Campus Environmental Idea'}
              {activeModal.type === 'initiative_detail' && 'Initiative Specifications & Details'}
              {activeModal.type === 'project_detail' && 'Campus Project Overview'}
              {activeModal.type === 'viva_docs' && 'Green Campus Project Architecture & Viva Guide'}
            </h2>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* ================= MODAL: ACTIVITY REGISTRATION ================= */}
          {activeModal.type === 'register' && (
            <form onSubmit={handleRegSubmit} className="space-y-5">
              {activeModal.data && (
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-sm space-y-2">
                  <div className="font-semibold text-emerald-950 text-base">
                    {activeModal.data.title}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-800">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {activeModal.data.date} ({activeModal.data.time})
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {activeModal.data.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      Capacity: {activeModal.data.registeredCount}/{activeModal.data.capacity} joined
                    </span>
                  </div>
                </div>
              )}

              {regError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{regError}</span>
                </div>
              )}

              <div className="space-y-4 text-sm">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">
                    Student Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 mb-1">
                    College Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. aarav.sharma@college.edu"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-neutral-900"
                  />
                  <span className="text-xs text-neutral-500 mt-1 block">
                    Used to prevent duplicate registrations for the same event in this demo.
                  </span>
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 mb-1">
                    Academic Department / Semester (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Computer Science, 6th Semester"
                    value={regDept}
                    onChange={(e) => setRegDept(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-neutral-900"
                  />
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-600 border border-neutral-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Joining this campus activity will award <strong>+15 Demo Eco Points</strong> to your session.</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs cursor-pointer"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          )}

          {/* ================= MODAL: SUBMIT CONTRIBUTION ================= */}
          {activeModal.type === 'contribution' && (
            <form onSubmit={handleContribSubmit} className="space-y-4 text-sm">
              <p className="text-xs text-neutral-600">
                Logged participation or completed eco-action on campus? Record your work here to update the student contribution registry and earn <strong>+25 Demo Eco Points</strong>.
              </p>

              {contribError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{contribError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Venkatesh"
                    value={contribName}
                    onChange={(e) => setContribName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 mb-1">
                    College Email
                  </label>
                  <input
                    type="email"
                    placeholder="priya.v@campus.edu"
                    value={contribEmail}
                    onChange={(e) => setContribEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Related Campus Activity
                </label>
                <select
                  value={contribActivityId}
                  onChange={(e) => setContribActivityId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="">Select an activity (or General Environmental Action)</option>
                  {activities.map((act) => (
                    <option key={act.id} value={act.id}>
                      {act.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Contribution Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cleared 5 kg plastic bottles around north boundary trail"
                  value={contribTitle}
                  onChange={(e) => setContribTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Description of Work Completed <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe what you did, who participated, tools used, and the direct tangible result..."
                  value={contribDesc}
                  onChange={(e) => setContribDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Activity Photo / Proof (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="text-xs text-neutral-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                  />
                  {contribImage && (
                    <span className="text-xs text-emerald-700 font-medium">Image loaded</span>
                  )}
                </div>
                {contribImage && (
                  <div className="mt-2 w-28 h-20 rounded-lg overflow-hidden border border-neutral-200">
                    <img src={contribImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="p-3 bg-amber-50 rounded-lg text-xs text-amber-900 border border-amber-200 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Transparency Disclosure:</strong> This submission is a prototype record stored locally in browser storage. It is explicitly categorized as an unverified demo contribution and does not modify official college operational records.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs cursor-pointer"
                >
                  Submit Contribution
                </button>
              </div>
            </form>
          )}

          {/* ================= MODAL: SUBMIT GREEN IDEA ================= */}
          {activeModal.type === 'idea' && (
            <form onSubmit={handleIdeaSubmit} className="space-y-4 text-sm">
              <p className="text-xs text-neutral-600">
                The <strong>INITIATE</strong> pillar welcomes innovative sustainability proposals from students. Submitted ideas are catalogued in the campus repository for peer upvotes and administrative review.
              </p>

              {ideaError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{ideaError}</span>
                </div>
              )}

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Proposal Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solar-Powered Smart Charging Benches on Central Lawn"
                  value={ideaTitle}
                  onChange={(e) => setIdeaTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-neutral-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={ideaCategory}
                    onChange={(e) => setIdeaCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Energy">Energy</option>
                    <option value="Water">Water</option>
                    <option value="Waste">Waste</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Biodiversity">Biodiversity</option>
                    <option value="Campus Infrastructure">Campus Infrastructure</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 mb-1">
                    Proposer Name & Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sen (Bio-Sciences, Year 2)"
                    value={ideaStudentName}
                    onChange={(e) => setIdeaStudentName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Detailed Solution & Mechanism <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain how the proposed idea works, what campus locations it targets, and what equipment or policy changes it requires..."
                  value={ideaDesc}
                  onChange={(e) => setIdeaDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  Expected Environmental Benefit <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Conserves 8,000L of potable water weekly and cuts grid draw"
                  value={ideaBenefit}
                  onChange={(e) => setIdeaBenefit(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-600 border border-neutral-200">
                Submitting a proposal awards <strong>+20 Demo Eco Points</strong> and stages the item with status <em>Submitted</em>.
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs cursor-pointer"
                >
                  Publish Proposal
                </button>
              </div>
            </form>
          )}

          {/* ================= MODAL: INITIATIVE DETAIL ================= */}
          {activeModal.type === 'initiative_detail' && activeModal.data && (() => {
            const init: Initiative = activeModal.data;
            return (
              <div className="space-y-5 text-sm">
                <div className="w-full h-52 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 relative">
                  <img
                    src={init.imageUrl}
                    alt={init.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute bottom-3 left-3 bg-neutral-900/85 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-emerald-300">
                    {init.category} · {init.status}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{init.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{init.description}</p>
                </div>

                <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-2">
                  <div className="text-xs uppercase font-semibold text-emerald-900 tracking-wider">
                    Audited Impact Metric
                  </div>
                  <div className="text-base font-bold text-emerald-800 font-mono">
                    {init.impactMetric}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                    Key Environmental Benefits
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    {init.environmentalBenefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-neutral-100 pt-3 text-xs text-neutral-500 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <strong>Campus Locations:</strong> {init.campusLocation}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* ================= MODAL: PROJECT DETAIL ================= */}
          {activeModal.type === 'project_detail' && activeModal.data && (() => {
            const proj: Project = activeModal.data;
            return (
              <div className="space-y-5 text-sm">
                <div className="w-full h-48 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 relative">
                  <img
                    src={proj.imageUrl}
                    alt={proj.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono text-emerald-300">
                    {proj.status} ({proj.progressPercent}%)
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">{proj.name}</h3>
                  <div className="text-xs text-neutral-500 mb-3">
                    Category: {proj.category} · Timeline: {proj.timeline}
                  </div>
                  <p className="text-neutral-700 leading-relaxed mb-4">{proj.description}</p>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-700">Implementation Progress</span>
                    <span className="font-mono font-bold text-emerald-700">{proj.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 rounded-full" 
                      style={{ width: `${proj.progressPercent}%` }} 
                    />
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-xl">
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-900 mb-1">
                    {proj.impactType === 'Actual' ? 'Audited Realized Impact' : 'Projected Expected Impact'}
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    {proj.impactStatement}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                    Core Institutional Objective
                  </h4>
                  <p className="text-xs text-neutral-700">{proj.objective}</p>
                </div>
              </div>
            );
          })()}

          {/* ================= MODAL: VIVA DOCS & ARCHITECTURE GUIDE ================= */}
          {activeModal.type === 'viva_docs' && (
            <div className="space-y-6 text-sm">
              <div className="p-4 bg-emerald-900 text-white rounded-xl">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-1">
                  College Final Year Project Documentation
                </div>
                <h3 className="text-lg font-bold">Green Campus Digital Engagement Platform</h3>
                <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
                  This documentation guide is specifically prepared to help students present the Green Campus project, demonstrate working features, explain the architecture, and answer Viva Voce questions with confidence.
                </p>
              </div>

              {/* 1. Technology Stack */}
              <div>
                <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2 mb-2">
                  <Code2 className="w-4 h-4 text-emerald-600" />
                  1. Technology Stack & Architectural Decision
                </h4>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs space-y-2 text-neutral-700">
                  <p>
                    <strong>Frontend Framework:</strong> React 19 SPA running on Vite build tooling with strict TypeScript typing.
                  </p>
                  <p>
                    <strong>Styling System:</strong> Modern Tailwind CSS v4 using pure utility classes, zero heavy external UI libraries, fully responsive across desktop (1440px), tablets, and mobile devices.
                  </p>
                  <p>
                    <strong>State & Persistence:</strong> React Context API (`AppContext`) backed by an Express + SQLite REST API. Every account, registration, contribution, idea, upvote, quiz score and contact message is stored in the database and survives refreshes and devices.
                  </p>
                  <p>
                    <strong>Icons & Visuals:</strong> `lucide-react` icons and curated high-resolution photography with automatic SVG/styled fallbacks to guarantee 100% zero broken images.
                  </p>
                </div>
              </div>

              {/* 2. Three Pillars Explained */}
              <div>
                <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  2. The Three Pillars Model
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <span className="font-bold text-emerald-800 block mb-1">SHOW</span>
                    <p className="text-neutral-600">Displays verified campus sustainability achievements: 350 kWp solar grid, 450,000L rainwater harvesting, and waste metrics.</p>
                  </div>
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <span className="font-bold text-emerald-800 block mb-1">PARTICIPATE</span>
                    <p className="text-neutral-600">Lets students join scheduled drives (plogging, tree planting, e-waste) with capacity limits, duplicate registration prevention, and contribution logging.</p>
                  </div>
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <span className="font-bold text-emerald-800 block mb-1">INITIATE</span>
                    <p className="text-neutral-600">Open student proposal portal where learners pitch new sustainability ideas, categorize benefits, and gather peer upvotes.</p>
                  </div>
                </div>
              </div>

              {/* 3. Deliverables & 8 Pages Map */}
              <div>
                <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  3. The 8 Connected Pages
                </h4>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs space-y-1.5 text-neutral-700">
                  <div><strong>1. Home:</strong> Slider, 3 Pillars, Impact Statistics, Initiatives, Upcoming Activities, Progress bars, Quiz teaser.</div>
                  <div><strong>2. About:</strong> Vision, Objectives, Problem Statement, Stakeholder Benefits, UN SDGs (12, 13, 15), Honest Scope.</div>
                  <div><strong>3. Initiatives:</strong> 8 broad sustainability domains with categories, impact metrics, search, and specification modals.</div>
                  <div><strong>4. Projects & Activities:</strong> Segmented tabs separating institutional capital projects from student action events with live registration.</div>
                  <div><strong>5. Dashboard:</strong> Real-time sustainability metrics, progress indicators, waste distribution charts, and submitted records feed.</div>
                  <div><strong>6. Resources & Ideas:</strong> Practical guides, dorm energy tips, FAQ accordion, plus Student Green Idea submission and voting portal.</div>
                  <div><strong>7. Eco Quiz:</strong> 12+ question bank, category picker, instant educational feedback, scoring, answer review, and gamification points.</div>
                  <div><strong>8. Contact:</strong> College office directory, liaison contacts, feedback form with validation, and simulated reference IDs.</div>
                </div>
              </div>

              {/* 4. Viva Voce Q&A */}
              <div>
                <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2 mb-2">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  4. Top Viva Voce Questions & Answers
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <div className="font-bold text-neutral-900 mb-1">Q1: What is the main problem your project solves?</div>
                    <p className="text-neutral-600">"Most colleges execute great green efforts—like solar panels or compost units—but they operate as isolated administrative silos. Students have no visibility into what exists (SHOW), no clear calendar to take part (PARTICIPATE), and no channel to submit ideas (INITIATE). Green Campus bridges this gap."</p>
                  </div>
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <div className="font-bold text-neutral-900 mb-1">Q2: How does the application handle data persistence and duplicate registrations?</div>
                    <p className="text-neutral-600">"The app uses a React Context state manager that talks to an Express + SQLite backend (JWT login, bcrypt-hashed passwords). In the activity registration flow, a compound check verifies whether the entered email is already registered for that specific activity ID, gracefully alerting the user and avoiding duplicate participant records."</p>
                  </div>
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <div className="font-bold text-neutral-900 mb-1">Q3: Does this website directly control physical solar inverters or water pumps?</div>
                    <p className="text-neutral-600">"No. We clearly disclose that Green Campus is a digital student engagement and communication platform, not physical SCADA hardware. For production, the platform would ingest telemetry via read-only REST APIs from campus IoT sub-meters."</p>
                  </div>
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <div className="font-bold text-neutral-900 mb-1">Q4: How would you expand this for a full production enterprise release?</div>
                    <p className="text-neutral-600">"We would introduce: 1) College Single-Sign-On (SSO / OAuth2 with institutional email domain); 2) PostgreSQL database with Node/Express or Cloud SQL; 3) S3 or Cloud Storage bucket for verified student geo-tagged photo uploads; and 4) An administrative moderation dashboard for idea approval."</p>
                  </div>
                </div>
              </div>

              {/* 5. 3-Minute Presentation Script */}
              <div>
                <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  5. 3-Minute Project Presentation Script
                </h4>
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-950 space-y-2">
                  <p>
                    <strong>Opening (30s):</strong> "Respected examiners, our final year project is 'Green Campus'—a full-stack digital sustainability platform built to solve the lack of student awareness and engagement in campus environmental governance."
                  </p>
                  <p>
                    <strong>Architecture & 3 Pillars (60s):</strong> "Rather than a static informational brochure, Green Campus is architected around three active pillars: SHOW highlights institutional accomplishments like our 350 kWp solar grid and 450,000L rainwater system. PARTICIPATE provides live activity sign-ups with capacity tracking and work logging. INITIATE allows students to propose and upvote innovative sustainability ideas."
                  </p>
                  <p>
                    <strong>Interactive Demo (60s):</strong> "As you can see, the site features 8 fully interconnected pages, a dynamic Green Dashboard, an offline 12-question Eco Quiz with educational explanations and gamified points, client-side form validation, and a real Express + SQLite backend with user accounts."
                  </p>
                  <p>
                    <strong>Conclusion (30s):</strong> "Green Campus directly supports UN Sustainable Development Goals 12, 13, and 15, transforming our university into an active living laboratory for sustainability."
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/80 flex items-center justify-between text-xs text-neutral-500">
          <span>Green Campus Platform · Sustainability Portal</span>
          <button
            onClick={closeModal}
            className="px-4 py-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-lg shadow-2xs cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
