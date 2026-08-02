import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  useSessions,
  useStartSession,
  useResumeSession,
  useEndSession,
} from "@scan/restaurants";

import SessionHeader from "../components/SessionHeader";
import SessionFilters from "../components/SessionFilters";
import SessionGrid from "../components/SessionGrid";
import StartSessionModal from "../components/StartSessionModal";

const SessionPage = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);

  // 1. Fetch Sessions List
  const { data: sessionsRes, isLoading } = useSessions();

  const sessions = useMemo(() => {
    return sessionsRes?.data || sessionsRes || [];
  }, [sessionsRes]);

  // Mutations
  const { mutate: startSession } = useStartSession();
  const { mutate: resumeSession } = useResumeSession();
  const { mutate: endSession } = useEndSession();

  // Filter & Search Logic
  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      // Status filter
      const matchesStatus =
        statusFilter === "all" || session.status === statusFilter;

      // Table Number or Token search filter
      const tableNum = session.table?.tableNumber || session.table || "";
      const token = session.sessionToken || "";
      const matchesSearch =
        tableNum.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [sessions, statusFilter, searchQuery]);

  // Handlers
  const handleStartSession = (payload) => {
    startSession(payload, {
      onSuccess: () => {
        toast.success("Dining session started successfully!");
        setIsStartModalOpen(false);
      },
      onError: (err) => {
        toast.error(err?.message || "Failed to start dining session");
      },
    });
  };

  const handleResumeSession = (sessionId) => {
    resumeSession(sessionId, {
      onSuccess: () => {
        toast.success("Dining session resumed successfully!");
      },
      onError: (err) => {
        toast.error(err?.message || "Failed to resume dining session");
      },
    });
  };

  const handleEndSession = (sessionId) => {
    if (window.confirm("Are you sure you want to end this session?")) {
      endSession(sessionId, {
        onSuccess: () => {
          toast.success("Dining session ended successfully!");
        },
        onError: (err) => {
          toast.error(err?.message || "Failed to end dining session");
        },
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-lightPrimary p-5 font-dm text-navy-700 dark:bg-navy-900 dark:text-white">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
        {/* Top Header & Summary Stats */}
        <SessionHeader
          sessions={sessions}
          onStartClick={() => setIsStartModalOpen(true)}
        />

        {/* Filter & Search Bar */}
        <SessionFilters
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Sessions Grid */}
        {isLoading ? (
          <div className="flex h-64 items-center justify-center rounded-[20px] bg-white dark:border dark:border-white/10 dark:bg-navy-800">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-brand-500 border-t-transparent dark:border-brand-400" />
          </div>
        ) : (
          <SessionGrid
            sessions={filteredSessions}
            onResumeSession={handleResumeSession}
            onEndSession={handleEndSession}
          />
        )}
      </div>

      {/* Start Session Modal */}
      <StartSessionModal
        isOpen={isStartModalOpen}
        onClose={() => setIsStartModalOpen(false)}
        onSubmit={handleStartSession}
      />
    </div>
  );
};

export default SessionPage;
