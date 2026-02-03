import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Photo {
  id: number;
  src: string;
  caption?: string;
  rotation?: number;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Generate random rotations for polaroid effect
  const getRotation = (index: number) => {
    const rotations = [-5, 3, -3, 5, -2, 4, -4, 2];
    return rotations[index % rotations.length];
  };

  return (
    <div className="w-full">
      <motion.h2
        className="text-center font-romantic text-3xl md:text-4xl text-primary mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Our Beautiful Memories 📸
      </motion.h2>

      {/* Gallery grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="relative cursor-pointer group"
            initial={{ opacity: 0, y: 30, rotate: getRotation(index) }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              rotate: 0,
              zIndex: 10,
            }}
            onClick={() => setSelectedPhoto(photo)}
          >
            {/* Polaroid frame */}
            <div 
              className="bg-white p-2 pb-10 md:p-3 md:pb-12 rounded-sm shadow-lg transition-shadow duration-300 group-hover:shadow-2xl"
              style={{ 
                transform: `rotate(${photo.rotation || getRotation(index)}deg)`,
              }}
            >
              {/* Photo */}
              <div className="relative overflow-hidden aspect-square bg-muted">
                <img
                  src={photo.src}
                  alt={photo.caption || `Memory ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <span className="text-white text-2xl">💕</span>
                </motion.div>
              </div>

              {/* Caption */}
              {photo.caption && (
                <p className="absolute bottom-2 md:bottom-3 left-0 right-0 text-center font-romantic text-sm md:text-base text-foreground/70 px-2 truncate">
                  {photo.caption}
                </p>
              )}

              {/* Tape decoration */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-accent/40 rotate-3" />
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 rounded-lg blur-xl transition-all duration-300 -z-10" />
          </motion.div>
        ))}
      </div>

      {/* Placeholder if no photos */}
      {photos.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-6xl mb-4">📷</div>
          <p className="font-elegant text-lg text-muted-foreground">
            Add your special photos here...
          </p>
        </motion.div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="relative max-w-3xl max-h-[80vh] w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Large polaroid frame */}
              <div className="bg-white p-4 pb-16 md:p-6 md:pb-20 rounded-sm shadow-2xl">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption || 'Memory'}
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
                
                {selectedPhoto.caption && (
                  <p className="absolute bottom-4 md:bottom-6 left-0 right-0 text-center font-romantic text-lg md:text-xl text-foreground/80">
                    {selectedPhoto.caption}
                  </p>
                )}
              </div>

              {/* Close button */}
              <button
                className="absolute -top-4 -right-4 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                onClick={() => setSelectedPhoto(null)}
              >
                ×
              </button>

              {/* Heart decoration */}
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💖
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;
