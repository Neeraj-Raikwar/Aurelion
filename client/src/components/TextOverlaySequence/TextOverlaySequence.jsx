import { motion, useTransform } from 'framer-motion';
import './TextOverlaySequence.css';

// scrollYProgress is a "motion value" from Framer Motion — a special
// number that goes from 0 (top of the scroll container) to 1 (bottom).
// It's passed in from Home.jsx, where it's tied to the tall 700vh div.
function TextOverlaySequence({ scrollYProgress }) {
  // ===========================================================
  // Each scene defines the WHOLE scroll-progress range (0–1)
  // during which it should be visible.
  // Example: Scene 1 starts fading in at 4% scrolled, is fully
  // visible by 8%, stays visible until 14%, then fades out by 18%.
  //
  // useTransform(scrollYProgress, [inputRange], [outputRange])
  // means: "as scrollYProgress moves through these input values,
  // smoothly map it to these output values."
  //
  // For opacity: [0, 1, 1, 0] = invisible -> visible -> visible -> invisible
  // For y (vertical shift): [30, 0, 0, -30] = starts 30px below its
  // resting position, settles to 0 (normal position), then drifts
  // 30px upward as it fades out — this creates the "rises while
  // fading in" motion the spec asked for.
  // ===========================================================

  // Scene 1 — left side
  const scene1Opacity = useTransform(scrollYProgress, [0.02, 0.06, 0.14, 0.18], [0, 1, 1, 0]);
  const scene1Y = useTransform(scrollYProgress, [0.02, 0.06, 0.14, 0.18], [30, 0, 0, -30]);

  // Scene 2 — right side
  const scene2Opacity = useTransform(scrollYProgress, [0.20, 0.24, 0.32, 0.36], [0, 1, 1, 0]);
  const scene2Y = useTransform(scrollYProgress, [0.20, 0.24, 0.32, 0.36], [30, 0, 0, -30]);

  // Scene 3 — left side
  const scene3Opacity = useTransform(scrollYProgress, [0.38, 0.42, 0.50, 0.54], [0, 1, 1, 0]);
  const scene3Y = useTransform(scrollYProgress, [0.38, 0.42, 0.50, 0.54], [30, 0, 0, -30]);

  // Scene 4 — right side
  const scene4Opacity = useTransform(scrollYProgress, [0.56, 0.60, 0.68, 0.72], [0, 1, 1, 0]);
  const scene4Y = useTransform(scrollYProgress, [0.56, 0.60, 0.68, 0.72], [30, 0, 0, -30]);

  // Scene 5 — left side
  const scene5Opacity = useTransform(scrollYProgress, [0.74, 0.78, 0.86, 0.90], [0, 1, 1, 0]);
  const scene5Y = useTransform(scrollYProgress, [0.74, 0.78, 0.86, 0.90], [30, 0, 0, -30]);

  return (
    // This wrapper itself doesn't scroll — it's positioned fixed,
    // same as the video, so text sits on top of the video at all times.
    <div className="text-overlay-wrapper">

      <motion.div
        className="text-scene scene-left"
        style={{ opacity: scene1Opacity, y: scene1Y }}
      >
        <p className="eyebrow">PRECISION MOVEMENT</p>
        <h2>Time, built by hand.</h2>
        <p className="body">Every AURELION begins as raw metal and patience.</p>
      </motion.div>

      <motion.div
        className="text-scene scene-right"
        style={{ opacity: scene2Opacity, y: scene2Y }}
      >
        <p className="eyebrow">THE MECHANISM</p>
        <h2>Every gear finds its place.</h2>
        <p className="body">Balance wheel, jewels and bridge unite in silence.</p>
      </motion.div>

      <motion.div
        className="text-scene scene-left"
        style={{ opacity: scene3Opacity, y: scene3Y }}
      >
        <p className="eyebrow">THE FORM</p>
        <h2>Components become character.</h2>
        <p className="body">Raw parts are transformed into a singular signature.</p>
      </motion.div>

      <motion.div
        className="text-scene scene-right"
        style={{ opacity: scene4Opacity, y: scene4Y }}
      >
        <p className="eyebrow">THE CASTING</p>
        <h2>Metal becomes light.</h2>
        <p className="body">Molten gold and polished steel settle into form.</p>
      </motion.div>

      <motion.div
        className="text-scene scene-left"
        style={{ opacity: scene5Opacity, y: scene5Y }}
      >
        <p className="eyebrow">THE RITUAL</p>
        <h2>Worn quietly, felt permanently.</h2>
        <p className="body">A weight on the wrist that outlasts the hour.</p>
      </motion.div>

    </div>
  );
}

export default TextOverlaySequence;
