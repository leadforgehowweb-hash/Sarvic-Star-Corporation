import React, { useState } from 'react';
import { 
  X, Check, RotateCcw, Download, Upload, Copy, 
  Sparkles, Globe, Phone, Mail, MapPin, Building, 
  Layers, Shield, Eye, FileText, CheckCircle2, Sliders, ExternalLink, HelpCircle
} from 'lucide-react';
import { useBrand, BRAND_PRESETS, BrandConfig } from '../context/BrandContext';

interface DeveloperModeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModeModal: React.FC<DeveloperModeModalProps> = ({ isOpen, onClose }) => {
  const { 
    brandConfig, 
    updateBrandConfig, 
    resetToDefaults, 
    loadPreset,
    exportConfigJson,
    importConfigJson
  } = useBrand();

  const [activeTab, setActiveTab] = useState<'brand' | 'contact' | 'location' | 'taglines' | 'json'>('brand');
  const [importJsonText, setImportJsonText] = useState('');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerSavedIndicator = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(exportConfigJson());
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleImportJson = () => {
    setImportError(null);
    if (!importJsonText.trim()) {
      setImportError('Please paste valid JSON text');
      return;
    }
    const success = importConfigJson(importJsonText);
    if (success) {
      triggerSavedIndicator();
      setImportJsonText('');
      alert('Configuration successfully imported and applied site-wide!');
    } else {
      setImportError('Invalid JSON format. Please verify structure.');
    }
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportConfigJson());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${brandConfig.brandShortName.toLowerCase()}_site_config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#071722]/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl border-2 border-[#0288D1] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] font-sans my-auto text-[#0B2838]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Developer Mode Header */}
        <div className="p-4 sm:p-5 bg-[#0B2838] text-white flex flex-wrap items-center justify-between gap-3 border-b border-[#0288D1]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0288D1] to-[#29B6F6] flex items-center justify-center text-white shadow-lg shadow-[#0288D1]/40">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight font-mono">
                  DEVELOPER MODE • GLOBAL SITE CONFIG
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#0288D1] text-white flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE SYNC ACTIVE
                </span>
              </div>
              <p className="text-xs text-[#81D4FA] font-mono">
                Changes apply instantly across every page, header, footer, invoices, and modals.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[11px] font-mono text-gray-300 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
              Shortcut: <kbd className="text-[#81D4FA] font-bold">Ctrl + Shift + D</kbd>
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close Developer Mode"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 1-Click Quick Preset Switcher Bar */}
        <div className="bg-[#E1F5FE] px-4 sm:px-6 py-3 border-b border-[#B3E5FC] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#01579B]">
            <Sparkles className="w-4 h-4 text-[#0288D1]" />
            <span>1-Click Brand Presets:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(BRAND_PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => {
                  loadPreset(key);
                  triggerSavedIndicator();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                  brandConfig.brandShortName.toLowerCase().includes(key === 'howweb' ? 'howweb' : key === 'apex_oem' ? 'apex' : 'medtrend')
                    ? 'bg-[#0288D1] text-white border-[#0288D1] shadow-xs'
                    : 'bg-white text-[#0B2838] border-[#81D4FA] hover:bg-[#B3E5FC]/40'
                }`}
                title={preset.description}
              >
                {preset.label.split(' ')[0]}
              </button>
            ))}

            <button
              onClick={() => {
                if (confirm('Reset all brand configuration back to factory default MEDTREND® values?')) {
                  resetToDefaults();
                  triggerSavedIndicator();
                }
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold text-[#D32F2F] bg-white border border-[#FFCDD2] hover:bg-[#FFEBEE] transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Live Mini Preview Bar */}
        <div className="bg-[#F8FCFE] px-4 sm:px-6 py-2.5 border-b border-[#B3E5FC] flex items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="text-[#355C75] shrink-0">Live Header Preview:</span>
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-[#B3E5FC] shrink-0">
              <div 
                className="w-6 h-6 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-xs"
                style={{
                  background: `linear-gradient(135deg, ${brandConfig.logoConfig.accentGradientStart}, ${brandConfig.logoConfig.accentGradientEnd})`
                }}
              >
                {brandConfig.logoConfig.type === 'custom_image' && brandConfig.logoConfig.customImageUrl ? (
                  <img src={brandConfig.logoConfig.customImageUrl} alt="Logo" className="w-full h-full object-contain rounded" />
                ) : (
                  brandConfig.brandMonogram
                )}
              </div>
              <span className="font-extrabold text-[#0B2838]">{brandConfig.brandName}</span>
              <span className="text-[10px] text-[#0288D1] border-l border-gray-300 pl-1.5 font-sans truncate max-w-[200px]">
                {brandConfig.industrySubtitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#355C75] shrink-0">
            <span className="hidden sm:inline">📞 {brandConfig.contactInfo.primaryPhone}</span>
            <span className="hidden md:inline">✉️ {brandConfig.contactInfo.generalEmail}</span>
            {savedFeedback && (
              <span className="px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-bold border border-[#C8E6C9] animate-in fade-in">
                ✓ Updated Site!
              </span>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#B3E5FC] bg-white px-4 sm:px-6 gap-2 overflow-x-auto font-mono text-xs">
          {[
            { id: 'brand', label: '1. Brand & Logo', icon: Building },
            { id: 'contact', label: '2. Phone & Email', icon: Phone },
            { id: 'location', label: '3. Location & Markets', icon: MapPin },
            { id: 'taglines', label: '4. Slogans & Mission', icon: FileText },
            { id: 'json', label: '5. Backup & JSON', icon: Download }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === tab.id
                    ? 'border-[#0288D1] text-[#0288D1] bg-[#F0F9FF] rounded-t-xl'
                    : 'border-transparent text-[#355C75] hover:text-[#0B2838]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Container */}
        <div className="p-5 sm:p-7 flex-1 overflow-y-auto bg-[#FAFDFF] space-y-6">
          {/* TAB 1: Brand & Logo */}
          {activeTab === 'brand' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Brand Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase">
                    Brand Display Name *
                  </label>
                  <input
                    type="text"
                    value={brandConfig.brandName}
                    onChange={(e) => {
                      updateBrandConfig({ brandName: e.target.value });
                      triggerSavedIndicator();
                    }}
                    placeholder="e.g. MEDTREND® or HOWWEB"
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white focus:bg-white text-[#0B2838] font-bold text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none transition-all shadow-xs"
                  />
                  <p className="text-[11px] text-[#355C75]">
                    Displayed prominently on Navbar, Footer, Banners, and Products.
                  </p>
                </div>

                {/* Brand Monogram / Initials */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase">
                    Logo Monogram Initial(s) (1-3 chars)
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={brandConfig.brandMonogram}
                    onChange={(e) => {
                      updateBrandConfig({ brandMonogram: e.target.value.toUpperCase() });
                      triggerSavedIndicator();
                    }}
                    placeholder="e.g. M or HW"
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] font-black text-sm uppercase focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none transition-all shadow-xs"
                  />
                  <p className="text-[11px] text-[#355C75]">
                    Appears inside the glowing crest icon in header & footer.
                  </p>
                </div>

                {/* Industry Subtitle */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase">
                    Industry Subtitle / Category
                  </label>
                  <input
                    type="text"
                    value={brandConfig.industrySubtitle}
                    onChange={(e) => {
                      updateBrandConfig({ industrySubtitle: e.target.value });
                      triggerSavedIndicator();
                    }}
                    placeholder="e.g. Surgical & Medical Instruments or Web Solutions"
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none transition-all shadow-xs"
                  />
                  <p className="text-[11px] text-[#355C75]">
                    Shown underneath the logo on desktop and mobile.
                  </p>
                </div>

                {/* Registered Mark */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase">
                    Registered Mark Symbol (Optional)
                  </label>
                  <input
                    type="text"
                    value={brandConfig.registeredMark}
                    onChange={(e) => {
                      updateBrandConfig({ registeredMark: e.target.value });
                      triggerSavedIndicator();
                    }}
                    placeholder="e.g. ® or ™ or leave empty"
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none transition-all shadow-xs"
                  />
                </div>

                {/* Legal Entity Full Name */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase">
                    Full Legal Company Name
                  </label>
                  <input
                    type="text"
                    value={brandConfig.fullLegalName}
                    onChange={(e) => {
                      updateBrandConfig({ fullLegalName: e.target.value, companyName: e.target.value });
                      triggerSavedIndicator();
                    }}
                    placeholder="e.g. Medtrend Pvt. Ltd. Surgical & Medical Instruments"
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none transition-all shadow-xs"
                  />
                  <p className="text-[11px] text-[#355C75]">
                    Used in Quality Certificates, Invoices, TDS Data Sheets, and Copyright notices.
                  </p>
                </div>
              </div>

              {/* Logo Visual Customizer & Image Upload */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#81D4FA] space-y-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#B3E5FC] pb-4">
                  <div>
                    <h3 className="text-sm font-bold font-mono uppercase text-[#01579B] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#0288D1]" />
                      <span>Website Logo & Image Branding</span>
                    </h3>
                    <p className="text-xs text-[#355C75] mt-0.5">
                      Upload your official company image logo or choose how it appears across the website.
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 bg-[#F0F9FF] p-1 rounded-xl border border-[#B3E5FC]">
                    <button
                      onClick={() => {
                        updateBrandConfig({
                          logoConfig: { 
                            ...brandConfig.logoConfig, 
                            type: 'custom_image',
                            logoDisplayMode: 'image_and_text'
                          }
                        });
                        triggerSavedIndicator();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                        brandConfig.logoConfig.type === 'custom_image'
                          ? 'bg-[#0288D1] text-white shadow-xs'
                          : 'text-[#355C75] hover:text-[#0B2838]'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Image Logo</span>
                    </button>
                    <button
                      onClick={() => {
                        updateBrandConfig({
                          logoConfig: { 
                            ...brandConfig.logoConfig, 
                            type: 'monogram',
                            logoDisplayMode: 'monogram_and_text'
                          }
                        });
                        triggerSavedIndicator();
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                        brandConfig.logoConfig.type === 'monogram'
                          ? 'bg-[#0288D1] text-white shadow-xs'
                          : 'text-[#355C75] hover:text-[#0B2838]'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Monogram Initial</span>
                    </button>
                  </div>
                </div>

                {/* IMAGE LOGO UPLOAD & CONFIGURATION SECTION */}
                {brandConfig.logoConfig.type === 'custom_image' ? (
                  <div className="space-y-5">
                    {/* Upload / Drag and Drop Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-xs font-mono font-bold text-[#0B2838] uppercase">
                          Upload Logo File (PNG, SVG, JPG, WebP)
                        </label>
                        <label className="border-2 border-dashed border-[#0288D1] hover:border-[#01579B] bg-[#F8FCFE] hover:bg-[#F0F9FF] rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    updateBrandConfig({
                                      logoConfig: {
                                        ...brandConfig.logoConfig,
                                        type: 'custom_image',
                                        customImageUrl: event.target.result as string,
                                        logoShape: brandConfig.logoConfig.logoShape === 'gradient_box' ? 'gradient_box' : 'transparent'
                                      }
                                    });
                                    triggerSavedIndicator();
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <div className="w-12 h-12 rounded-2xl bg-[#E1F5FE] text-[#0288D1] group-hover:scale-110 flex items-center justify-center transition-all mb-2 shadow-xs">
                            <Upload className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-[#0288D1] group-hover:underline">
                            Click to Browse or Drag Image Here
                          </span>
                          <span className="text-[10px] text-[#62879F] mt-1 font-mono">
                            Supports PNG with Transparent Background, SVG, or JPG
                          </span>
                        </label>
                      </div>

                      {/* Direct URL Input */}
                      <div className="space-y-2 flex flex-col justify-between">
                        <div>
                          <label className="block text-xs font-mono font-bold text-[#0B2838] uppercase">
                            Or Enter Direct Image URL
                          </label>
                          <input
                            type="url"
                            value={brandConfig.logoConfig.customImageUrl}
                            onChange={(e) => {
                              updateBrandConfig({
                                logoConfig: { ...brandConfig.logoConfig, customImageUrl: e.target.value }
                              });
                              triggerSavedIndicator();
                            }}
                            placeholder="https://example.com/logo.png or data:image..."
                            className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F8FCFE] text-[#0B2838] text-xs font-mono focus:border-[#0288D1] outline-none"
                          />
                          <p className="text-[10px] text-[#62879F] mt-1">
                            Paste any hosted logo image URL or CDN link.
                          </p>
                        </div>

                        {/* Quick Action / Remove */}
                        {brandConfig.logoConfig.customImageUrl && (
                          <div className="p-3 bg-[#E1F5FE] rounded-xl border border-[#81D4FA] flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <span className="w-2 h-2 rounded-full bg-[#00C853] shrink-0" />
                              <span className="text-[11px] font-mono text-[#01579B] truncate">
                                Custom Logo Active
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                updateBrandConfig({
                                  logoConfig: { ...brandConfig.logoConfig, customImageUrl: '' }
                                });
                                triggerSavedIndicator();
                              }}
                              className="text-[10px] font-mono text-red-600 hover:text-red-700 font-bold bg-white px-2 py-1 rounded-lg border border-red-200 transition-colors shrink-0"
                            >
                              Remove Image
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pre-made Surgical & Star Logo Presets */}
                    <div className="space-y-2 pt-2 border-t border-[#B3E5FC]">
                      <label className="block text-xs font-mono font-bold text-[#0B2838] uppercase flex items-center justify-between">
                        <span>✨ One-Click Sample Logo Emblems</span>
                        <span className="text-[10px] text-[#62879F] font-normal">Click any preset to apply instantly</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {/* Sample 1: Sarvic Star Modern Crest */}
                        <button
                          type="button"
                          onClick={() => {
                            const starSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="22" fill="%230288D1"/><path d="M50 16L59 38L82 41L65 57L70 80L50 68L30 80L35 57L18 41L41 38L50 16Z" fill="white"/><path d="M50 32V68M32 50H68" stroke="%2301579B" stroke-width="5" stroke-linecap="round"/></svg>`;
                            updateBrandConfig({
                              logoConfig: {
                                ...brandConfig.logoConfig,
                                type: 'custom_image',
                                customImageUrl: starSvg
                              }
                            });
                            triggerSavedIndicator();
                          }}
                          className="p-2.5 rounded-xl border border-[#B3E5FC] hover:border-[#0288D1] bg-[#F8FCFE] hover:bg-[#E1F5FE] text-left transition-all flex items-center gap-2 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#0288D1] flex items-center justify-center text-white shrink-0 shadow-xs">
                            <span className="text-base">⭐</span>
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-[11px] font-bold text-[#0B2838] truncate group-hover:text-[#0288D1]">Sarvic Star Crest</div>
                            <div className="text-[9px] text-[#62879F] font-mono">Star & Cross</div>
                          </div>
                        </button>

                        {/* Sample 2: Medical Cross Caduceus */}
                        <button
                          type="button"
                          onClick={() => {
                            const crossSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="22" fill="%230B2838"/><path d="M42 22H58V42H78V58H58V78H42V58H22V42H42V22Z" fill="%2329B6F6"/><circle cx="50" cy="50" r="10" fill="white"/></svg>`;
                            updateBrandConfig({
                              logoConfig: {
                                ...brandConfig.logoConfig,
                                type: 'custom_image',
                                customImageUrl: crossSvg
                              }
                            });
                            triggerSavedIndicator();
                          }}
                          className="p-2.5 rounded-xl border border-[#B3E5FC] hover:border-[#0288D1] bg-[#F8FCFE] hover:bg-[#E1F5FE] text-left transition-all flex items-center gap-2 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#0B2838] flex items-center justify-center text-[#29B6F6] shrink-0 shadow-xs font-bold text-sm">
                            +
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-[11px] font-bold text-[#0B2838] truncate group-hover:text-[#0288D1]">Clinical Cross</div>
                            <div className="text-[9px] text-[#62879F] font-mono">Cyan on Navy</div>
                          </div>
                        </button>

                        {/* Sample 3: Titanium Scalpel Shield */}
                        <button
                          type="button"
                          onClick={() => {
                            const shieldSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><path d="M50 12L80 24V50C80 70 50 88 50 88C50 88 20 70 20 50V24L50 12Z" fill="%230288D1"/><path d="M50 25L54 44L72 47L58 60L62 78L50 68L38 78L42 60L28 47L46 44L50 25Z" fill="white"/></svg>`;
                            updateBrandConfig({
                              logoConfig: {
                                ...brandConfig.logoConfig,
                                type: 'custom_image',
                                customImageUrl: shieldSvg
                              }
                            });
                            triggerSavedIndicator();
                          }}
                          className="p-2.5 rounded-xl border border-[#B3E5FC] hover:border-[#0288D1] bg-[#F8FCFE] hover:bg-[#E1F5FE] text-left transition-all flex items-center gap-2 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#0288D1] flex items-center justify-center text-white shrink-0 shadow-xs">
                            <Shield className="w-4 h-4 text-white" />
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-[11px] font-bold text-[#0B2838] truncate group-hover:text-[#0288D1]">Precision Shield</div>
                            <div className="text-[9px] text-[#62879F] font-mono">Security Crest</div>
                          </div>
                        </button>

                        {/* Sample 4: Golden Sialkot Eagle / Crown */}
                        <button
                          type="button"
                          onClick={() => {
                            const crownSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="22" fill="%2301579B"/><path d="M25 65L20 35L38 48L50 25L62 48L80 35L75 65H25Z" fill="%23FFD54F"/><circle cx="50" cy="52" r="6" fill="%2301579B"/></svg>`;
                            updateBrandConfig({
                              logoConfig: {
                                ...brandConfig.logoConfig,
                                type: 'custom_image',
                                customImageUrl: crownSvg
                              }
                            });
                            triggerSavedIndicator();
                          }}
                          className="p-2.5 rounded-xl border border-[#B3E5FC] hover:border-[#0288D1] bg-[#F8FCFE] hover:bg-[#E1F5FE] text-left transition-all flex items-center gap-2 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#01579B] flex items-center justify-center text-[#FFD54F] shrink-0 shadow-xs font-bold">
                            👑
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-[11px] font-bold text-[#0B2838] truncate group-hover:text-[#0288D1]">Crown Emblem</div>
                            <div className="text-[9px] text-[#62879F] font-mono">Gold & Blue</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Logo Display Mode & Sizing Settings */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#B3E5FC]">
                      {/* Display Mode */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono font-bold text-[#0B2838] uppercase">
                          Header Display Mode
                        </label>
                        <select
                          value={brandConfig.logoConfig.logoDisplayMode || 'image_and_text'}
                          onChange={(e) => {
                            updateBrandConfig({
                              logoConfig: {
                                ...brandConfig.logoConfig,
                                logoDisplayMode: e.target.value as any
                              }
                            });
                            triggerSavedIndicator();
                          }}
                          className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F8FCFE] text-[#0B2838] text-xs font-mono focus:border-[#0288D1] outline-none"
                        >
                          <option value="image_and_text">Image Logo + Brand Text</option>
                          <option value="image_only">Full Graphic Banner (Image Only)</option>
                          <option value="monogram_and_text">Monogram Initial + Brand Text</option>
                        </select>
                      </div>

                      {/* Logo Container Shape */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono font-bold text-[#0B2838] uppercase">
                          Logo Background / Shape
                        </label>
                        <select
                          value={brandConfig.logoConfig.logoShape || 'transparent'}
                          onChange={(e) => {
                            updateBrandConfig({
                              logoConfig: {
                                ...brandConfig.logoConfig,
                                logoShape: e.target.value as any
                              }
                            });
                            triggerSavedIndicator();
                          }}
                          className="w-full p-2.5 rounded-xl border border-[#B3E5FC] bg-[#F8FCFE] text-[#0B2838] text-xs font-mono focus:border-[#0288D1] outline-none"
                        >
                          <option value="transparent">Clean / Transparent (No Background Box)</option>
                          <option value="circle">Clean White Circle (Emblem Seal)</option>
                          <option value="white_box">Clean White Box (Padded Card)</option>
                          <option value="gradient_box">Colored Gradient Box</option>
                        </select>
                      </div>

                      {/* Logo Height / Scale */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono font-bold text-[#0B2838] uppercase">
                          Logo Size: {brandConfig.logoConfig.logoHeight || 44}px
                        </label>
                        <input
                          type="range"
                          min={32}
                          max={68}
                          step={2}
                          value={brandConfig.logoConfig.logoHeight || 44}
                          onChange={(e) => {
                            updateBrandConfig({
                              logoConfig: {
                                ...brandConfig.logoConfig,
                                logoHeight: Number(e.target.value)
                              }
                            });
                            triggerSavedIndicator();
                          }}
                          className="w-full h-2 bg-[#B3E5FC] rounded-lg appearance-none cursor-pointer accent-[#0288D1] mt-2"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* MONOGRAM GRADIENT CONTROLS */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#0B2838] mb-1">
                        Gradient Start Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={brandConfig.logoConfig.accentGradientStart}
                          onChange={(e) => {
                            updateBrandConfig({
                              logoConfig: { ...brandConfig.logoConfig, accentGradientStart: e.target.value }
                            });
                            triggerSavedIndicator();
                          }}
                          className="w-10 h-10 rounded-xl cursor-pointer border border-gray-300"
                        />
                        <input
                          type="text"
                          value={brandConfig.logoConfig.accentGradientStart}
                          onChange={(e) => {
                            updateBrandConfig({
                              logoConfig: { ...brandConfig.logoConfig, accentGradientStart: e.target.value }
                            });
                            triggerSavedIndicator();
                          }}
                          className="p-2 rounded-xl border border-[#B3E5FC] text-xs font-mono w-28 uppercase"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-[#0B2838] mb-1">
                        Gradient End Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={brandConfig.logoConfig.accentGradientEnd}
                          onChange={(e) => {
                            updateBrandConfig({
                              logoConfig: { ...brandConfig.logoConfig, accentGradientEnd: e.target.value }
                            });
                            triggerSavedIndicator();
                          }}
                          className="w-10 h-10 rounded-xl cursor-pointer border border-gray-300"
                        />
                        <input
                          type="text"
                          value={brandConfig.logoConfig.accentGradientEnd}
                          onChange={(e) => {
                            updateBrandConfig({
                              logoConfig: { ...brandConfig.logoConfig, accentGradientEnd: e.target.value }
                            });
                            triggerSavedIndicator();
                          }}
                          className="p-2 rounded-xl border border-[#B3E5FC] text-xs font-mono w-28 uppercase"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* LIVE LOGO PREVIEW MATRIX */}
                <div className="pt-4 border-t border-[#B3E5FC] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono uppercase text-[#01579B] flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#0288D1]" />
                      <span>Live Multi-Surface Logo Preview</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#62879F]">Real-time rendering test</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Preview 1: Light Navbar Surface */}
                    <div className="p-4 rounded-xl bg-white border border-[#B3E5FC] flex items-center gap-3 shadow-xs">
                      {brandConfig.logoConfig.logoDisplayMode === 'image_only' && brandConfig.logoConfig.type === 'custom_image' && brandConfig.logoConfig.customImageUrl ? (
                        <img 
                          src={brandConfig.logoConfig.customImageUrl} 
                          alt={brandConfig.brandName} 
                          style={{ height: `${brandConfig.logoConfig.logoHeight || 44}px` }}
                          className="w-auto max-w-[200px] object-contain" 
                        />
                      ) : (
                        <>
                          <div 
                            className={`flex items-center justify-center shrink-0 overflow-hidden transition-all ${
                              brandConfig.logoConfig.logoShape === 'circle' 
                                ? 'rounded-full bg-white border border-[#B3E5FC]' 
                                : brandConfig.logoConfig.logoShape === 'white_box'
                                ? 'rounded-xl bg-white border border-[#B3E5FC] p-1'
                                : brandConfig.logoConfig.logoShape === 'gradient_box'
                                ? 'rounded-xl text-white shadow-md shadow-[#0288D1]/20 p-1'
                                : 'bg-transparent'
                            }`}
                            style={{
                              width: `${brandConfig.logoConfig.logoHeight || 44}px`,
                              height: `${brandConfig.logoConfig.logoHeight || 44}px`,
                              background: brandConfig.logoConfig.logoShape === 'gradient_box' 
                                ? `linear-gradient(135deg, ${brandConfig.logoConfig.accentGradientStart}, ${brandConfig.logoConfig.accentGradientEnd})`
                                : undefined
                            }}
                          >
                            {brandConfig.logoConfig.type === 'custom_image' && brandConfig.logoConfig.customImageUrl ? (
                              <img 
                                src={brandConfig.logoConfig.customImageUrl} 
                                alt={brandConfig.brandName} 
                                className="w-full h-full object-contain" 
                              />
                            ) : (
                              <div 
                                className="w-full h-full rounded-xl flex items-center justify-center text-white font-black text-lg shadow-xs"
                                style={{
                                  background: `linear-gradient(135deg, ${brandConfig.logoConfig.accentGradientStart}, ${brandConfig.logoConfig.accentGradientEnd})`
                                }}
                              >
                                {brandConfig.brandMonogram || 'M'}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-black text-base text-[#0B2838] tracking-tight">
                                {brandConfig.brandName.replace(/[®™]/g, '').trim()}
                              </span>
                              {(brandConfig.registeredMark || /[®™]/.test(brandConfig.brandName)) && (
                                <span className="text-[9px] font-mono font-bold bg-[#E1F5FE] text-[#01579B] px-1 rounded border border-[#81D4FA]">
                                  {brandConfig.registeredMark || '®'}
                                </span>
                              )}
                            </div>
                            <p className="text-[9px] font-mono text-[#355C75] uppercase tracking-wider">
                              {brandConfig.industrySubtitle}
                            </p>
                          </div>
                        </>
                      )}
                      <span className="ml-auto text-[9px] font-mono text-[#62879F] uppercase bg-[#F0F9FF] px-2 py-0.5 rounded border border-[#B3E5FC]">
                        Navbar (Light)
                      </span>
                    </div>

                    {/* Preview 2: Dark Navy Header / Banners */}
                    <div className="p-4 rounded-xl bg-[#0B2838] border border-[#0288D1]/40 flex items-center gap-3 shadow-xs text-white">
                      {brandConfig.logoConfig.logoDisplayMode === 'image_only' && brandConfig.logoConfig.type === 'custom_image' && brandConfig.logoConfig.customImageUrl ? (
                        <img 
                          src={brandConfig.logoConfig.customImageUrl} 
                          alt={brandConfig.brandName} 
                          style={{ height: `${brandConfig.logoConfig.logoHeight || 44}px` }}
                          className="w-auto max-w-[200px] object-contain brightness-110" 
                        />
                      ) : (
                        <>
                          <div 
                            className={`flex items-center justify-center shrink-0 overflow-hidden transition-all ${
                              brandConfig.logoConfig.logoShape === 'circle' 
                                ? 'rounded-full bg-white/10 border border-white/20' 
                                : brandConfig.logoConfig.logoShape === 'white_box'
                                ? 'rounded-xl bg-white/10 border border-white/20 p-1'
                                : brandConfig.logoConfig.logoShape === 'gradient_box'
                                ? 'rounded-xl text-white shadow-md shadow-[#0288D1]/30 p-1'
                                : 'bg-transparent'
                            }`}
                            style={{
                              width: `${brandConfig.logoConfig.logoHeight || 44}px`,
                              height: `${brandConfig.logoConfig.logoHeight || 44}px`,
                              background: brandConfig.logoConfig.logoShape === 'gradient_box' 
                                ? `linear-gradient(135deg, ${brandConfig.logoConfig.accentGradientStart}, ${brandConfig.logoConfig.accentGradientEnd})`
                                : undefined
                            }}
                          >
                            {brandConfig.logoConfig.type === 'custom_image' && brandConfig.logoConfig.customImageUrl ? (
                              <img 
                                src={brandConfig.logoConfig.customImageUrl} 
                                alt={brandConfig.brandName} 
                                className="w-full h-full object-contain" 
                              />
                            ) : (
                              <div 
                                className="w-full h-full rounded-xl flex items-center justify-center text-white font-black text-lg shadow-xs"
                                style={{
                                  background: `linear-gradient(135deg, ${brandConfig.logoConfig.accentGradientStart}, ${brandConfig.logoConfig.accentGradientEnd})`
                                }}
                              >
                                {brandConfig.brandMonogram || 'M'}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-black text-base text-white tracking-tight">
                                {brandConfig.brandName.replace(/[®™]/g, '').trim()}
                              </span>
                              {(brandConfig.registeredMark || /[®™]/.test(brandConfig.brandName)) && (
                                <span className="text-[9px] font-mono font-bold bg-[#0288D1] text-white px-1 rounded">
                                  {brandConfig.registeredMark || '®'}
                                </span>
                              )}
                            </div>
                            <p className="text-[9px] font-mono text-[#81D4FA] uppercase tracking-wider">
                              {brandConfig.industrySubtitle}
                            </p>
                          </div>
                        </>
                      )}
                      <span className="ml-auto text-[9px] font-mono text-[#81D4FA] uppercase bg-black/40 px-2 py-0.5 rounded border border-white/10">
                        Dark Surface
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Phone Numbers & Emails */}
          {activeTab === 'contact' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Primary Phone */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#0288D1]" />
                    <span>Primary Hotline / HQ Phone *</span>
                  </label>
                  <input
                    type="text"
                    value={brandConfig.contactInfo.primaryPhone}
                    onChange={(e) => {
                      updateBrandConfig({
                        contactInfo: { ...brandConfig.contactInfo, primaryPhone: e.target.value }
                      });
                      triggerSavedIndicator();
                    }}
                    placeholder="+92 (52) 429-1800"
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] font-mono text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none shadow-xs"
                  />
                  <p className="text-[11px] text-[#355C75]">
                    Shown in the footer contact block and checkout support.
                  </p>
                </div>

                {/* B2B Direct Phone */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#0288D1]" />
                    <span>B2B Direct Desk Phone</span>
                  </label>
                  <input
                    type="text"
                    value={brandConfig.contactInfo.b2bDirectDeskPhone}
                    onChange={(e) => {
                      updateBrandConfig({
                        contactInfo: { ...brandConfig.contactInfo, b2bDirectDeskPhone: e.target.value }
                      });
                      triggerSavedIndicator();
                    }}
                    placeholder="+92 (52) 429-1801"
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] font-mono text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none shadow-xs"
                  />
                  <p className="text-[11px] text-[#355C75]">
                    Used in wholesale quotation requests and tender inquiries.
                  </p>
                </div>

                {/* WhatsApp Support */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>WhatsApp Direct Support Number</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={brandConfig.contactInfo.whatsapp}
                      onChange={(e) => {
                        updateBrandConfig({
                          contactInfo: { ...brandConfig.contactInfo, whatsapp: e.target.value }
                        });
                        triggerSavedIndicator();
                      }}
                      placeholder="+92 300 4291800"
                      className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] font-mono text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none shadow-xs"
                    />
                    <a
                      href={`https://wa.me/${brandConfig.contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors shadow-xs"
                      title="Test WhatsApp Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase">
                    Support Working Hours
                  </label>
                  <input
                    type="text"
                    value={brandConfig.contactInfo.workingHours}
                    onChange={(e) => {
                      updateBrandConfig({
                        contactInfo: { ...brandConfig.contactInfo, workingHours: e.target.value }
                      });
                      triggerSavedIndicator();
                    }}
                    placeholder="Mon - Sat: 8:00 AM - 6:00 PM PKT (UTC+5)"
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none shadow-xs"
                  />
                </div>

                {/* General Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#0288D1]" />
                    <span>General Inquiries Email *</span>
                  </label>
                  <input
                    type="email"
                    value={brandConfig.contactInfo.generalEmail}
                    onChange={(e) => {
                      updateBrandConfig({
                        contactInfo: { ...brandConfig.contactInfo, generalEmail: e.target.value }
                      });
                      triggerSavedIndicator();
                    }}
                    placeholder="info@medtrend.com"
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] font-mono text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none shadow-xs"
                  />
                </div>

                {/* Export / Wholesale Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#0288D1]" />
                    <span>Export / Institutional Trade Email</span>
                  </label>
                  <input
                    type="email"
                    value={brandConfig.contactInfo.exportEmail}
                    onChange={(e) => {
                      updateBrandConfig({
                        contactInfo: { ...brandConfig.contactInfo, exportEmail: e.target.value }
                      });
                      triggerSavedIndicator();
                    }}
                    placeholder="export@medtrendinstruments.com"
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] font-mono text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none shadow-xs"
                  />
                </div>

                {/* Support Email */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#0288D1]" />
                    <span>Customer Support & Order Tracking Email</span>
                  </label>
                  <input
                    type="email"
                    value={brandConfig.contactInfo.supportEmail}
                    onChange={(e) => {
                      updateBrandConfig({
                        contactInfo: { ...brandConfig.contactInfo, supportEmail: e.target.value }
                      });
                      triggerSavedIndicator();
                    }}
                    placeholder="support@medtrend.com"
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] font-mono text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none shadow-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Location & Markets */}
          {activeTab === 'location' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* HQ Address */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0288D1]" />
                    <span>Manufacturing HQ / Street Address *</span>
                  </label>
                  <input
                    type="text"
                    value={brandConfig.contactInfo.hqAddress}
                    onChange={(e) => {
                      updateBrandConfig({
                        contactInfo: { ...brandConfig.contactInfo, hqAddress: e.target.value }
                      });
                      triggerSavedIndicator();
                    }}
                    placeholder="Small Industrial Estate, Sialkot 51310, Punjab, Pakistan"
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none shadow-xs"
                  />
                  <p className="text-[11px] text-[#355C75]">
                    Displayed on the footer, About Us page, and official commercial invoices.
                  </p>
                </div>

                {/* Origin */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase">
                    City of Origin / Manufacturing Hub
                  </label>
                  <input
                    type="text"
                    value={brandConfig.origin}
                    onChange={(e) => {
                      updateBrandConfig({ origin: e.target.value });
                      triggerSavedIndicator();
                    }}
                    placeholder="Sialkot, Pakistan"
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none shadow-xs"
                  />
                </div>

                {/* Country */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase">
                    Country
                  </label>
                  <input
                    type="text"
                    value={brandConfig.contactInfo.country}
                    onChange={(e) => {
                      updateBrandConfig({
                        contactInfo: { ...brandConfig.contactInfo, country: e.target.value }
                      });
                      triggerSavedIndicator();
                    }}
                    placeholder="Pakistan"
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none shadow-xs"
                  />
                </div>

                {/* Primary Export Markets */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#0288D1]" />
                    <span>Global Export & Serving Markets (Comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    value={brandConfig.primaryMarkets.join(', ')}
                    onChange={(e) => {
                      const markets = e.target.value.split(',').map(m => m.trim()).filter(Boolean);
                      updateBrandConfig({ primaryMarkets: markets });
                      triggerSavedIndicator();
                    }}
                    placeholder="United States, European Union, GCC Countries, Worldwide"
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] font-mono text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none shadow-xs"
                  />
                  <p className="text-[11px] text-[#355C75]">
                    Shown in the top announcement utility bar (e.g. Markets: USA • EU • GCC • Worldwide).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Taglines & Slogans */}
          {activeTab === 'taglines' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="space-y-4">
                {/* Primary Tagline */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase">
                    Primary Brand Tagline / Slogan *
                  </label>
                  <input
                    type="text"
                    value={brandConfig.tagline}
                    onChange={(e) => {
                      updateBrandConfig({ tagline: e.target.value });
                      triggerSavedIndicator();
                    }}
                    placeholder="Precision You Can Trust."
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] font-bold text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none shadow-xs"
                  />
                </div>

                {/* Secondary Tagline */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase">
                    Secondary Tagline / Alternative
                  </label>
                  <input
                    type="text"
                    value={brandConfig.secondaryTagline}
                    onChange={(e) => {
                      updateBrandConfig({ secondaryTagline: e.target.value });
                      triggerSavedIndicator();
                    }}
                    placeholder="Crafted for Precision. Built for Care."
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] text-sm focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none shadow-xs"
                  />
                </div>

                {/* Positioning Statement */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-[#0B2838] uppercase">
                    Positioning Statement & About Paragraph
                  </label>
                  <textarea
                    rows={4}
                    value={brandConfig.positioningStatement}
                    onChange={(e) => {
                      updateBrandConfig({ positioningStatement: e.target.value });
                      triggerSavedIndicator();
                    }}
                    placeholder="Describe your brand, heritage, manufacturing capabilities, and global distribution promise..."
                    className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-white text-[#0B2838] text-xs leading-relaxed focus:border-[#0288D1] focus:ring-2 focus:ring-[#B3E5FC] outline-none shadow-xs"
                  />
                  <p className="text-[11px] text-[#355C75]">
                    Appears in the About Us page header, brand guidelines, and footer overview.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Backup & JSON */}
          {activeTab === 'json' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-5 rounded-2xl bg-white border border-[#B3E5FC] space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold font-mono uppercase text-[#01579B]">
                      Raw JSON Configuration & Backup
                    </h3>
                    <p className="text-[11px] text-[#355C75]">
                      Export your brand settings to a file, or paste existing settings to restore anytime.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyJson}
                      className="px-3.5 py-1.5 rounded-xl bg-[#0288D1] text-white font-mono text-xs font-bold hover:bg-[#0277BD] transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedNotification ? 'Copied!' : 'Copy JSON'}</span>
                    </button>
                    <button
                      onClick={handleDownloadJson}
                      className="px-3.5 py-1.5 rounded-xl bg-white border border-[#B3E5FC] text-[#0B2838] hover:bg-[#E1F5FE] font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5 text-[#0288D1]" />
                      <span>Download .JSON</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#071722] text-[#81D4FA] p-4 rounded-2xl font-mono text-xs overflow-x-auto max-h-56 border border-[#0288D1]/30">
                  <pre>{exportConfigJson()}</pre>
                </div>
              </div>

              {/* Import Custom JSON */}
              <div className="p-5 rounded-2xl bg-white border border-[#B3E5FC] space-y-3 shadow-sm">
                <h3 className="text-xs font-bold font-mono uppercase text-[#0B2838]">
                  Import Custom JSON Configuration
                </h3>
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste exported JSON configuration here..."
                  className="w-full p-3 rounded-xl border border-[#B3E5FC] bg-[#F8FCFE] font-mono text-xs text-[#0B2838] focus:bg-white focus:border-[#0288D1] outline-none"
                />
                {importError && (
                  <p className="text-xs text-red-600 font-mono font-bold">⚠️ {importError}</p>
                )}
                <button
                  onClick={handleImportJson}
                  className="px-5 py-2.5 rounded-xl bg-[#0288D1] hover:bg-[#0277BD] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#0288D1]/25 flex items-center gap-2"
                >
                  <Upload className="w-4 h-4 text-[#B3E5FC]" />
                  <span>Apply Imported Configuration</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#F0F9FF] border-t border-[#B3E5FC] flex flex-wrap items-center justify-between gap-3 font-mono">
          <div className="flex items-center gap-2 text-xs text-[#355C75]">
            <CheckCircle2 className="w-4 h-4 text-[#0288D1]" />
            <span>All modifications are saved automatically to browser storage.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#0288D1] hover:bg-[#0277BD] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#0288D1]/30"
            >
              Done & View Live Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
