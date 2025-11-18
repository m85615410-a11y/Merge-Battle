export function SplashScreen() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        {/* Logo with fade-in animation */}
        <div className="animate-fade-in">
          <h1 className="text-white mb-2" style={{ fontSize: '48px', fontWeight: '700' }}>
            Az&Dil group
          </h1>
          <div className="h-1 w-32 bg-[#00E5FF] mx-auto rounded-full mt-4"></div>
        </div>
      </div>
    </div>
  );
}
