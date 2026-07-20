import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Settings,
  LogOut,
  Edit3,
  CheckCircle2,
  X,
  Save,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { useAuth } from "@scan/auth";
import { useProfile, useUpdateProfile } from "@scan/profile";

// ─── Helpers ─────────────────────────────────────────
const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const formatDate = (dateString) => {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

// ─── Component ───────────────────────────────────────
const UserProfile = () => {
  const { logout } = useAuth();
  const { data: profileResponse, isLoading, error } = useProfile();
  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateProfile();

  const currentUser = profileResponse?.data;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        phone: currentUser.phone || "",
      });
    }
  }, [currentUser]);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    try {
      const response = await updateProfile({
        name: formData.name,
        phone: formData.phone,
      });
      toast.success(response?.message || "Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update profile",
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
    });
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      toast.error("Failed to sign out safely.");
    }
  };

  // ─── Loading State ────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 size={32} className="animate-spin text-brand mb-4" />
        <p className="text-muted-foreground font-ui text-sm uppercase tracking-widest font-bold animate-pulse">
          Loading Profile
        </p>
      </div>
    );
  }

  // ─── Error State ──────────────────────────────────
  if (error || !currentUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-5 text-center">
        <div className="w-16 h-16 bg-destructive/10 border border-destructive/20 flex items-center justify-center mb-6">
          <AlertTriangle size={32} className="text-destructive" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Data Sync Failed
        </h2>
        <p className="text-muted-foreground font-ui text-sm">
          We couldn't retrieve your profile data.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Fixed background gradient – elegant and lightweight */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-brand/5" />

      {/* Profile content – pushed below nav with pt-32 */}
      <div className="relative min-h-screen pt-32 pb-20 px-5 sm:px-8 overflow-hidden select-none">
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Page Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground mb-3 tracking-tight">
              Account <span className="text-brand">Overview</span>
            </h1>
            <p className="text-muted-foreground font-ui text-sm sm:text-base">
              Manage your personal details and platform preferences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Profile Card – Ultra Glass */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="md:col-span-4 glass p-8 flex flex-col items-center text-center relative overflow-hidden group cursor-default"
            >
              {/* Hover accent line */}
              <div
                className={cn(
                  "absolute top-0 left-0 h-1 transition-all duration-500 ease-out",
                  isEditing
                    ? "w-full bg-emerald-500"
                    : "w-0 group-hover:w-full bg-brand",
                )}
              />

              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-28 h-28 bg-card border border-border/20 flex items-center justify-center shadow-inner">
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    <span className="font-display text-4xl font-bold text-foreground/50 tracking-tighter">
                      {getInitials(
                        isEditing ? formData.name : currentUser.name,
                      )}
                    </span>
                  )}
                </div>
                {currentUser.isActive && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-card/80 border border-border/20 flex items-center justify-center shadow-sm backdrop-blur-sm">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  </div>
                )}
              </div>

              {/* Name Input / Display */}
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full mb-3 text-center font-display text-2xl font-bold text-foreground bg-transparent border-b border-brand/50 py-1 focus:outline-none focus:border-brand transition-colors"
                  placeholder="Your Name"
                />
              ) : (
                <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                  {currentUser.name}
                </h2>
              )}

              {/* Role badge */}
              <span className="inline-block px-3 py-1 bg-brand/10 text-brand text-[10px] font-ui font-bold uppercase tracking-widest border border-brand/20 mb-6 backdrop-blur-sm">
                {currentUser.role}
              </span>

              {/* Edit / Save actions */}
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div
                    key="editing-actions"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full flex gap-2"
                  >
                    <button
                      onClick={handleCancel}
                      disabled={isUpdating}
                      className="flex-1 py-3.5 border border-border text-foreground font-ui font-bold text-xs uppercase tracking-widest hover:bg-accent transition-all disabled:opacity-50 cursor-pointer"
                    >
                      <X size={14} className="mx-auto" />
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isUpdating}
                      className="flex-[2] py-3.5 bg-emerald-500/80 border border-emerald-400/50 text-white font-ui font-bold text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    >
                      {isUpdating ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Save size={14} />
                      )}
                      Save
                    </button>
                  </motion.div>
                ) : (
                  <button
                    key="edit-btn"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="w-full py-3.5 border border-border text-foreground/80 font-ui font-bold text-xs uppercase tracking-widest hover:bg-accent hover:text-foreground hover:border-foreground/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Edit3 size={14} /> Edit Profile
                  </button>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Details Grid */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass p-8 flex flex-col justify-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-center gap-3 mb-8 relative z-10">
                  <div className="w-8 h-8 border border-border/20 bg-card/60 backdrop-blur-md flex items-center justify-center">
                    <User size={14} className="text-brand" />
                  </div>
                  <h3 className="font-ui font-bold text-sm uppercase tracking-widest text-foreground">
                    Contact Details
                  </h3>
                </div>

                <div className="space-y-6 relative z-10">
                  <div>
                    <p className="text-[10px] font-ui font-semibold uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-2">
                      <Mail size={12} /> Email Address
                      <span className="ml-1 text-muted-foreground/50">
                        (Read Only)
                      </span>
                    </p>
                    <p className="font-ui font-medium text-foreground/80 text-sm truncate cursor-not-allowed">
                      {currentUser.email}
                    </p>
                  </div>
                  <div className="w-full h-px bg-border/20" />
                  <div>
                    <p className="text-[10px] font-ui font-semibold uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-2">
                      <Phone size={12} /> Phone Number
                    </p>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full mt-1 bg-transparent border-b border-brand/50 text-foreground text-sm font-ui py-2 focus:outline-none focus:border-brand transition-colors"
                        placeholder="e.g. 9876543210"
                      />
                    ) : (
                      <p className="font-ui font-medium text-foreground/80 text-sm">
                        {currentUser.phone
                          ? `+91 ${currentUser.phone}`
                          : "Not provided"}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Account Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass p-8 flex flex-col justify-center relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-center gap-3 mb-8 relative z-10">
                  <div className="w-8 h-8 border border-border/20 bg-card/60 backdrop-blur-md flex items-center justify-center">
                    <ShieldCheck size={14} className="text-brand" />
                  </div>
                  <h3 className="font-ui font-bold text-sm uppercase tracking-widest text-foreground">
                    Account Status
                  </h3>
                </div>

                <div className="space-y-6 relative z-10">
                  <div>
                    <p className="text-[10px] font-ui font-semibold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                      Verification
                    </p>
                    {currentUser.isVerified ? (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-ui font-bold backdrop-blur-sm">
                        <CheckCircle2 size={14} /> Verified Account
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-ui font-bold backdrop-blur-sm">
                        Pending Verification
                      </div>
                    )}
                  </div>
                  <div className="w-full h-px bg-border/20" />
                  <div>
                    <p className="text-[10px] font-ui font-semibold uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-2">
                      <Calendar size={12} /> Member Since
                    </p>
                    <p className="font-ui font-medium text-foreground/80 text-sm">
                      {formatDate(currentUser.createdAt)}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Actions Bar (spans full width) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="sm:col-span-2 grid grid-cols-2 gap-4"
              >
                <button className="glass flex items-center justify-center gap-2 py-4 font-ui font-bold text-xs uppercase tracking-widest text-foreground/80 hover:text-foreground transition-all cursor-pointer">
                  <Settings size={14} /> Preferences
                </button>
                <button
                  onClick={handleLogout}
                  className="group flex items-center justify-center gap-2 py-4 bg-destructive/10 border border-destructive/20 text-destructive font-ui font-bold text-xs uppercase tracking-widest hover:bg-destructive/20 transition-all cursor-pointer"
                >
                  <LogOut
                    size={14}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  Sign Out
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
