import React, { useState } from 'react';
import { ArrowRight, Eye, Info, PencilLine, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CustomizerTab, ProjectItem } from '../types/site';
import { IndustrialImage } from './IndustrialImage';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onDiscussProject: () => void;
  onOpenCustomizer: (tab: CustomizerTab) => void;
}

const CATEGORIES = [
  'All',
  'Warehouse',
  'Manufacturing',
  'Commercial',
  'Metal Installation',
] as const;

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onDiscussProject,
  onOpenCustomizer,
}) => {
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-[#F4F6F8] py-20 lg:py-28 border-t border-slate-200/80"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Controls */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-semibold text-[#52606D]">
              <span className="font-mono text-[#de7a18] tabular-nums">05</span>
              <span aria-hidden="true">·</span>
              <span>Illustrative Work Gallery</span>
            </div>

            <h2
              id="projects-heading"
              className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10263D]"
            >
              Explore Our Work
            </h2>

            <p className="mt-3 text-base text-[#3E4C59]">
              A curated preview of industrial and commercial roofing application
              formats.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenCustomizer('projects')}
            className="inline-flex min-h-10 items-center gap-2 self-start lg:self-auto rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-[#10263D] whitespace-nowrap shrink-0 transition-colors hover:border-[#10263D] hover:bg-slate-50"
          >
            <PencilLine className="h-3.5 w-3.5 text-[#de7a18]" />
            <span>Edit Gallery Entries</span>
          </button>
        </div>

        {/* Mandatory Transparent Illustrative Content Notice (All-Around Hairline Border, No Left Accent Stripe) */}
        <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-md border border-slate-200 bg-white px-5 py-3.5 text-xs text-[#52606D]">
          <div className="flex items-start sm:items-center gap-2.5">
            <Info className="mt-0.5 sm:mt-0 h-4 w-4 shrink-0 text-[#de7a18]" />
            <span>
              <strong className="font-semibold text-[#10263D]">
                Illustrative Demo Gallery:
              </strong>{' '}
              Sample images below demonstrate website gallery presentation and do
              not depict completed sites of Kaustubh Roofing Industries Pvt. Ltd.
              Replace with verified project photographs before launch.
            </span>
          </div>
        </div>

        {/* Functional Category Filter Controls */}
        <div
          role="tablist"
          aria-label="Filter illustrative project categories"
          className="mt-8 flex flex-wrap items-center gap-1.5 rounded-lg border border-slate-200 bg-white p-1.5 w-fit"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`min-h-9 rounded-md px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'bg-[#10263D] text-white'
                    : 'text-[#52606D] hover:bg-slate-100 hover:text-[#10263D]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2">
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.4,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => setSelectedProject(project)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#10263D]">
                <IndustrialImage
                  src={project.image}
                  alt={project.imageAlt}
                  fallbackLabel={project.title}
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0A1929]/55 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  aria-label={`Preview ${project.title}`}
                  className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-md bg-[#0A1929]/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xs transition-colors group-hover:bg-[#F28C28] group-hover:text-[#10263D]"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview</span>
                </button>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  {/* Clean Unboxed Metadata with Typographic Separators (Zero-Pill Rule) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#616E7C]">
                    <span className="font-semibold text-[#de7a18]">
                      {project.category}
                    </span>
                    {project.isIllustrative && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>Illustrative Sample Entry</span>
                      </>
                    )}
                  </div>

                  <h3 className="mt-2 font-display text-xl font-bold text-[#10263D] group-hover:text-[#de7a18] transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-[#52606D]">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA: Discuss Your Project With Us */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-[#3E4C59]">
            Have an upcoming industrial shed, warehouse, or roof replacement
            requirement in Pune?
          </p>
          <button
            type="button"
            onClick={onDiscussProject}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-md bg-[#10263D] px-6 py-3 text-sm font-bold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#183654] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10263D]"
          >
            <span>Discuss Your Project With Us</span>
            <ArrowRight className="h-4 w-4 text-[#F28C28]" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal for Project Preview */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-preview-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-[#0A1929]/80 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl"
            >
              <div className="relative aspect-[16/9] w-full bg-[#10263D]">
                <IndustrialImage
                  src={selectedProject.image}
                  alt={selectedProject.imageAlt}
                  fallbackLabel={selectedProject.title}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project preview"
                  className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-md bg-[#0A1929]/75 text-white hover:bg-[#0A1929]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs text-[#616E7C]">
                  <span className="font-semibold text-[#de7a18]">
                    {selectedProject.category}
                  </span>
                  {selectedProject.isIllustrative && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>Illustrative Demo Showcase (Replace Before Publishing)</span>
                    </>
                  )}
                </div>
                <h3
                  id="project-preview-title"
                  className="mt-2 font-display text-2xl font-bold text-[#10263D]"
                >
                  {selectedProject.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#3E4C59]">
                  {selectedProject.description}
                </p>
                <div className="mt-6 flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="min-h-10 rounded-md border border-slate-300 px-4 py-2 text-xs font-semibold text-[#202A35] hover:bg-slate-50"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProject(null);
                      onDiscussProject();
                    }}
                    className="inline-flex min-h-10 items-center gap-2 rounded-md bg-[#F28C28] px-5 py-2 text-xs font-bold text-[#10263D] hover:bg-[#ffa042]"
                  >
                    <span>Discuss Similar Requirement</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
