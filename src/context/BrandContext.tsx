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
  }
};

interface BrandContextType {
  brandConfig: BrandConfig;
  updateBrandConfig: (partial: Partial<BrandConfig>) => void;
  resetToDefaults: () => void;
  exportConfigJson: () => string;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

const STORAGE_KEY = 'sarvicstar_master_config';

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
      localStorage.removeItem('howweb_brand_master_config');
    } catch (e) {
      console.error(e);
    }
  };

  const exportConfigJson = () => {
    return JSON.stringify(brandConfig, null, 2);
  };

  return (
    <BrandContext.Provider
      value={{
        brandConfig,
        updateBrandConfig,
        resetToDefaults,
        exportConfigJson
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
