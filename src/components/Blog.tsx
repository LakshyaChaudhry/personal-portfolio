import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

const aboutData = {
  name: "Lakshya Chaudhry",
  title: "",
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
    <div className="min-h-screen py-20 px-4 
                   bg-gray-50 dark:bg-gray-900 
                   transition-colors duration-300">
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold 
                       text-gray-900 dark:text-white mb-4 
                       transition-colors duration-300">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Main Section - Image Left, Description Right - Side by Side */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-16">
          
          {/* Left - Profile Image */}
          <div className="flex-shrink-0">
            <img
              src={aboutData.profileImage}
              alt={aboutData.name}
              className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover 
                       border-4 border-gray-200 dark:border-gray-700 
                       shadow-2xl transition-colors duration-300"
            />
          </div>

          {/* Right - Description Card with Social Icons */}
          <div className="bg-white dark:bg-gray-800 
                        rounded-3xl border border-gray-200 dark:border-gray-700 
                        p-8 md:p-10 shadow-xl max-w-lg 
                        transition-colors duration-300">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 
                         transition-colors duration-300">
              {aboutData.name}
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 
                        transition-colors duration-300">
              {aboutData.title}
            </p>
            <p className="text-base text-gray-700 dark:text-gray-300 
                        leading-relaxed mb-8 transition-colors duration-300">
              {aboutData.description}
            </p>
            
            {/* Social Icons on the card */}
            <div className="flex justify-center gap-4">
              <a
                href={aboutData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full 
                         border-2 border-gray-300 dark:border-gray-600 
                         text-gray-600 dark:text-gray-400 
                         hover:border-blue-500 hover:text-blue-500 
                         hover:scale-110 transition-all duration-300"
              >
                <Linkedin size={20} strokeWidth={1.5} />
              </a>

              <a
                href={aboutData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full 
                         border-2 border-gray-300 dark:border-gray-600 
                         text-gray-600 dark:text-gray-400 
                         hover:border-gray-800 dark:hover:border-white 
                         hover:text-gray-800 dark:hover:text-white 
                         hover:scale-110 transition-all duration-300"
              >
                <Github size={20} strokeWidth={1.5} />
              </a>

              <a
                href={aboutData.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full 
                         border-2 border-gray-300 dark:border-gray-600 
                         text-gray-600 dark:text-gray-400 
                         hover:border-sky-500 hover:text-sky-500 
                         hover:scale-110 transition-all duration-300"
              >
                <Twitter size={20} strokeWidth={1.5} />
              </a>

              <a
                href={aboutData.social.email}
                className="w-12 h-12 flex items-center justify-center rounded-full 
                         border-2 border-gray-300 dark:border-gray-600 
                         text-gray-600 dark:text-gray-400 
                         hover:border-red-500 hover:text-red-500 
                         hover:scale-110 transition-all duration-300"
              >
                <Mail size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

      <div className="flex justify-center px-4 py-8">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 
                      rounded-2xl border border-gray-200 dark:border-gray-700 
                      px-6 md:px-8 py-8 shadow-xl transition-colors duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 
                         transition-colors duration-300">
              Get In Touch
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* Contact Form */}
          <div className="space-y-4 mb-8">
            {/* First Row - Name, Email, Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="p-4 bg-gray-50 dark:bg-gray-900 
                         rounded-xl border border-gray-300 dark:border-gray-600 
                         text-gray-900 dark:text-white 
                         placeholder-gray-500 dark:placeholder-gray-400 
                         focus:outline-none focus:border-blue-500 
                         transition-all duration-300"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="p-4 bg-gray-50 dark:bg-gray-900 
                         rounded-xl border border-gray-300 dark:border-gray-600 
                         text-gray-900 dark:text-white 
                         placeholder-gray-500 dark:placeholder-gray-400 
                         focus:outline-none focus:border-blue-500 
                         transition-all duration-300"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="p-4 bg-gray-50 dark:bg-gray-900 
                         rounded-xl border border-gray-300 dark:border-gray-600 
                         text-gray-900 dark:text-white 
                         placeholder-gray-500 dark:placeholder-gray-400 
                         focus:outline-none focus:border-blue-500 
                         transition-all duration-300 sm:col-span-2 lg:col-span-1"
              />
            </div>

            {/* Subject */}
            <input
              type="text"
              placeholder="Enter Subject"
              className="w-full p-4 bg-gray-50 dark:bg-gray-900 
                       rounded-xl border border-gray-300 dark:border-gray-600 
                       text-gray-900 dark:text-white 
                       placeholder-gray-500 dark:placeholder-gray-400 
                       focus:outline-none focus:border-blue-500 
                       transition-all duration-300"
            />

            {/* Message */}
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full p-4 bg-gray-50 dark:bg-gray-900 
                       rounded-xl border border-gray-300 dark:border-gray-600 
                       text-gray-900 dark:text-white 
                       placeholder-gray-500 dark:placeholder-gray-400 
                       focus:outline-none focus:border-blue-500 
                       transition-all duration-300 resize-none"
            />
          </div>

          {/* CTA Button */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 
                        transition-colors duration-300">
            <button
              onClick={async () => {
                const nameInput = document.querySelector('input[placeholder="Name"]') as HTMLInputElement;
                const emailInput = document.querySelector('input[placeholder="Email Address"]') as HTMLInputElement;
                const subjectInput = document.querySelector('input[placeholder="Enter Subject"]') as HTMLInputElement;
                const messageInput = document.querySelector('textarea[placeholder="Message"]') as HTMLTextAreaElement;
              
                const payload = {
                  name: nameInput.value,
                  email: emailInput.value,
                  subject: subjectInput.value,
                  message: messageInput.value,
                };
              
                const res = await fetch('/api/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                });
              
                if (res.ok) {
                  alert('Thanks! Your message was sent.');
                  nameInput.value = '';
                  emailInput.value = '';
                  subjectInput.value = '';
                  messageInput.value = '';
                } else {
                  alert('Oops! Something went wrong.');
                }
              }}
              
              className="w-full block text-center py-4 px-6 
                       bg-gradient-to-r from-blue-600 to-purple-600 
                       text-white font-semibold rounded-xl 
                       hover:from-blue-700 hover:to-purple-700 
                       hover:scale-[1.02] transition-all duration-300 
                       shadow-lg hover:shadow-xl"
            >
              Send Message
            </button>
          </div>
        </div>
    </div>
  
    
    {/* Technologies Section */}
    <div className="flex justify-center px-4">
          <div className="w-full max-w-3xl bg-white dark:bg-gray-800 
                        rounded-2xl border border-gray-200 dark:border-gray-700 
                        px-6 md:px-8 py-8 shadow-xl 
                        transition-colors duration-300">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center 
                         transition-colors duration-300">
              Technologies & Skills
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {aboutData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-5 py-2.5 bg-gray-100 dark:bg-gray-900 
                           rounded-full text-gray-800 dark:text-gray-200 
                           font-medium text-sm 
                           border border-gray-200 dark:border-gray-700 
                           hover:bg-gray-200 dark:hover:bg-gray-700 
                           transition-all duration-300"
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