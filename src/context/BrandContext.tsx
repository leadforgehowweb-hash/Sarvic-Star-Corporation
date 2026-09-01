import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRAND_CONFIG as DEFAULT_BRAND_DATA } from '../data/brandData';

export interface BrandConfig {
  brandName: string;
  brandShortName: string;
  brandMonogram: string;
  registeredMark: string;
  companyName: string;
  fullLegalName: string;
  industrySubtitle: string;
  tagline: string;
  secondaryTagline: string;
  positioningStatement: string;
  origin: string;
  primaryMarkets: string[];
  contactInfo: {
    primaryPhone: string;
    b2bDirectDeskPhone: string;
    whatsapp: string;
    generalEmail: string;
    exportEmail: string;
    supportEmail: string;
    hqAddress: string;
    cityState: string;
    country: string;
    workingHours: string;
  };
  logoConfig: {
    type: 'monogram' | 'custom_image';
    customImageUrl: string;
    logoDisplayMode?: 'image_and_text' | 'image_only' | 'monogram_and_text';
    logoShape?: 'transparent' | 'circle' | 'white_box' | 'gradient_box' | 'rounded' | 'square';
    logoHeight?: number;
    accentGradientStart: string;
    accentGradientEnd: string;
  };
  socialLinks: {
    website: string;
    linkedin: string;
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

export const INITIAL_BRAND_CONFIG: BrandConfig = {
  brandName: 'Sarvic Star Corporation',
  brandShortName: 'SARVIC STAR',
  brandMonogram: 'SSC',
  registeredMark: '®',
  companyName: 'Sarvic Star Corporation',
  fullLegalName: 'Sarvic Star Corporation Surgical & Medical Instruments',
  industrySubtitle: 'Surgical & Medical Instruments',
  tagline: 'Excellence in Surgical Craftsmanship.',
  secondaryTagline: 'Precision Engineered Instruments • Trusted Globally',
  positioningStatement: 'Sarvic Star Corporation is a premier manufacturer and international exporter of high-precision surgical, dental, orthopedic, and veterinary instruments crafted in Sialkot, Pakistan to strict international quality standards.',
  origin: 'Sialkot, Pakistan',
  primaryMarkets: ['United States', 'United Kingdom', 'European Union', 'GCC & Middle East', 'Worldwide'],
  contactInfo: {
    primaryPhone: '+92 (52) 436-0500',
    b2bDirectDeskPhone: '+92 300 6100500',
    whatsapp: '+92 300 6100500',
    generalEmail: 'info@sarvicstar.com',
    exportEmail: 'export@sarvicstar.com',
    supportEmail: 'support@sarvicstar.com',
    hqAddress: 'Industrial Estate, Daska Road, Sialkot 51310, Punjab, Pakistan',
    cityState: 'Sialkot, Punjab 51310',
    country: 'Pakistan',
    workingHours: 'Mon - Sat: 8:00 AM - 6:00 PM PKT'
  },
  logoConfig: {
    type: 'custom_image',
    customImageUrl: '/logossc.jpg',
    logoDisplayMode: 'image_and_text',
    logoShape: 'transparent',
    logoHeight: 48,
    accentGradientStart: '#0288D1',
    accentGradientEnd: '#00B0FF'
  },
  socialLinks: {
    website: 'https://sarvicstar.com',
    linkedin: 'https://linkedin.com/company/sarvic-star',
    facebook: 'https://facebook.com/sarvicstar',
    instagram: 'https://instagram.com/sarvicstar',
    twitter: 'https://twitter.com/sarvicstar'
  }
};

export const BRAND_PRESETS: Record<string, { label: string; description: string; config: BrandConfig }> = {
  sarvic_star: {
    label: 'Sarvic Star Corporation ® (Surgical Instruments)',
    description: 'Precision Surgical, Dental, Orthopedic & Hollowware Manufacturer Profile',
    config: {
      brandName: 'Sarvic Star Corporation',
      brandShortName: 'SARVIC STAR',
      brandMonogram: 'SSC',
      registeredMark: '®',
      companyName: 'Sarvic Star Corporation',
      fullLegalName: 'Sarvic Star Corporation Surgical & Medical Instruments',
      industrySubtitle: 'Surgical & Medical Instruments',
      tagline: 'Excellence in Surgical Craftsmanship.',
      secondaryTagline: 'Precision Engineered Instruments • Trusted Globally',
      positioningStatement: 'Sarvic Star Corporation is a premier manufacturer and international exporter of high-precision surgical, dental, orthopedic, and veterinary instruments crafted to strict international quality standards.',
      origin: 'Sialkot, Pakistan',
      primaryMarkets: ['United States', 'United Kingdom', 'European Union', 'GCC & Middle East', 'Worldwide'],
      contactInfo: {
        primaryPhone: '+92 (52) 436-0500',
        b2bDirectDeskPhone: '+92 300 6100500',
        whatsapp: '+92 300 6100500',
        generalEmail: 'info@sarvicstar.com',
        exportEmail: 'export@sarvicstar.com',
        supportEmail: 'support@sarvicstar.com',
        hqAddress: 'Industrial Estate, Daska Road, Sialkot 51310, Punjab, Pakistan',
        cityState: 'Sialkot, Punjab 51310',
        country: 'Pakistan',
        workingHours: 'Mon - Sat: 8:00 AM - 6:00 PM PKT'
      },
      logoConfig: {
        type: 'custom_image',
        customImageUrl: '/logossc.jpg',
        logoDisplayMode: 'image_and_text',
        logoShape: 'transparent',
        logoHeight: 48,
        accentGradientStart: '#0288D1',
        accentGradientEnd: '#00B0FF'
      },
      socialLinks: {
        website: 'https://sarvicstar.com',
        linkedin: 'https://linkedin.com/company/sarvic-star',
        facebook: 'https://facebook.com/sarvicstar',
        instagram: 'https://instagram.com/sarvicstar',
        twitter: 'https://twitter.com/sarvicstar'
      }
    }
  },
  sarvic_star_default: {
    label: 'Sarvic Star Corporation (Default)',
    description: 'Sialkot Manufacturing HQ, Precision German Metallurgy & Global Export',
    config: { ...INITIAL_BRAND_CONFIG }
  },
  howweb: {
    label: 'HowWeb Digital Solutions & Tech',
    description: 'Modern Web, Software & Digital Engineering Agency Profile',
    config: {
      brandName: 'HOWWEB',
      brandShortName: 'HOWWEB',
      brandMonogram: 'HW',
      registeredMark: '™',
      companyName: 'HowWeb Technologies Pvt. Ltd.',
      fullLegalName: 'HowWeb Technologies & Digital Solutions International',
      industrySubtitle: 'Digital Platforms & Web Engineering',
      tagline: 'Empowering Digital Innovation Worldwide.',
      secondaryTagline: 'Engineered for Performance • Built for Scale',
      positioningStatement: 'HowWeb delivers state-of-the-art web architectures, digital enterprise applications, and bespoke technological solutions tailored for global brands and modern commerce.',
      origin: 'Lahore & Sialkot, Pakistan',
      primaryMarkets: ['Global', 'North America', 'United Kingdom', 'Middle East', 'Asia Pacific'],
      contactInfo: {
        primaryPhone: '+92 (42) 358-9900',
        b2bDirectDeskPhone: '+92 300 8884699',
        whatsapp: '+92 300 8884699',
        generalEmail: 'contact@howweb.io',
        exportEmail: 'solutions@howweb.io',
        supportEmail: 'helpdesk@howweb.io',
        hqAddress: 'Suite 402, IT Tower, Hali Road, Gulberg III, Lahore, Pakistan',
        cityState: 'Lahore / Sialkot, Punjab',
        country: 'Pakistan',
        workingHours: 'Mon - Fri: 9:00 AM - 7:00 PM PKT (UTC+5)'
      },
      logoConfig: {
        type: 'monogram',
        customImageUrl: '',
        accentGradientStart: '#0288D1',
        accentGradientEnd: '#00B0FF'
      },
      socialLinks: {
        website: 'https://howweb.io',
        linkedin: 'https://linkedin.com/company/howweb-tech',
        facebook: 'https://facebook.com/howwebtech',
        instagram: 'https://instagram.com/howweb.official',
        twitter: 'https://twitter.com/howwebio'
      }
    }
  },
  apex_oem: {
    label: 'APEX Healthcare OEM & Precision Lab',
    description: 'Medical Device Manufacturing & Hospital Supply Profile',
    config: {
      brandName: 'APEX HEALTH',
      brandShortName: 'APEX',
      brandMonogram: 'A',
      registeredMark: '®',
      companyName: 'Apex Precision Medical Corp.',
      fullLegalName: 'Apex Precision Medical Instruments & Titanium Forging Corp.',
      industrySubtitle: 'Advanced Surgical & Dental Instruments',
      tagline: 'Engineering Healthcare Excellence.',
      secondaryTagline: 'Uncompromising Quality • Sterile Precision',
      positioningStatement: 'Apex Precision Medical Corp. provides high-specification surgical instruments, titanium implants, and turnkey OEM private label manufacturing to premier medical networks.',
      origin: 'Sialkot & Frankfurt',
      primaryMarkets: ['United States', 'Germany', 'Japan', 'United Kingdom', 'Australia'],
      contactInfo: {
        primaryPhone: '+92 (52) 459-7700',
        b2bDirectDeskPhone: '+92 (52) 459-7701',
        whatsapp: '+92 321 7788990',
        generalEmail: 'info@apexmedicalcorp.com',
        exportEmail: 'procurement@apexmedicalcorp.com',
        supportEmail: 'service@apexmedicalcorp.com',
        hqAddress: 'Plot 18-B, Export Processing Zone, Sambrial Road, Sialkot, Pakistan',
        cityState: 'Sialkot EPZ, Punjab',
        country: 'Pakistan',
        workingHours: 'Mon - Sat: 8:30 AM - 5:30 PM PKT'
      },
      logoConfig: {
        type: 'monogram',
        customImageUrl: '',
        accentGradientStart: '#01579B',
        accentGradientEnd: '#0288D1'
      },
      socialLinks: {
        website: 'https://apexmedicalcorp.com',
        linkedin: 'https://linkedin.com/company/apex-medical-corp',
        facebook: 'https://facebook.com/apexmedical',
        instagram: 'https://instagram.com/apex.medical',
        twitter: 'https://twitter.com/apexmedicalcorp'
      }
    }
  }
};

interface BrandContextType {
  brandConfig: BrandConfig;
  updateBrandConfig: (partial: Partial<BrandConfig>) => void;
  resetToDefaults: () => void;
  loadPreset: (presetKey: string) => void;
  isDevModeOpen: boolean;
  setIsDevModeOpen: (open: boolean) => void;
  toggleDevMode: () => void;
  exportConfigJson: () => string;
  importConfigJson: (json: string) => boolean;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

const STORAGE_KEY = 'howweb_brand_master_config';

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const resolvedLogoConfig = {
          ...INITIAL_BRAND_CONFIG.logoConfig,
          ...(parsed.logoConfig || {})
        };
        // Normalize logoConfig to use the permanent /logossc.jpg if not explicitly set
        if (!resolvedLogoConfig.customImageUrl) {
          resolvedLogoConfig.customImageUrl = '/logossc.jpg';
          resolvedLogoConfig.type = 'custom_image';
        }
        if (resolvedLogoConfig.type === 'custom_image' && resolvedLogoConfig.logoShape === 'rounded') {
          resolvedLogoConfig.logoShape = 'transparent';
        }

        return {
          ...INITIAL_BRAND_CONFIG,
          ...parsed,
          contactInfo: {
            ...INITIAL_BRAND_CONFIG.contactInfo,
            ...(parsed.contactInfo || {})
          },
          logoConfig: resolvedLogoConfig,
          socialLinks: {
            ...INITIAL_BRAND_CONFIG.socialLinks,
            ...(parsed.socialLinks || {})
          }
        };
      }
    } catch (e) {
      console.error('Failed to load saved brand config:', e);
    }
    return INITIAL_BRAND_CONFIG;
  });

  const [isDevModeOpen, setIsDevModeOpen] = useState(false);

  // Sync to localStorage whenever brandConfig changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(brandConfig));
    } catch (e) {
      console.error('Failed to persist brand config:', e);
    }

    // Dynamically update browser tab title and meta tags
    const cleanName = (brandConfig.brandName || 'Sarvic Star Corporation').replace(/[®™]/g, '').trim();
    const registered = brandConfig.registeredMark || (/[®™]/.test(brandConfig.brandName) ? '®' : '');
    const formattedTitle = `${cleanName}${registered ? registered : ''} | ${brandConfig.industrySubtitle || 'Surgical & Medical Instruments'}`;
    
    document.title = formattedTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && brandConfig.positioningStatement) {
      metaDesc.setAttribute('content', brandConfig.positioningStatement);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', formattedTitle);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && brandConfig.positioningStatement) {
      ogDesc.setAttribute('content', brandConfig.positioningStatement);
    }
  }, [brandConfig]);

  // Global Keyboard Shortcut: Ctrl + Shift + D (or Cmd + Shift + D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        setIsDevModeOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updateBrandConfig = (partial: Partial<BrandConfig>) => {
    setBrandConfig((prev) => ({
      ...prev,
      ...partial,
      contactInfo: partial.contactInfo
        ? { ...prev.contactInfo, ...partial.contactInfo }
        : prev.contactInfo,
      logoConfig: partial.logoConfig
        ? { ...prev.logoConfig, ...partial.logoConfig }
        : prev.logoConfig,
      socialLinks: partial.socialLinks
        ? { ...prev.socialLinks, ...partial.socialLinks }
        : prev.socialLinks
    }));
  };

  const resetToDefaults = () => {
    setBrandConfig(INITIAL_BRAND_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const loadPreset = (presetKey: string) => {
    const preset = BRAND_PRESETS[presetKey];
    if (preset) {
      setBrandConfig(preset.config);
    }
  };

  const toggleDevMode = () => {
    setIsDevModeOpen((prev) => !prev);
  };

  const exportConfigJson = () => {
    return JSON.stringify(brandConfig, null, 2);
  };

  const importConfigJson = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      if (parsed && typeof parsed === 'object') {
        updateBrandConfig(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON imported:', e);
    }
    return false;
  };

  return (
    <BrandContext.Provider
      value={{
        brandConfig,
        updateBrandConfig,
        resetToDefaults,
        loadPreset,
        isDevModeOpen,
        setIsDevModeOpen,
        toggleDevMode,
        exportConfigJson,
        importConfigJson
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};
