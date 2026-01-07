import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative min-h-screen flex items-center py-20 overflow-hidden bg-gray-900">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cherry-600/5 rounded-full blur-3xl" />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cherry-500/25 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-lg">
          {/* Header */}
          <motion.div ref={headerRef} className="mb-8">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
              style={{
                background: 'rgba(225, 29, 72, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.2)',
                color: '#FB7185'
              }}
            >
              Get In Touch
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl lg:text-5xl font-bold text-white mb-4"
            >
              Let's Start a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherry-400 via-cherry-500 to-rose-500">
                Conversation
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-gray-400 text-base"
            >
              Have a project in mind? Let's create something amazing together.
            </motion.p>
          </motion.div>
          
          {/* Contact Info - compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex gap-4 mb-8"
          >
            {[
              { icon: '📧', value: 'hello@carboncrew.studio' },
              { icon: '📍', value: 'San Francisco, CA' },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
                whileHover={{ borderColor: 'rgba(244, 63, 94, 0.25)' }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm text-gray-300">{item.value}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Form */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-xl text-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.08) 0%, rgba(244, 63, 94, 0.04) 100%)',
                    border: '1px solid rgba(244, 63, 94, 0.25)',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
                    className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.2) 0%, rgba(244, 63, 94, 0.1) 100%)',
                      border: '1px solid rgba(244, 63, 94, 0.3)',
                    }}
                  >
                    <svg className="w-7 h-7 text-cherry-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-sm">We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Name & Email row */}
                  <div className="grid grid-cols-2 gap-4">
                    {['name', 'email'].map((field) => (
                      <div key={field}>
                        <motion.input
                          type={field === 'email' ? 'email' : 'text'}
                          placeholder={field === 'name' ? 'Your Name' : 'Email'}
                          required
                          value={formState[field as keyof typeof formState]}
                          onChange={(e) => setFormState({ ...formState, [field]: e.target.value })}
                          onFocus={() => setFocusedField(field)}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 text-sm outline-none transition-all duration-200"
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: focusedField === field 
                              ? '1px solid rgba(244, 63, 94, 0.4)' 
                              : '1px solid rgba(255, 255, 255, 0.08)',
                            boxShadow: focusedField === field 
                              ? '0 0 20px rgba(244, 63, 94, 0.1)' 
                              : 'none',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Message */}
                  <motion.textarea
                    placeholder="Tell us about your project..."
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 text-sm outline-none resize-none transition-all duration-200"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: focusedField === 'message' 
                        ? '1px solid rgba(244, 63, 94, 0.4)' 
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: focusedField === 'message' 
                        ? '0 0 20px rgba(244, 63, 94, 0.1)' 
                        : 'none',
                    }}
                  />
                  
                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-lg font-semibold text-white flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)',
                      boxShadow: '0 4px 20px rgba(225, 29, 72, 0.25)',
                    }}
                    whileHover={{ scale: 1.01, boxShadow: '0 6px 25px rgba(225, 29, 72, 0.35)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
