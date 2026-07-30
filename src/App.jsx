import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PracticeDashboard from './components/PracticeDashboard';
import ErrorLog from './components/ErrorLog';
import DiagnosticModal from './components/DiagnosticModal';
import UserSyncModal from './components/UserSyncModal';
import {
  getLocalSkillMatrix,
  saveLocalSkillMatrix,
  getLocalErrorLogs,
  saveLocalErrorLog,
  isDiagnosticCompleted,
  setDiagnosticCompleted,
  getUserEmail,
  setUserEmail,
  fetchCloudProgress,
  syncProgressWithAPI
} from './lib/storage';
import { calculateOverallStats } from './lib/adaptiveEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('practice');
  const [activeTopicId, setActiveTopicId] = useState('arithmetic');
  const [skillMatrix, setSkillMatrix] = useState(() => getLocalSkillMatrix());
  const [errorLogs, setErrorLogs] = useState(() => getLocalErrorLogs());
  const [showDiagnostic, setShowDiagnostic] = useState(() => !isDiagnosticCompleted());
  const [dbStatus, setDbStatus] = useState(false);
  const [userEmail, setUserEmailState] = useState(() => getUserEmail());
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  // Sync skill Matrix whenever it changes locally
  useEffect(() => {
    saveLocalSkillMatrix(skillMatrix);
  }, [skillMatrix]);

  // Check MongoDB connection status on mount
  useEffect(() => {
    async function checkDB() {
      try {
        const emailToFetch = userEmail || 'student@example.com';
        const data = await fetchCloudProgress(emailToFetch);
        if (data && data.dbConnected) {
          setDbStatus(true);
          if (data.user?.skillMatrix) {
            setSkillMatrix(data.user.skillMatrix);
          }
          if (Array.isArray(data.errorLogs) && data.errorLogs.length > 0) {
            setErrorLogs(data.errorLogs);
          }
        }
      } catch (err) {
        console.info('Using local state for offline operation.');
      }
    }
    checkDB();
  }, [userEmail]);

  // Handle manual saving of progress for an email
  const handleSaveProgress = async (email) => {
    setUserEmail(email);
    setUserEmailState(email);
    const res = await syncProgressWithAPI({
      userEmail: email,
      updatedSkillMatrix: skillMatrix
    });
    if (res && res.dbConnected) setDbStatus(true);
    return res;
  };

  // Handle loading cloud session for an email
  const handleLoadProgress = async (email) => {
    setUserEmail(email);
    setUserEmailState(email);
    const data = await fetchCloudProgress(email);
    if (data && data.dbConnected && data.user) {
      setDbStatus(true);
      if (data.user.skillMatrix) {
        setSkillMatrix(data.user.skillMatrix);
        saveLocalSkillMatrix(data.user.skillMatrix);
      }
      if (Array.isArray(data.errorLogs)) {
        setErrorLogs(data.errorLogs);
        localStorage.setItem('quantsocrates_error_logs', JSON.stringify(data.errorLogs));
      }
      return true;
    }
    return false;
  };

  // Diagnostic Onboarding complete callback
  const handleCompleteDiagnostic = (matrixFromDiagnostic) => {
    setSkillMatrix(matrixFromDiagnostic);
    saveLocalSkillMatrix(matrixFromDiagnostic);
    setDiagnosticCompleted(true);
    setShowDiagnostic(false);
  };

  // Reset diagnostic and start fresh
  const handleResetDiagnostic = () => {
    if (window.confirm('Reset diagnostic onboarding test and restart all skill levels?')) {
      setDiagnosticCompleted(false);
      setShowDiagnostic(true);
    }
  };

  // Record an error log entry
  const handleRecordError = (errorItem) => {
    const updated = saveLocalErrorLog(errorItem);
    setErrorLogs(updated);
  };

  // Clear all error logs
  const handleClearLogs = () => {
    localStorage.removeItem('quantsocrates_error_logs');
    setErrorLogs([]);
  };

  const overallStats = calculateOverallStats(skillMatrix);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        overallStats={overallStats}
        onResetDiagnostic={handleResetDiagnostic}
        dbStatus={dbStatus}
        userEmail={userEmail}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 my-0">
        {activeTab === 'practice' && (
          <PracticeDashboard
            activeTopicId={activeTopicId}
            setActiveTopicId={setActiveTopicId}
            skillMatrix={skillMatrix}
            setSkillMatrix={setSkillMatrix}
            onRecordError={handleRecordError}
          />
        )}

        {activeTab === 'errorLog' && (
          <ErrorLog
            errorLogs={errorLogs}
            onClearLogs={handleClearLogs}
          />
        )}
      </main>

      {/* Baseline Diagnostic Modal on First Load */}
      {showDiagnostic && (
        <DiagnosticModal onCompleteDiagnostic={handleCompleteDiagnostic} />
      )}

      {/* User Cloud Sync / Resume Modal */}
      <UserSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        currentEmail={userEmail}
        onSaveProgress={handleSaveProgress}
        onLoadProgress={handleLoadProgress}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-400">
        <p>QuantSocrates AI — Modern Adaptive MBA Quant Tutor (CAT / GMAT / GRE)</p>
      </footer>
    </div>
  );
}
