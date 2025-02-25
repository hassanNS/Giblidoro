'use client';

const SpotifyWidget = () => {
  return (
    <div className="fixed bottom-8 left-8 w-[320px] h-[152px] bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg overflow-hidden">
      <iframe
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DX7GTqMQDhOum?utm_source=generator"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
};

export default SpotifyWidget;