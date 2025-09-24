"use client"

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { 
  Lightbulb,
  Brain,
  Target,
  Zap,
  MessageSquare
} from "lucide-react"
import './MagicBento.css';

export interface HintifyBentoCardProps {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  icon?: React.ComponentType<any>;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
}

export interface HintifyBentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

// Hintify-specific card data
const hintifyCardData: HintifyBentoCardProps[] = [
  {
    color: '#060010',
    title: 'Progressive Hints',
    description: 'Start with gentle nudges and gradually get more specific hints if you need them. Each hint builds on the last, guiding your thought process naturally.',
    label: 'Step by Step',
    icon: Lightbulb
  },
  {
    color: '#060010',
    title: 'Think-First Approach',
    description: 'We never give you the answer directly. Instead, we ask questions and provide clues that help you discover the solution yourself.',
    label: 'Self Discovery',
    icon: Brain
  },
  {
    color: '#060010',
    title: 'Contextual Guidance',
    description: 'Hints are tailored to your specific problem and current understanding level, ensuring you get just the right amount of guidance.',
    label: 'Personalized',
    icon: Target
  },
  {
    color: '#060010',
    title: 'Learning Reinforcement',
    description: 'Each interaction strengthens your problem-solving skills and builds confidence in your ability to think through challenges.',
    label: 'Skill Building',
    icon: Zap
  },
  {
    color: '#060010',
    title: 'Human-Like Conversation',
    description: 'Natural, encouraging conversations that feel like talking to a thoughtful friend who wants to help you grow, not just get the answer.',
    label: 'Natural Chat',
    icon: MessageSquare
  }
];

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

interface BentoCardGridProps {
  children: React.ReactNode;
  gridRef: React.RefObject<HTMLDivElement>;
}

const BentoCardGrid: React.FC<BentoCardGridProps> = ({ children, gridRef }) => (
  <div ref={gridRef} className="card-grid bento-section">
    {children}
  </div>
);

interface ParticleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  disableAnimations: boolean;
  particleCount: number;
  glowColor: string;
  enableTilt: boolean;
  clickEffect: boolean;
  enableMagnetism: boolean;
  children: React.ReactNode;
}

const ParticleCard: React.FC<ParticleCardProps> = ({
  disableAnimations,
  particleCount,
  glowColor,
  enableTilt,
  clickEffect,
  enableMagnetism,
  children,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || disableAnimations) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out'
        });
      }

      updateCardGlowProperties(card, e.clientX, e.clientY, 1, 200);
    };

    const handleMouseLeave = () => {
      if (enableTilt) {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      updateCardGlowProperties(card, 0, 0, 0, 200);
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < particleCount; i++) {
        const particle = createParticleElement(x, y, glowColor);
        card.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 50 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        gsap.to(particle, {
          x: vx,
          y: vy,
          opacity: 0,
          scale: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => particle.remove()
        });
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('click', handleClick);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('click', handleClick);
    };
  }, [disableAnimations, enableTilt, clickEffect, particleCount, glowColor]);

  return (
    <div ref={cardRef} {...props} className={`${props.className} particle-container`}>
      {children}
    </div>
  );
};

interface GlobalSpotlightProps {
  gridRef: React.RefObject<HTMLDivElement>;
  disableAnimations: boolean;
  enabled: boolean;
  spotlightRadius: number;
  glowColor: string;
}

const GlobalSpotlight: React.FC<GlobalSpotlightProps> = ({
  gridRef,
  disableAnimations,
  enabled,
  spotlightRadius,
  glowColor
}) => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || disableAnimations) return;

    const grid = gridRef.current;
    const spotlight = spotlightRef.current;
    if (!grid || !spotlight) return;

    const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(spotlight, {
        x: x - spotlightRadius / 2,
        y: y - spotlightRadius / 2,
        duration: 0.1,
        ease: 'power2.out'
      });

      const cards = grid.querySelectorAll('.card');
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
        const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;
        const distance = Math.sqrt((x - cardCenterX) ** 2 + (y - cardCenterY) ** 2);

        let glow = 0;
        if (distance < proximity) {
          glow = 1;
        } else if (distance < fadeDistance) {
          glow = 1 - (distance - proximity) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(card as HTMLElement, e.clientX, e.clientY, glow, spotlightRadius);
      });
    };

    const handleMouseLeave = () => {
      const cards = grid.querySelectorAll('.card');
      cards.forEach((card) => {
        updateCardGlowProperties(card as HTMLElement, 0, 0, 0, spotlightRadius);
      });
    };

    grid.addEventListener('mousemove', handleMouseMove);
    grid.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      grid.removeEventListener('mousemove', handleMouseMove);
      grid.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, disableAnimations, spotlightRadius, glowColor, gridRef]);

  if (!enabled || disableAnimations) return null;

  return (
    <div
      ref={spotlightRef}
      className="global-spotlight"
      style={{
        position: 'fixed',
        width: `${spotlightRadius}px`,
        height: `${spotlightRadius}px`,
        background: `radial-gradient(circle, rgba(${glowColor}, 0.15) 0%, transparent 70%)`,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1000,
        opacity: 0.8
      }}
    />
  );
};

