import { useRef } from 'react';
import { motion } from 'framer-motion';

interface FullscreenVideoProps {
  onVideoEnd: () => void;
}

const FullscreenVideo = ({ onVideoEnd }: FullscreenVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <video
        ref={videoRef}
        src="/videos/valentine-video.mp4"
        autoPlay
        playsInline
        onEnded={onVideoEnd}
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

export default FullscreenVideo;
