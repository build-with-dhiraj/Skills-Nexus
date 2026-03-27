'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

// Import dimension assets
import agentImg from '@/assets/dimensions/agent.png';
import uiImg from '@/assets/dimensions/ui.png';
import infraImg from '@/assets/dimensions/infra.png';
import dataImg from '@/assets/dimensions/data.png';
import backendImg from '@/assets/dimensions/backend.png';
import labsImg from '@/assets/dimensions/labs.png';
import osImg from '@/assets/dimensions/os.png';

interface ImageItem {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images?: ImageItem[];
}

const DEFAULT_IMAGES: ImageItem[] = [
	{ src: agentImg, alt: 'AGENT Core Intelligence' },
	{ src: uiImg, alt: 'UI Design Sovereignty' },
	{ src: infraImg, alt: 'INFRA Cloud Architecture' },
	{ src: dataImg, alt: 'DATA Intelligence Nebula' },
	{ src: backendImg, alt: 'BACKEND Sovereign Engine' },
	{ src: labsImg, alt: 'LABS Frontier Research' },
	{ src: osImg, alt: 'OS Kernel Integrity' },
];

export function ZoomParallax({ images = DEFAULT_IMAGES }: ZoomParallaxProps) {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

	return (
		<div ref={container} className="relative h-[300vh] bg-[#050505]">
			<div className="sticky top-0 h-screen overflow-hidden">
				{images.map(({ src, alt }, index) => {
					const scale = scales[index % scales.length];

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''} ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''} ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''} `}
						>
							<div className="relative h-[25vh] w-[25vw] overflow-hidden rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md">
								<img
									src={src || '/placeholder.svg'}
									alt={alt || `Parallax image ${index + 1}`}
									className="h-full w-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
								/>
                {/* Overlay for premium look */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 text-white font-medium text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  {alt}
                </div>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
