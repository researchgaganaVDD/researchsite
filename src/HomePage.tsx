import { motion } from 'framer-motion';
import { ChevronDown, Mail, Home, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Visual Vitamin Diagnosis (VVD)
            </motion.h1>
            <div className="hidden md:flex space-x-8">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section
  id="home"
  className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-cover bg-center"
  style={{ 
    backgroundImage: 'url(https://images.unsplash.com/photo-1613713569041-60a40cf006d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
    opacity: 0.9
  }}
>
  {/* Overlay to adjust background image brightness */}
  <div className="absolute inset-0 bg-black opacity-60"></div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center text-white"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Visual Vitamin Diagnosis
      </h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Non-invasive screening using facial, nail, and tongue analysis—powered by AI.
      </p>
      <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg"
      onClick={() => navigate('/form')} // ✅ Uses React Router
    >
      Submit Your Data
    </motion.button>
    </motion.div>
  </div>
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
    className="relative z-10 flex justify-center mt-16"
  >
    <ChevronDown className="text-blue-600 w-8 h-8" />
  </motion.div>
</section>


      {/* Features Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Our System?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We blend visual cues with LLM-based analysis for fast, accurate Vitamin D detection.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { feature: "Fast", description: "Quick image analysis for rapid results." },
              { feature: "Non-invasive", description: "No needles or blood draws." },
              { feature: "AI-Powered", description: "LLM diagnosis for precision." }
            ].map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl"
              >
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.feature}</h4>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Contact Us
          </h3>
          <p className="text-gray-600 mb-8">
            Questions? Reach out to us.
          </p>
          <a 
            href="mailto:info@vitamindscreening.com"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <Mail className="w-5 h-5 mr-2" />
            researchgagana@gmail.com
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
