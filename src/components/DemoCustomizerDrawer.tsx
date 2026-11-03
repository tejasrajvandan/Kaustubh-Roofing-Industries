import React, { useEffect } from 'react';
import { Plus, RotateCcw, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { SITE_IMAGES } from '../data/siteData';
import {
  CompanyConfig,
  CustomizerTab,
  ProjectItem,
  ServiceItem,
} from '../types/site';

interface DemoCustomizerDrawerProps {
  isOpen: boolean;
  activeTab: CustomizerTab;
  onTabChange: (tab: CustomizerTab) => void;
  onClose: () => void;
  config: CompanyConfig;
  onUpdateConfig: (updated: CompanyConfig) => void;
  services: ServiceItem[];
  onUpdateServices: (updated: ServiceItem[]) => void;
  projects: ProjectItem[];
  onUpdateProjects: (updated: ProjectItem[]) => void;
  onResetDefaults: () => void;
}

export const DemoCustomizerDrawer: React.FC<DemoCustomizerDrawerProps> = ({
  isOpen,
  activeTab,
  onTabChange,
  onClose,
  config,
  onUpdateConfig,
  services,
  onUpdateServices,
  projects,
  onUpdateProjects,
  onResetDefaults,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleServiceFieldChange = (
    id: string,
    field: 'title' | 'description',
    value: string
  ) => {
    onUpdateServices(
      services.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleAddService = () => {
    const nextNumber = String(services.length + 1).padStart(2, '0');
    const newItem: ServiceItem = {
      id: `custom-service-${Date.now()}`,
      number: nextNumber,
      title: 'Custom Roofing Solution',
      description:
        'Editable service description — customize to match verified company offerings.',
      image: SITE_IMAGES.metalPanels,
      imageAlt: 'Industrial metal roofing panels',
      suitableSpaces: 'Industrial and commercial structures',
      proposedScopePoints: [
        'Initial site inspection and requirement discussion',
        'Customized roofing proposal and scope confirmation',
      ],
    };
    onUpdateServices([...services, newItem]);
  };

  const handleRemoveService = (id: string) => {
    if (services.length <= 1) return;
    const filtered = services
      .filter((s) => s.id !== id)
      .map((s, idx) => ({
        ...s,
        number: String(idx + 1).padStart(2, '0'),
      }));
    onUpdateServices(filtered);
  };

  const handleProjectFieldChange = <K extends keyof ProjectItem>(
    id: string,
    field: K,
    value: ProjectItem[K]
  ) => {
    onUpdateProjects(
      projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="customizer-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A1929]/65 backdrop-blur-xs"
          />

          {/* Slide-Over Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl border-l border-slate-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-[#10263D] px-6 py-4 text-white">
              <div>
                <h2
                  id="customizer-title"
                  className="font-display text-base font-bold text-white"
                >
                  Live Demo Content Customizer
                </h2>
                <p className="mt-0.5 text-xs text-slate-300">
                  Configure editable placeholders for management review
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close customizer drawer"
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-300 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Segmented Tab Bar */}
            <div className="border-b border-slate-200 bg-[#F4F6F8] px-6 py-3">
              <div className="grid grid-cols-3 gap-1 rounded-md bg-slate-200/80 p-1">
                {(
                  [
                    { key: 'contact', label: 'Contact & Info' },
                    { key: 'services', label: 'Services' },
                    { key: 'projects', label: 'Projects' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => onTabChange(tab.key)}
                    className={`rounded py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                      activeTab === tab.key
                        ? 'bg-white text-[#10263D] shadow-xs'
                        : 'text-[#52606D] hover:text-[#10263D]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <p className="rounded-md bg-[#F4F6F8] p-3 text-xs leading-relaxed text-[#52606D]">
                    Phone numbers, emails, WhatsApp, and working hours are kept
                    blank by default so no unverified details are assumed. Enter
                    official values here to preview them live across the site.
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-[#10263D]">
                      Official Phone Number
                    </label>
                    <input
                      type="tel"
                      value={config.phone}
                      onChange={(e) =>
                        onUpdateConfig({ ...config, phone: e.target.value })
                      }
                      placeholder="e.g., +91 98XXXXXXXX"
                      className="mt-1.5 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-[#202A35] focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#10263D]">
                      WhatsApp Enquiry Number (with country code)
                    </label>
                    <input
                      type="tel"
                      value={config.whatsappNumber}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          whatsappNumber: e.target.value,
                        })
                      }
                      placeholder="e.g., 9198XXXXXXXX"
                      className="mt-1.5 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-[#202A35] focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#10263D]">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      value={config.email}
                      onChange={(e) =>
                        onUpdateConfig({ ...config, email: e.target.value })
                      }
                      placeholder="e.g., info@kaustubhroofing.com"
                      className="mt-1.5 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-[#202A35] focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#10263D]">
                      Business Hours
                    </label>
                    <input
                      type="text"
                      value={config.businessHours}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          businessHours: e.target.value,
                        })
                      }
                      placeholder="e.g., Mon – Sat: 9:30 AM – 6:30 PM"
                      className="mt-1.5 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-[#202A35] focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
                    />
                  </div>

                  <div className="border-t border-slate-200 pt-4 space-y-3">
                    <p className="text-xs font-bold text-[#10263D]">
                      Social Media Profile Links (Optional)
                    </p>
                    <input
                      type="url"
                      value={config.linkedinUrl}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          linkedinUrl: e.target.value,
                        })
                      }
                      placeholder="LinkedIn URL (https://...)"
                      className="block w-full rounded-md border border-slate-300 px-3 py-2 text-xs text-[#202A35] focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
                    />
                    <input
                      type="url"
                      value={config.facebookUrl}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          facebookUrl: e.target.value,
                        })
                      }
                      placeholder="Facebook URL (https://...)"
                      className="block w-full rounded-md border border-slate-300 px-3 py-2 text-xs text-[#202A35] focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
                    />
                    <input
                      type="url"
                      value={config.instagramUrl}
                      onChange={(e) =>
                        onUpdateConfig({
                          ...config,
                          instagramUrl: e.target.value,
                        })
                      }
                      placeholder="Instagram URL (https://...)"
                      className="block w-full rounded-md border border-slate-300 px-3 py-2 text-xs text-[#202A35] focus:outline-none focus:ring-2 focus:ring-[#F28C28]"
                    />
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <label className="flex items-center justify-between gap-3 cursor-pointer">
                      <span className="text-xs font-semibold text-[#10263D]">
                        Show Proposed Content Review Captions
                      </span>
                      <input
                        type="checkbox"
                        checked={config.showVerificationNotes}
                        onChange={(e) =>
                          onUpdateConfig({
                            ...config,
                            showVerificationNotes: e.target.checked,
                          })
                        }
                        className="h-4 w-4 accent-[#10263D]"
                      />
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[#52606D]">
                      Edit proposed service titles and descriptions live:
                    </p>
                    <button
                      type="button"
                      onClick={handleAddService}
                      className="inline-flex items-center gap-1 rounded bg-[#10263D] px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-[#183654]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Card</span>
                    </button>
                  </div>

                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="rounded-md border border-slate-200 bg-[#F4F6F8]/60 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-[#de7a18]">
                          Card {service.number}
                        </span>
                        {services.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveService(service.id)}
                            aria-label={`Remove ${service.title}`}
                            className="text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) =>
                          handleServiceFieldChange(
                            service.id,
                            'title',
                            e.target.value
                          )
                        }
                        className="block w-full rounded border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-[#10263D]"
                      />
                      <textarea
                        rows={2}
                        value={service.description}
                        onChange={(e) =>
                          handleServiceFieldChange(
                            service.id,
                            'description',
                            e.target.value
                          )
                        }
                        className="block w-full rounded border border-slate-300 bg-white px-3 py-1.5 text-xs text-[#202A35]"
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="space-y-5">
                  <p className="text-xs text-[#52606D]">
                    Customize sample project cards before replacing with actual
                    completed site photography:
                  </p>

                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="rounded-md border border-slate-200 bg-[#F4F6F8]/60 p-4 space-y-3"
                    >
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) =>
                          handleProjectFieldChange(
                            proj.id,
                            'title',
                            e.target.value
                          )
                        }
                        className="block w-full rounded border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-[#10263D]"
                      />
                      <select
                        value={proj.category}
                        onChange={(e) =>
                          handleProjectFieldChange(
                            proj.id,
                            'category',
                            e.target.value as ProjectItem['category']
                          )
                        }
                        className="block w-full rounded border border-slate-300 bg-white px-3 py-1.5 text-xs text-[#202A35]"
                      >
                        <option value="Warehouse">Warehouse</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Metal Installation">
                          Metal Installation
                        </option>
                      </select>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) =>
                          handleProjectFieldChange(
                            proj.id,
                            'description',
                            e.target.value
                          )
                        }
                        className="block w-full rounded border border-slate-300 bg-white px-3 py-1.5 text-xs text-[#202A35]"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Controls */}
            <div className="flex items-center justify-between border-t border-slate-200 bg-[#F4F6F8] px-6 py-4">
              <button
                type="button"
                onClick={onResetDefaults}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52606D] hover:text-[#10263D]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Defaults</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-[#F28C28] px-5 py-2 text-xs font-bold text-[#10263D] hover:bg-[#ffa042]"
              >
                Done
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
