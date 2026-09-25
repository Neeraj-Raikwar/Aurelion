import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import TextOverlaySequence from '../components/TextOverlaySequence/TextOverlaySequence';
import useScrollVideoScrub from '../hooks/useScrollVideoScrub';

function Home() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const videoRef = useScrollVideoScrub();

  // ---------------------------------------------------------
  // HERO ENDING TRANSITION
  // ---------------------------------------------------------
  // Stage 1 — darken: between 82% and 94% scrolled, a dark
  // gradient overlay fades IN on top of the video (0 -> 1 opacity).
  // This is the "gradually darken the video" step from the spec.
  const overlayOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0, 1]);

  // Stage 2 — reveal: between 94% and 100% scrolled, BOTH the
  // video and that dark overlay fade all the way to fully
  // transparent (1 -> 0). Once they're transparent, whatever is
  // positioned normally below this tall container (the Footer)
  // becomes visible through them, with no sudden cut.
  const heroOpacity = useTransform(scrollYProgress, [0.94, 1], [1, 0]);

  return (
    <div ref={containerRef} style={{ height: '700vh', position: 'relative' }}>

      {/* This motion.div wraps BOTH the video and the dark overlay,
          so heroOpacity fades them out together as one unit. */}
      <motion.div style={{ opacity: heroOpacity, position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh' }}>

        <video
          ref={videoRef}
          src="/video/aurelion-formation-scrub.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute', // relative to the motion.div wrapper above, which is already fixed
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none', // video has no controls, so let clicks/scroll pass straight through it
          }}
        />

        {/* Dark gradient overlay — sits on top of the video.
            Fades in via overlayOpacity during stage 1, then fades
            out together with the video during stage 2 (because it's
            inside the same heroOpacity wrapper). */}
        <motion.div
          style={{
            opacity: overlayOpacity,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, transparent 0%, #050505 90%)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      <TextOverlaySequence scrollYProgress={scrollYProgress} />
    </div>
  );
}

export default Home;
