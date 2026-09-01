import React from 'react';
import { 
  ShieldCheck, MapPin, Mail, Phone, Globe, Download, 
  ExternalLink, ArrowRight, CheckCircle2, Lock, Package, FileText, Sliders 
} from 'lucide-react';
import { useBrand } from '../context/BrandContext';
import { CATEGORIES_TREE } from '../data/productsData';

interface FooterProps {
  onNavigate: (tab: string, productId?: string, categorySlug?: string) => void;
  onOpenFolderGuide: () => void;
  onOpenRFQ: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenFolderGuide,
  onOpenRFQ
}) => {
  const { brandConfig } = useBrand();

  return (
    <footer className="bg-[#F4FAFD] text-[#355C75] border-t border-[#B3E5FC] text-xs">
      {/* Trust & Certifications Space Bar */}
      <div className="border-b border-[#B3E5FC] bg-[#E1F5FE] py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#81D4FA] flex items-center justify-center text-[#0288D1] shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-[#0B2838] text-xs tracking-tight">{brandConfig.origin} Hub</p>
              <p className="text-[10px] text-[#355C75] font-mono">German DIN 1.4021 / 1.4117</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#81D4FA] flex items-center justify-center text-[#0288D1] shrink-0 shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-[#0B2838] text-xs tracking-tight">Global Direct Supply</p>
              <p className="text-[10px] text-[#355C75] font-mono">{brandConfig.primaryMarkets.join(' • ')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#81D4FA] flex items-center justify-center text-[#0288D1] shrink-0 shadow-xs">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-[#0B2838] text-xs tracking-tight">OEM & Custom Solutions</p>
              <p className="text-[10px] text-[#355C75] font-mono">Custom Laser Etching & Branding</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#81D4FA] flex items-center justify-center text-[#0288D1] shrink-0 shadow-xs">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-[#0B2838] text-xs tracking-tight">Certified Quality</p>
              <p className="text-[10px] text-[#355C75] font-mono">Tested to Global Specifications</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info & Origin */}
          <div className="lg:col-span-2 space-y-4">
            {(() => {
              const cleanBrandName = (brandConfig.brandName || 'Sarvic Star Corporation').replace(/[®™]/g, '').trim();
              const registeredSymbol = brandConfig.registeredMark || (/[®™]/.test(brandConfig.brandName) ? '®' : '');
              const isCustomImg = brandConfig.logoConfig.type === 'custom_image' && Boolean(brandConfig.logoConfig.customImageUrl);
              const shape = brandConfig.logoConfig.logoShape || 'transparent';

              return (
                <div className="flex items-center gap-3">
                  <div 
                    className={`flex items-center justify-center overflow-hidden shrink-0 transition-all ${
                      shape === 'circle'
                        ? 'rounded-full bg-white border border-[#B3E5FC] shadow-xs'
                        : shape === 'white_box'
                        ? 'rounded-xl bg-white border border-[#B3E5FC] shadow-xs p-1'
                        : shape === 'gradient_box'
                        ? 'rounded-xl text-white shadow-md shadow-[#0288D1]/20 p-1'
                        : 'bg-transparent'
                    }`}
                    style={{
                      width: '42px',
                      height: '42px',
                      background: shape === 'gradient_box'
                        ? `linear-gradient(135deg, ${brandConfig.logoConfig.accentGradientStart}, ${brandConfig.logoConfig.accentGradientEnd})`
                        : undefined
                    }}
                  >
                    {isCustomImg ? (
                      <img 
                        src={brandConfig.logoConfig.customImageUrl} 
                        alt={cleanBrandName} 
                        className="w-full h-full object-contain" 
                      />
                    ) : (
                      <div 
                        className="w-full h-full rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md shadow-[#0288D1]/20"
                        style={{
                          background: `linear-gradient(135deg, ${brandConfig.logoConfig.accentGradientStart}, ${brandConfig.logoConfig.accentGradientEnd})`
                        }}
                      >
                        {brandConfig.brandMonogram || 'M'}
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-xl font-black text-[#0B2838] tracking-tight">
                      {cleanBrandName}
                    </span>
                    {registeredSymbol && (
                      <span className="ml-1.5 text-[9px] font-mono font-bold bg-[#E1F5FE] text-[#01579B] px-1 rounded border border-[#81D4FA]">
                        {registeredSymbol}
                      </span>
                    )}
                  </div>
                </div>
              );
            })()}

            <p className="text-xs text-[#355C75] leading-relaxed max-w-sm">
              {brandConfig.positioningStatement}
            </p>

            <div className="space-y-2 text-[#355C75] text-xs pt-1 font-mono">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0288D1] shrink-0 mt-0.5" />
                <span>HQ: {brandConfig.contactInfo.hqAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0288D1] shrink-0" />
                <span>{brandConfig.contactInfo.exportEmail} / {brandConfig.contactInfo.generalEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0288D1] shrink-0" />
                <span>{brandConfig.contactInfo.primaryPhone} • {brandConfig.contactInfo.b2bDirectDeskPhone}</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#01579B]">Categories</h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES_TREE.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => onNavigate('products', undefined, cat.slug)}
                    className="text-[#355C75] hover:text-[#0288D1] hover:translate-x-1 transition-all text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('showcase-3d')}
                  className="text-[#0288D1] hover:underline font-mono text-xs flex items-center gap-1 font-bold"
                >
                  3D Interactive Models →
                </button>
              </li>
            </ul>
          </div>

          {/* Commercial & B2B Portals */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#01579B]">B2B & Trade</h4>
            <ul className="space-y-2 text-xs text-[#355C75]">
              <li>
                <button onClick={() => onNavigate('b2b-wholesale')} className="hover:text-[#0288D1] transition-colors">
                  Distributor Application
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('b2b-wholesale')} className="hover:text-[#0288D1] transition-colors">
                  OEM & Private Labeling
                </button>
              </li>
              <li>
                <button onClick={onOpenRFQ} className="text-[#0288D1] font-mono hover:underline font-bold">
                  Request Volume Quote (RFQ)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog-datasheets')} className="hover:text-[#0288D1] transition-colors">
                  Digital PDF Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quality-certifications')} className="hover:text-[#0288D1] transition-colors">
                  ISO 13485 & CE Space
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('order-tracking')} className="hover:text-[#0288D1] transition-colors">
                  Global Order Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Useful Quick Links & System */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#01579B]">Company & Catalog</h4>
            <ul className="space-y-2 text-xs text-[#355C75]">
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-[#0288D1] transition-colors">
                  Full Instruments Catalog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quality-certifications')} className="hover:text-[#0288D1] transition-colors">
                  Quality & CE Declarations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#0288D1] transition-colors">
                  {brandConfig.brandShortName} Heritage & Story
                </button>
              </li>
              <li>
                <button onClick={onOpenRFQ} className="hover:text-[#0288D1] transition-colors text-[#0288D1] font-semibold">
                  Request B2B Quotation
                </button>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-[10px] text-[#355C75] font-mono uppercase tracking-wider mb-1.5">B2B Technical Bulletin:</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="contact@hospital.com"
                  className="w-full bg-white border border-[#B3E5FC] rounded-l-xl px-2.5 py-1.5 text-xs text-[#0B2838] focus:outline-none focus:border-[#0288D1] font-mono placeholder-[#62879F]"
                />
                <button className="bg-[#0288D1] hover:bg-[#0277BD] text-white px-3 py-1.5 rounded-r-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Notice */}
        <div className="mt-8 pt-6 border-t border-[#B3E5FC] text-[11px] text-[#62879F] leading-relaxed">
          <p className="mb-2">
            <strong className="text-[#0B2838]">Legal & Commercial Entity:</strong> {brandConfig.fullLegalName} ({brandConfig.origin}). All instruments and platforms are delivered in accordance with strict international specifications. Direct correspondence via {brandConfig.contactInfo.generalEmail} or phone {brandConfig.contactInfo.primaryPhone}.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#B3E5FC]/70 text-[9px] uppercase tracking-[0.2em] text-[#355C75] font-mono">
            <div className="flex items-center gap-1.5">
              <span>System Status: <strong className="text-[#0288D1] font-bold">Verified Production // Active</strong></span>
            </div>
            <div>© {new Date().getFullYear()} {brandConfig.fullLegalName.toUpperCase()}</div>
            <div>Origin: {brandConfig.origin.toUpperCase()}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
