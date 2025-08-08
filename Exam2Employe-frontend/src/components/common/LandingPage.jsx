import { 
  AcademicCapIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CheckCircleIcon,
  LightningBoltIcon,
  SparklesIcon
} from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';

const LandingPage = ({ onLoginClick, onSignUpClick }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 right-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 pt-10"
        >
          <div className="inline-flex items-center mb-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
            <LightningBoltIcon className="h-5 w-5 mr-2" />
            The future of hiring is here
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Revolutionizing Hiring with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Exam2Employ</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bridging the gap between talent and opportunity with AI-powered assessments and intelligent matching.
          </p>
        </motion.div>

        {/* Value Cards */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-28"
        >
          {[
            {
              icon: <AcademicCapIcon className="h-8 w-8 text-blue-600" />,
              title: "For Candidates",
              points: [
                "User-friendly test interface",
                "Personalized skill reports",
                "Actionable feedback",
              ],
              bg: "bg-gradient-to-br from-blue-50 to-indigo-50"
            },
            {
              icon: <BriefcaseIcon className="h-8 w-8 text-blue-600" />,
              title: "For Employers",
              points: [
                "Comprehensive analytics",
                "Real-time tracking",
                "Reduced hiring cycles"
              ],
              bg: "bg-gradient-to-br from-indigo-50 to-purple-50"
            },
            {
              icon: <ChartBarIcon className="h-8 w-8 text-blue-600" />,
              title: "Key Benefits",
              points: [
                "Scalable architecture",
                "Secure authentication",
                "Interview reduction"
              ],
              bg: "bg-gradient-to-br from-purple-50 to-blue-50"
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <ValueCard 
                icon={card.icon}
                title={card.title}
                points={card.points}
                isHovered={hoveredCard === index}
                bg={card.bg}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Process Steps */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden mb-28 border border-gray-100"
        >
          <div className="p-10">
            <div className="flex items-center justify-center mb-2">
              <SparklesIcon className="h-6 w-6 text-yellow-500 mr-2" />
              <h2 className="text-3xl font-bold text-gray-800 text-center">How Exam2Employ Works</h2>
            </div>
            <p className="text-gray-500 text-center max-w-2xl mx-auto mb-10">
              Our streamlined process ensures both candidates and employers get the best experience
            </p>
            <div className="grid gap-10 md:grid-cols-2">
              {[
                {
                  step: "1",
                  title: "Skill Assessment",
                  description: "Candidates complete comprehensive evaluations covering technical and soft skills",
                  icon: <AcademicCapIcon className="h-6 w-6 text-blue-600" />
                },
                {
                  step: "2",
                  title: "Intelligent Analysis",
                  description: "Our platform generates detailed performance analytics and employability scores",
                  icon: <ChartBarIcon className="h-6 w-6 text-blue-600" />
                },
                {
                  step: "3",
                  title: "Personalized Reports",
                  description: "Candidates receive actionable feedback to improve their skills",
                  icon: <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                },
                {
                  step: "4",
                  title: "Employer Matching",
                  description: "HR teams access vetted candidates through intuitive dashboards",
                  icon: <BriefcaseIcon className="h-6 w-6 text-blue-600" />
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProcessStep 
                    step={step.step}
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to transform your hiring or career journey?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of companies and candidates who've revolutionized their hiring process with Exam2Employ
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSignUpClick}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <SparklesIcon className="h-5 w-5 mr-2" />
              Get Started Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLoginClick}
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-all shadow-sm hover:shadow-md"
            >
              Existing User? Login
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Add some global styles for animations */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

const ValueCard = ({ icon, title, points, isHovered, bg }) => (
  <div className={`${bg} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-white/50 relative overflow-hidden`}>
    {/* Animated highlight on hover */}
    {isHovered && (
      <motion.div 
        className="absolute inset-0 bg-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    )}
    
    <div className="flex items-center mb-6">
      <div className="p-3 rounded-xl bg-white shadow-sm mr-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
    </div>
    <ul className="space-y-3">
      {points.map((point, index) => (
        <motion.li 
          key={index} 
          className="flex items-start"
          initial={{ x: -10 }}
          animate={{ x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <CheckCircleIcon className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
          <span className="text-gray-600 text-lg">{point}</span>
        </motion.li>
      ))}
    </ul>
  </div>
);

const ProcessStep = ({ step, title, description, icon }) => (
  <div className="flex group">
    <div className="flex-shrink-0 relative">
      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 font-bold mr-6 group-hover:from-blue-200 group-hover:to-blue-100 transition-all shadow-sm">
        {step}
      </div>
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-6 w-px bg-gradient-to-b from-blue-200 to-transparent"></div>
    </div>
    <div>
      <div className="flex items-center mb-2">
        {icon}
        <h4 className="text-xl font-bold text-gray-800 ml-2">{title}</h4>
      </div>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  </div>
);

export default LandingPage;