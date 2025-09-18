export function HeroSection() {
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden rounded-xl mb-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-xl"
        style={{
          backgroundImage: `url('/mountain-vista.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-purple-800/40 to-pink-900/60 rounded-xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
          Your AI Travel
          <span className="block text-purple-300 font-black">Companion</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
          Discover amazing destinations, book flights & hotels, and get personalized recommendations powered by AI
        </p>
      </div>
    </section>
  )
}
