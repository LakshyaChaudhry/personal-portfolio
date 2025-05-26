// src/components/TailwindV4Test.tsx
export default function TailwindV4Test() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-8">
      {/* Basic Tailwind test */}
      <div className="max-w-md mx-auto">
        {/* Test basic styling first */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">
            Tailwind v4 Test
          </h2>
          
          {/* Test our custom glass class */}
          <div className="glass rounded-xl p-4 mb-4 animate-float">
            <p className="text-white/80">This should float!</p>
          </div>
          
          {/* Test color variants */}
          <div className="space-y-2 text-white">
            <div className="glass p-2 rounded">Default Glass</div>
            <div className="glass-light p-2 rounded">Light Glass</div>
            <div className="glass-dark p-2 rounded">Dark Glass</div>
          </div>
          
          {/* Test button */}
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300">
            Test Button
          </button>
        </div>
      </div>
    </div>
  );
}