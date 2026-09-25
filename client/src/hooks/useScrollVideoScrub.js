import { useEffect, useRef } from 'react';

// This custom hook takes a container height (in vh, e.g. 700 for 700vh)
// and returns a ref you attach to your <video> tag.
// It handles: reading scroll progress, converting it to a video time,
// and smoothly moving the video's currentTime toward that target every frame.
function useScrollVideoScrub() {
  // ---------------------------------------------------------
  // useRef gives us a "box" that persists across re-renders
  // without causing a re-render itself when it changes.
  // We use it to hold a direct reference to the actual <video>
  // DOM element, so we can read/set its properties (like
  // .currentTime and .duration) directly with JavaScript.
  // ---------------------------------------------------------
  const videoRef = useRef(null);

  // This ref holds the TARGET time we want the video to reach.
  // It's a ref (not useState) because it changes very frequently
  // (on every scroll event) and we don't want a re-render every
  // single time it changes — we only need JS to read/write it.
  const targetTimeRef = useRef(0);

  // This ref tracks whether the video's metadata (duration, etc.)
  // has finished loading. Until it has, video.duration is NaN,
  // so we must not calculate anything based on it yet.
  const isMetadataLoadedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;

    // Safety check — if for some reason the <video> isn't
    // mounted yet, don't run any of the logic below.
    if (!video) return;

    // ---------------------------------------------------------
    // STEP 1: Wait for the video's metadata to load.
    // "Metadata" includes things like duration, dimensions, etc.
    // video.duration is NaN until this event fires — so anything
    // that divides or multiplies by duration MUST wait for this.
    // ---------------------------------------------------------
    const handleLoadedMetadata = () => {
      isMetadataLoadedRef.current = true;
    };

    // ---------------------------------------------------------
    // STEP 2: Every time the user scrolls, recalculate the
    // TARGET time the video should eventually reach.
    // We do NOT set video.currentTime directly here — that would
    // cause jumpy, jerky playback. We only update the target;
    // the smoothing happens separately in the animation loop (Step 3).
    // ---------------------------------------------------------
    const handleScroll = () => {
      // Don't calculate anything until we know the real duration.
      if (!isMetadataLoadedRef.current) return;

      // document.documentElement.scrollHeight = total height of the
      // entire page's content (in pixels).
      // window.innerHeight = height of the visible browser viewport.
      // Subtracting gives us the total distance (in pixels) the user
      // can actually scroll through.
      const totalScrollableDistance =
        document.documentElement.scrollHeight - window.innerHeight;

      // window.scrollY = how far down (in pixels) the user has
      // currently scrolled from the top of the page.
      const currentScrollPosition = window.scrollY;

      // Divide "how far scrolled" by "total scrollable distance"
      // to get a progress value between 0 (top) and 1 (bottom).
      // We clamp it with Math.min/Math.max so it never goes
      // below 0 or above 1, even due to rounding edge-cases.
      let scrollProgress = currentScrollPosition / totalScrollableDistance;
      scrollProgress = Math.max(0, Math.min(1, scrollProgress));

      // Convert that 0–1 progress into an actual video time.
      // e.g. if progress is 0.5 and the video is 20s long,
      // targetTime becomes 10s.
      targetTimeRef.current = scrollProgress * video.duration;
    };

    // ---------------------------------------------------------
    // STEP 3: The animation loop.
    // requestAnimationFrame asks the browser to run this function
    // right before its next repaint — typically ~60 times per second.
    // Each time it runs, we nudge the video's ACTUAL currentTime
    // a little bit closer to the TARGET time (targetTimeRef.current).
    // This gradual nudging is what makes the scrubbing feel smooth
    // instead of jumping instantly to a new time every scroll event.
    // ---------------------------------------------------------
    let animationFrameId;

    const animate = () => {
      if (isMetadataLoadedRef.current) {
        const current = video.currentTime;
        const target = targetTimeRef.current;

        // This is "linear interpolation" (lerp).
        // (target - current) = how far away we still are.
        // Multiplying by 0.1 means: close 10% of that remaining
        // gap on this frame. Next frame, we'll close 10% of
        // whatever gap is LEFT — so the movement naturally
        // slows down as it approaches the target, which looks smooth.
        // You can tweak 0.1 — a bigger number (e.g. 0.2) = snappier,
        // a smaller number (e.g. 0.05) = softer/slower catch-up.
        const smoothingFactor = 0.1;
        video.currentTime = current + (target - current) * smoothingFactor;
      }

      // Schedule the NEXT frame — this makes it a continuous loop.
      // Without this line, animate() would only run once.
      animationFrameId = requestAnimationFrame(animate);
    };

    // ---------------------------------------------------------
    // Wire everything up:
    // - listen for metadata loading
    // - listen for scroll events (to update the target)
    // - kick off the animation loop (to smoothly chase the target)
    // ---------------------------------------------------------
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    window.addEventListener('scroll', handleScroll);
    animationFrameId = requestAnimationFrame(animate);

    // ---------------------------------------------------------
    // CLEANUP FUNCTION — React runs this when the component
    // unmounts (or before this effect re-runs). Without removing
    // these listeners/loops, they'd keep running forever in the
    // background even after the user leaves the page — a memory leak.
    // ---------------------------------------------------------
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // empty [] = this setup runs once, when the component first mounts

  // Return the ref so the component using this hook can attach it
  // to its <video> element like: <video ref={videoRef} ... />
  return videoRef;
}

export default useScrollVideoScrub;
