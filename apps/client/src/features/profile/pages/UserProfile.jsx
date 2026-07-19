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
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "@scan/auth";

// Assume these are exported from your respective directories

// ─── Helper Functions ─────────────────────────────────────────
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
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

// ─── Main Component ───────────────────────────────────────────
const UserProfile = () => {
  const { logout } = useAuth();

  // React Query Hooks
  const { data: profileResponse, isLoading, error } = useProfile();
  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateProfile();

  const currentUser = profileResponse?.data;

  // Local State for Inline Editing
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  // Sync form data when user data loads
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

  // ─── Loading State ───
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

  // ─── Error State ───
  if (error || !currentUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-5 text-center">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 rounded-none-force">
          <AlertTriangle size={32} className="text-red-500" />
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
    <div className="min-h-screen bg-background pt-32 pb-20 px-5 sm:px-8 relative overflow-hidden select-none">
      {/* Ambient Background Textures */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      {/* Subtle Top Glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand/5 blur-[120px] rounded-full pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Page Header */}
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

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* ─── Profile Card (Spans 4 columns on large screens) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 bg-card border border-border p-8 flex flex-col items-center text-center rounded-none-force shadow-sm relative overflow-hidden group"
          >
            {/* Hover Accent Line */}
            <div
              className={cn(
                "absolute top-0 left-0 h-1 transition-all duration-500 ease-out",
                isEditing
                  ? "w-full bg-emerald-500"
                  : "w-0 group-hover:w-full bg-brand",
              )}
            />

            {/* Avatar Generation */}
            <div className="relative mb-6">
              <div className="w-28 h-28 bg-muted border border-border flex items-center justify-center rounded-none-force shadow-inner">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-display text-4xl font-bold text-foreground/50 tracking-tighter">
                    {getInitials(isEditing ? formData.name : currentUser.name)}
                  </span>
                )}
              </div>
              {currentUser.isActive && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-card border border-border flex items-center justify-center rounded-none-force shadow-sm">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                </div>
              )}
            </div>

            {/* Editable Name Field */}
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full mb-3 text-center font-display text-2xl font-bold text-foreground bg-background border border-border py-1 focus:outline-none focus:border-brand/50 rounded-none-force"
                placeholder="Your Name"
              />
            ) : (
              <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                {currentUser.name}
              </h2>
            )}

            <span className="inline-block px-3 py-1 bg-brand/10 text-brand text-[10px] font-ui font-bold uppercase tracking-widest border border-brand/20 rounded-none-force mb-6">
              {currentUser.role}
            </span>

            {/* Action Buttons */}
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
                    className="flex-1 py-3.5 bg-background border border-border text-foreground font-ui font-bold text-xs uppercase tracking-widest hover:bg-accent transition-all rounded-none-force disabled:opacity-50"
                  >
                    <X size={14} className="mx-auto" />
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="flex-[2] py-3.5 bg-emerald-500 text-white font-ui font-bold text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all rounded-none-force flex items-center justify-center gap-2 disabled:opacity-70"
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
                <motion.button
                  key="edit-btn"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="w-full py-3.5 bg-background border border-border text-foreground font-ui font-bold text-xs uppercase tracking-widest hover:bg-accent hover:border-foreground/30 transition-all rounded-none-force flex items-center justify-center gap-2"
                >
                  <Edit3 size={14} /> Edit Profile
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ─── Details Grid (Spans 8 columns on large screens) ─── */}
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
              className="bg-card border border-border p-8 rounded-none-force shadow-sm flex flex-col justify-center relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 border border-border bg-background flex items-center justify-center rounded-none-force">
                  <User size={14} className="text-brand" />
                </div>
                <h3 className="font-ui font-bold text-sm uppercase tracking-widest text-foreground">
                  Contact Details
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-ui font-semibold uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-2">
                    <Mail size={12} /> Email Address{" "}
                    <span className="ml-1 text-muted-foreground/40">
                      (Read Only)
                    </span>
                  </p>
                  <p className="font-ui font-medium text-foreground text-sm truncate opacity-80 cursor-not-allowed">
                    {currentUser.email}
                  </p>
                </div>
                <div className="w-full h-px bg-border" />
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
                      className="w-full mt-1 bg-background border border-border text-foreground text-sm font-ui py-2 px-3 focus:outline-none focus:border-brand/50 rounded-none-force transition-colors"
                      placeholder="e.g. 9876543210"
                    />
                  ) : (
                    <p className="font-ui font-medium text-foreground text-sm">
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
              className="bg-card border border-border p-8 rounded-none-force shadow-sm flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 border border-border bg-background flex items-center justify-center rounded-none-force">
                  <ShieldCheck size={14} className="text-brand" />
                </div>
                <h3 className="font-ui font-bold text-sm uppercase tracking-widest text-foreground">
                  Account Status
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-ui font-semibold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                    Verification
                  </p>
                  {currentUser.isVerified ? (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-ui font-bold rounded-none-force">
                      <CheckCircle2 size={14} /> Verified Account
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-ui font-bold rounded-none-force">
                      Pending Verification
                    </div>
                  )}
                </div>
                <div className="w-full h-px bg-border" />
                <div>
                  <p className="text-[10px] font-ui font-semibold uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-2">
                    <Calendar size={12} /> Member Since
                  </p>
                  <p className="font-ui font-medium text-foreground text-sm">
                    {formatDate(currentUser.createdAt)}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Actions Bar (Spans full width of the 8 columns) */}
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
              <button className="flex items-center justify-center gap-2 py-4 bg-card border border-border text-foreground font-ui font-bold text-xs uppercase tracking-widest hover:bg-accent transition-all rounded-none-force">
                <Settings size={14} /> Preferences
              </button>
              <button
                onClick={handleLogout}
                className="group flex items-center justify-center gap-2 py-4 bg-red-500/5 border border-red-500/20 text-red-500 font-ui font-bold text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all rounded-none-force"
              >
                <LogOut
                  size={14}
                  className="group-hover:-translate-x-1 transition-transform"
                />{" "}
                Sign Out
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
