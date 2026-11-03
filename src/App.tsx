/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { DemoCustomizerDrawer } from './components/DemoCustomizerDrawer';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { IndustriesSection } from './components/IndustriesSection';
import { Navbar } from './components/Navbar';
import { ProcessAndCtaSection } from './components/ProcessAndCtaSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { SolutionsSection } from './components/SolutionsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import {
  INITIAL_COMPANY_CONFIG,
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
} from './data/siteData';
import {
  CompanyConfig,
  CustomizerTab,
  ProjectItem,
  ServiceItem,
} from './types/site';

const STORAGE_KEY_CONFIG = 'kaustubh_roofing_demo_config_v1';
const STORAGE_KEY_SERVICES = 'kaustubh_roofing_demo_services_v1';
const STORAGE_KEY_PROJECTS = 'kaustubh_roofing_demo_projects_v1';

export default function App() {
  const [config, setConfig] = useState<CompanyConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      return saved
        ? { ...INITIAL_COMPANY_CONFIG, ...JSON.parse(saved) }
        : INITIAL_COMPANY_CONFIG;
    } catch {
      return INITIAL_COMPANY_CONFIG;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SERVICES);
      if (!saved) return INITIAL_SERVICES;
      const parsed: ServiceItem[] = JSON.parse(saved);
      // Re-bind fresh Vite asset URLs by matching IDs when available
      return parsed.map((item) => {
        const defaultMatch = INITIAL_SERVICES.find((d) => d.id === item.id);
        return defaultMatch ? { ...item, image: defaultMatch.image } : item;
      });
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (!saved) return INITIAL_PROJECTS;
      const parsed: ProjectItem[] = JSON.parse(saved);
      return parsed.map((item) => {
        const defaultMatch = INITIAL_PROJECTS.find((d) => d.id === item.id);
        return defaultMatch ? { ...item, image: defaultMatch.image } : item;
      });
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [activeModalService, setActiveModalService] =
    useState<ServiceItem | null>(null);
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [preselectedSectorNote, setPreselectedSectorNote] =
    useState<string>('');
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [customizerTab, setCustomizerTab] = useState<CustomizerTab>('contact');

  const formInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
    } catch {
      // Ignore storage quota errors in restricted environments
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(services));
    } catch {
      // Ignore storage quota errors
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    } catch {
      // Ignore storage quota errors
    }
  }, [projects]);

  const scrollToSection = (selector: string, focusForm = false) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (focusForm) {
      window.setTimeout(() => {
        formInputRef.current?.focus({ preventScroll: true });
      }, 550);
    }
  };

  const handleNavigateToContact = (serviceTitle?: string) => {
    if (serviceTitle) {
      setPreselectedService(serviceTitle);
    }
    scrollToSection('#contact', true);
  };

  const handleDiscussSector = (sectorTitle: string) => {
    setPreselectedSectorNote(sectorTitle);
    scrollToSection('#contact', true);
  };

  const handleOpenCustomizer = (tab: CustomizerTab = 'contact') => {
    setCustomizerTab(tab);
    setCustomizerOpen(true);
  };

  const handleResetDefaults = () => {
    setConfig(INITIAL_COMPANY_CONFIG);
    setServices(INITIAL_SERVICES);
    setProjects(INITIAL_PROJECTS);
    try {
      localStorage.removeItem(STORAGE_KEY_CONFIG);
      localStorage.removeItem(STORAGE_KEY_SERVICES);
      localStorage.removeItem(STORAGE_KEY_PROJECTS);
    } catch {
      // Ignore storage cleanup errors
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202A35]">
      <Navbar onNavigateToContact={() => handleNavigateToContact()} />

      <main className="flex-1">
        <HeroSection
          shortLocation={config.shortLocation}
          onExploreSolutions={() => scrollToSection('#solutions')}
          onRequestConsultation={() => handleNavigateToContact()}
          onOpenCustomizer={handleOpenCustomizer}
        />

        <AboutSection
          verifiedAddress={config.verifiedAddress}
          showVerificationNotes={config.showVerificationNotes}
          onNavigateToContact={() => handleNavigateToContact()}
        />

        <SolutionsSection
          services={services}
          showVerificationNotes={config.showVerificationNotes}
          onSelectService={(service) => setActiveModalService(service)}
          onOpenCustomizer={handleOpenCustomizer}
        />

        <WhyChooseUsSection />

        <IndustriesSection onDiscussSector={handleDiscussSector} />

        <ProjectsSection
          projects={projects}
          onDiscussProject={() => handleNavigateToContact()}
          onOpenCustomizer={handleOpenCustomizer}
        />

        <ProcessAndCtaSection
          onRequestQuote={() => handleNavigateToContact()}
          onContactTeam={() => scrollToSection('#contact', false)}
        />

        <ContactSection
          config={config}
          services={services}
          preselectedService={preselectedService}
          preselectedSectorNote={preselectedSectorNote}
          formInputRef={formInputRef}
          onOpenCustomizer={handleOpenCustomizer}
        />
      </main>

      <Footer
        config={config}
        services={services}
        onSelectService={(service) => setActiveModalService(service)}
        onOpenCustomizer={handleOpenCustomizer}
      />

      <FloatingActions
        whatsappNumber={config.whatsappNumber}
        onNavigateToContact={() => handleNavigateToContact()}
        onOpenCustomizer={handleOpenCustomizer}
      />

      <ServiceDetailModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onEnquireService={(serviceTitle) =>
          handleNavigateToContact(serviceTitle)
        }
      />

      <DemoCustomizerDrawer
        isOpen={customizerOpen}
        activeTab={customizerTab}
        onTabChange={setCustomizerTab}
        onClose={() => setCustomizerOpen(false)}
        config={config}
        onUpdateConfig={setConfig}
        services={services}
        onUpdateServices={setServices}
        projects={projects}
        onUpdateProjects={setProjects}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
