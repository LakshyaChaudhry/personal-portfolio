import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

const aboutData = {
  name: "Lakshya Chaudhry",
  title: "AI @ Purdue",
  profileImage: '/assets/headshot.jpeg', 
  description: "Hi My name is Lakshya Chaudhry, I'm studying Artificial Intelligence at Purdue University with a strong focus on leveraging machine learning and software for impactful, real-world applications. My interests span AI research, quant roles, and software engineering, where I’m committed to developing innovative solutions that make a difference.",
  skills: ["React", "TypeScript", "Node.js", "Python", "Tailwind CSS", "AWS", "Azure"],
  social: {
    linkedin: "https://www.linkedin.com/in/lakshya-chaudhry-a0155a311",
    github: "https://github.com/LakshyaChaudhry", 
    twitter: "https://x.com/LakshChaudhry",
    email: "mailto:lakshchaudhry@gmail.com"
  }
};

function Blog() {
  return (
    <div className="flex-none w-screen min-h-screen scroll-snap-start flex flex-col justify-start items-center bg-gradient-to-br pt-24 pb-16 px-4">
      <div className="max-w-6xl w-full">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            About Me
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Main Section - Image Left, Description Right - Side by Side */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-16">
          
          {/* Left - Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={aboutData.profileImage}
              alt={aboutData.name}
              className="w-80 h-80 rounded-full object-cover border-4 border-white/60 shadow-2xl"
            />
          </div>

          {/* Right - Glassmorphic Description Card with Social Icons */}
          <div className="bg-white/40 backdrop-blur-lg rounded-3xl border border-white/50 p-10 shadow-2xl max-w-lg">
            <h1 className="text-4xl font-light text-gray-900 mb-2">
              {aboutData.name}
            </h1>
            <p className="text-xl text-gray-600 font-light mb-8">
              {aboutData.title}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed font-light mb-8">
              {aboutData.description}
            </p>
            
            {/* Social Icons on the card */}
            <div className="flex justify-center gap-4">
              <a
                href={aboutData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-600 hover:border-blue-500 hover:text-blue-500 hover:scale-110 transition-all duration-300"
              >
                <Linkedin size={20} strokeWidth={1.5} />
              </a>

              <a
                href={aboutData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-600 hover:border-gray-800 hover:text-gray-800 hover:scale-110 transition-all duration-300"
              >
                <Github size={20} strokeWidth={1.5} />
              </a>

              <a
                href={aboutData.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-600 hover:border-sky-500 hover:text-sky-500 hover:scale-110 transition-all duration-300"
              >
                <Twitter size={20} strokeWidth={1.5} />
              </a>

              <a
                href={aboutData.social.email}
                className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-600 hover:border-red-500 hover:text-red-500 hover:scale-110 transition-all duration-300"
              >
                <Mail size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

      <div className="flex justify-center px-8 py-8">
        <div className="bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 px-8 py-6 shadow-lg">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-light text-gray-900 mb-1">
              Get In Touch
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6 mb-8">
            {/* First Row - Name, Email, Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-white/30 transition-all duration-300"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-white/30 transition-all duration-300"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-white/30 transition-all duration-300 sm:col-span-2 lg:col-span-1"
              />
            </div>

            {/* Subject */}
            <input
              type="text"
              placeholder="Enter Subject"
              className="w-full p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-white/30 transition-all duration-300"
            />

            {/* Message */}
            <textarea
              placeholder="Message"
              rows={3}
              className="w-full p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-white/30 transition-all duration-300 resize-none"
            />
          </div>

          {/* CTA Button */}
          <div className="mt-6 pt-4 border-t border-white/30">
            <button
              onClick={() => {
                // Handle form submission here
                console.log('Form submitted');
              }}
              className="w-full block text-center py-3 px-6 bg-gradient-to-r from-pink-400 to-pink-600 text-white font-medium rounded-xl hover:from-pink-500 hover:to-pink-700 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Send Message
            </button>
          </div>
        </div>
    </div>
  
    
    {/* Technologies Section */}
    <div className="flex justify-center">
          <div className="bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 px-8 py-6 shadow-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">Technologies</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {aboutData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full text-gray-800 font-medium text-sm border border-white/30 hover:bg-white/60 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default Blog;