const HintifyMagicBento: React.FC<HintifyBentoProps> = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        {hintifyCardData.map((card, index) => {
          const baseClassName = `card ${textAutoHide ? 'card--text-autohide' : ''} ${enableBorderGlow ? 'card--border-glow' : ''}`;
          const cardProps = {
            className: baseClassName,
            style: {
              backgroundColor: card.color,
              '--glow-color': glowColor
            } as React.CSSProperties
          };

          const IconComponent = card.icon;

          if (enableStars) {
            return (
              <ParticleCard
                key={index}
                {...cardProps}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
              >
                <div className="card__header">
                  <div className="card__label">{card.label}</div>
                  {IconComponent && <IconComponent className="h-6 w-6 text-white/80" />}
                </div>
                <div className="card__content">
                  <h2 className="card__title">{card.title}</h2>
                  <p className="card__description">{card.description}</p>
                </div>
              </ParticleCard>
            );
          }

          return (
            <div
              key={index}
              {...cardProps}
              ref={el => {
                if (!el) return;

                const handleMouseMove = (e: MouseEvent) => {
                  if (shouldDisableAnimations) return;

                  const rect = el.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;

                  if (enableTilt) {
                    const rotateX = ((y - centerY) / centerY) * -10;
                    const rotateY = ((x - centerX) / centerX) * 10;
                    gsap.to(el, {
                      rotateX,
                      rotateY,
                      duration: 0.1,
                      ease: 'power2.out'
                    });
                  }

                  updateCardGlowProperties(el, e.clientX, e.clientY, 1, 200);
                };

                const handleMouseLeave = () => {
                  if (enableTilt) {
                    gsap.to(el, {
                      rotateX: 0,
                      rotateY: 0,
                      duration: 0.3,
                      ease: 'power2.out'
                    });
                  }
                  updateCardGlowProperties(el, 0, 0, 0, 200);
                };

                const handleClick = (e: MouseEvent) => {
                  if (!clickEffect) return;

                  const rect = el.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;

                  for (let i = 0; i < particleCount; i++) {
                    const particle = createParticleElement(x, y, glowColor);
                    el.appendChild(particle);

                    const angle = (Math.PI * 2 * i) / particleCount;
                    const velocity = 50 + Math.random() * 50;
                    const vx = Math.cos(angle) * velocity;
                    const vy = Math.sin(angle) * velocity;

                    gsap.to(particle, {
                      x: vx,
                      y: vy,
                      opacity: 0,
                      scale: 0,
                      duration: 0.8,
                      ease: 'power2.out',
                      onComplete: () => particle.remove()
                    });
                  }
                };

                el.addEventListener('mousemove', handleMouseMove);
                el.addEventListener('mouseleave', handleMouseLeave);
                el.addEventListener('click', handleClick);

                return () => {
                  el.removeEventListener('mousemove', handleMouseMove);
                  el.removeEventListener('mouseleave', handleMouseLeave);
                  el.removeEventListener('click', handleClick);
                };
              }}
            >
              <div className="card__header">
                <div className="card__label">{card.label}</div>
                {IconComponent && <IconComponent className="h-6 w-6 text-white/80" />}
              </div>
              <div className="card__content">
                <h2 className="card__title">{card.title}</h2>
                <p className="card__description">{card.description}</p>
              </div>
            </div>
          );
        })}
      </BentoCardGrid>
    </>
  );
};

export default HintifyMagicBento;
