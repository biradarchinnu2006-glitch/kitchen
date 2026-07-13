const spices = [
  { label: "Star Anise", radius: 170, duration: 22, size: 34, delay: 0 },
  { label: "Cinnamon", radius: 140, duration: 16, size: 26, delay: -4 },
  { label: "Cardamom", radius: 200, duration: 26, size: 20, delay: -9 },
  { label: "Bay Leaf", radius: 120, duration: 14, size: 22, delay: -2 },
  { label: "Chilli", radius: 190, duration: 20, size: 18, delay: -12 },
];

/**
 * This is the site's signature element: a hand-built substitute for a
 * photoreal 3D biryani-bowl render (that needs real modelled/textured
 * assets we don't have). It reads as intentional rather than a
 * placeholder, and the mount point below is where a React Three Fiber
 * <Canvas> with a real GLTF model can be dropped in later without
 * touching the surrounding layout.
 */
export default function SpiceOrbit({ size = 460 }: { size?: number }) {
  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* steam */}
      <div className="absolute left-1/2 top-[8%] -translate-x-1/2 flex gap-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-2 h-16 rounded-full bg-gradient-to-t from-cream/0 via-cream/40 to-cream/0 animate-rise"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </div>

      {/* bowl */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/40 shadow-[0_0_80px_-10px_rgba(201,162,75,0.35)]"
        style={{
          width: size * 0.52,
          height: size * 0.52,
          background:
            "radial-gradient(circle at 35% 30%, #E0BB66 0%, #B3611C 45%, #4A3220 100%)",
        }}
      >
        <div className="absolute inset-4 rounded-full border border-charcoal/40 bg-charcoal/10 backdrop-blur-sm" />
      </div>

      {/* orbiting spices */}
      {spices.map((s) => (
        <div
          key={s.label}
          className="absolute left-1/2 top-1/2 animate-orbit"
          style={
            {
              "--r": `${s.radius}px`,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
              marginLeft: -s.size / 2,
              marginTop: -s.size / 2,
            } as React.CSSProperties
          }
        >
          <div
            className="rounded-full bg-gold/20 border border-gold/50"
            style={{ width: s.size, height: s.size }}
            title={s.label}
          />
        </div>
      ))}
    </div>
  );
}
