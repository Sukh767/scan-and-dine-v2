import React from 'react';
import { 
  MapPin, 
  Phone, 
  Globe,  
  Clock, 
  ShieldAlert, 
  Award, 
  UtensilsCrossed,
  MailCheck,
  ShoppingCart,
  Router,
  BirdIcon
} from 'lucide-react';



// Static Data Object based on your API response
const restaurantData = {
  id: "6a46be379ccac57d586c9473",
  ownerId: "6a456cecf997f58e8bd4a5b8",
  name: "Spice Garden",
  slug: "spice-garden",
  description: "Premium multi-cuisine family restaurant serving authentic Indian and Asian dishes.",
  logo: {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80", // Using a premium placeholder as the Cloudinary link may require authentication or specific tokens
    publicId: "restaurants/logos/hwf3esdmdrhpbjl3xukk"
  },
  coverImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80", // High-quality generic restaurant cover placeholder
  cuisineTypes: ["Indian", "Chinese", "Continental"],
  priceRange: "₹₹",
  phone: "+91 98765 43210",
  email: "peetersparker617@gmail.com",
  website: "https://spicegarden.com",
  socialMedia: {
    instagram: "https://instagram.com/spicegarden",
    facebook: "https://facebook.com/spicegarden",
    x: "https://x.com/spicegarden"
  },
  address: {
    street: "123 MG Road",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    pincode: "500001"
  },
  operationalStatus: "closed",
  approvalStatus: "pending",
  subscription: {
    plan: "free",
    status: "trial"
  }
};

export default function Discovery() {
  const r = restaurantData;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans pb-12">
      {/* Cover Image Banner */}
      <div className="relative h-64 md:h-80 w-full bg-slate-900 overflow-hidden">
        <img 
          src={r.coverImage} 
          alt={`${r.name} banner`} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        
        {/* Header Profile Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6 border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            
            {/* Logo and Core Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden bg-white border-2 border-white shadow-md flex-shrink-0">
                <img src={r.logo.url} alt={r.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{r.name}</h1>
                  <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    {r.priceRange} Premium
                  </span>
                </div>
                <p className="text-slate-500 mt-1 max-w-xl text-sm md:text-base">{r.description}</p>
                
                {/* Cuisine Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {r.cuisineTypes.map((cuisine) => (
                    <span key={cuisine} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200/60">
                      <UtensilsCrossed size={12} />
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Badges Section */}
            <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 pt-4 md:pt-0 border-t border-slate-100 md:border-0 w-full md:w-auto">
              <div className="flex items-center gap-2 bg-rose-50 text-rose-700 px-3 py-1.5 rounded-xl border border-rose-100 text-sm font-medium w-fit">
                <Clock size={16} />
                <span className="capitalize">Currently {r.operationalStatus}</span>
              </div>
              <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl border border-amber-100 text-sm font-medium w-fit">
                <ShieldAlert size={16} />
                <span className="capitalize">Approval: {r.approvalStatus}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column: Contact & Location */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Address & Location Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="text-slate-400" size={20} />
                Location & Address
              </h2>
              <div className="text-slate-600 space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="font-medium text-slate-800">{r.address.street}</p>
                <p>{r.address.city}, {r.address.state} — {r.address.pincode}</p>
                <p className="text-xs text-slate-400 mt-2 font-mono">Country: {r.address.country}</p>
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href={`tel:${r.phone}`} className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-100 transition-colors">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Call Us</p>
                    <p className="text-sm font-semibold text-slate-700">{r.phone}</p>
                  </div>
                </a>

                <a href={`mailto:${r.email}`} className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <MailCheck size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-slate-400 font-medium">Email Address</p>
                    <p className="text-sm font-semibold text-slate-700 truncate">{r.email}</p>
                  </div>
                </a>

                <a href={r.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group sm:col-span-2">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-100 transition-colors">
                    <Globe size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Official Website</p>
                    <p className="text-sm font-semibold text-slate-700">{r.website}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar (Subscription & Socials) */}
          <div className="space-y-6">
            
            {/* Membership / Account Status */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-slate-700/20 pointer-events-none">
                <Award size={140} />
              </div>
              <h3 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">Account Tier</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-black uppercase tracking-tight">{r.subscription.plan} Plan</span>
                <span className="text-xs bg-slate-700 text-slate-200 px-2 py-0.5 rounded-md capitalize font-medium">{r.subscription.status}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Registered on {new Date(r.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Social Ecosystem</h3>
              <div className="space-y-2">
                <a href={r.socialMedia.instagram} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl hover:bg-rose-50/50 group transition-colors border border-transparent hover:border-rose-100">
                  <div className="flex items-center gap-3">
                    <Router size={18} className="text-slate-400 group-hover:text-rose-600 transition-colors" />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Instagram</span>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-rose-600 transition-transform group-hover:translate-x-0.5 transition-colors">→</span>
                </a>

                <a href={r.socialMedia.facebook} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50/50 group transition-colors border border-transparent hover:border-blue-100">
                  <div className="flex items-center gap-3">
                    <ShoppingCart size={18} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Facebook</span>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5 transition-colors">→</span>
                </a>

                <a href={r.socialMedia.x} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100/50 group transition-colors border border-transparent hover:border-slate-200">
                  <div className="flex items-center gap-3">
                    <BirdIcon size={18} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">X / Twitter</span>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-slate-900 transition-transform group-hover:translate-x-0.5 transition-colors">→</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}