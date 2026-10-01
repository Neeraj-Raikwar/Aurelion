import { useEffect, useRef } from 'react';

function useScrollImageSequence(frameCount, imagePathPrefix, imagePathSuffix) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const targetFrameRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');

    // Preload all images
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Format number to 4 digits: 1 -> "0001"
      const frameNum = String(i).padStart(4, '0');
      img.src = `${imagePathPrefix}${frameNum}${imagePathSuffix}`;
      imagesRef.current[i] = img;
    }

    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const html = document.documentElement;
      const scrollFraction = window.scrollY / (html.scrollHeight - window.innerHeight);
      
      // Map progress to frame index
      const frameIndex = Math.min(
        frameCount,
        Math.max(1, Math.ceil(scrollFraction * frameCount))
      );
      targetFrameRef.current = frameIndex;
    };

    let animationFrameId;
    let currentFrame = 1;

    const animate = () => {
      const target = targetFrameRef.current;
      
      // Smooth interpolation (lerp)
      currentFrame = currentFrame + (target - currentFrame) * 0.1;
      
      const frameToDraw = Math.round(currentFrame);
      const imgToDraw = imagesRef.current[frameToDraw];
      
      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        // Simulate object-fit: cover
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = imgToDraw.naturalWidth / imgToDraw.naturalHeight;
        
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;
        
        if (canvasRatio > imgRatio) {
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(imgToDraw, offsetX, offsetY, drawWidth, drawHeight);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Keep canvas size synced with window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Force an immediate draw
      const target = targetFrameRef.current;
      const img = imagesRef.current[target];
      if (img && img.complete) {
          context.clearRect(0,0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', resizeCanvas);
    
    resizeCanvas();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [frameCount, imagePathPrefix, imagePathSuffix]);

  return canvasRef;
}

export default useScrollImageSequence;
