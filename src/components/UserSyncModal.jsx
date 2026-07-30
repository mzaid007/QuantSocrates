import React, { useState } from 'react';
import { UserCheck, CloudUpload, CloudDownload, X, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export default function UserSyncModal({
  isOpen,
  onClose,
  currentEmail,
  onSaveProgress,
  onLoadProgress
}) {
  const [emailInput, setEmailInput] = useState(currentEmail || '');
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success'|'error', text: '' }
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    setLoading(true);
    setStatusMessage(null);
    try {
      const res = await onSaveProgress(emailInput.trim());
      if (res && res.dbConnected) {
        setStatusMessage({ type: 'success', text: `Progress saved successfully to cloud for ${emailInput.trim()}!` });
      } else {
        setStatusMessage({ type: 'info', text: `Saved locally for ${emailInput.trim()}! Connect MongoDB to sync across devices.` });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to save progress to cloud.' });
    } finally {
      setLoading(false);
    }
  };

  const handleLoad = async () => {
    if (!emailInput.trim()) return;

    setLoading(true);
    setStatusMessage(null);
    try {
      const success = await onLoadProgress(emailInput.trim());
      if (success) {
        setStatusMessage({ type: 'success', text: `Cloud session loaded for ${emailInput.trim()}!` });
      } else {
        setStatusMessage({ type: 'error', text: `No cloud session found for ${emailInput.trim()} or MongoDB unavailable.` });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to load cloud session.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-fade-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 m-0">Sync / Resume Cloud Progress</h2>
            <p className="text-xs text-slate-400">Enable multi-device access with your email</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Student Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {statusMessage && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                : statusMessage.type === 'info'
                ? 'bg-cyan-950/60 border border-cyan-800 text-cyan-300'
                : 'bg-rose-950/60 border border-rose-800 text-rose-300'
            }`}>
              {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="submit"
              disabled={loading || !emailInput.trim()}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-cyan-400 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <CloudUpload className="w-4 h-4" /> Save Progress
            </button>

            <button
              type="button"
              disabled={loading || !emailInput.trim()}
              onClick={handleLoad}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <CloudDownload className="w-4 h-4" /> Resume Session
            </button>
          </div>
        </form>

        <p className="text-[11px] text-slate-500 text-center mt-4">
          Progress is automatically synchronized whenever you solve questions.
        </p>
      </div>
    </div>
  );
}
