import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend API
    console.log('Form submitted:', formData);

    // Show feedback message
    setFeedback('Thank you for your message! We will get back to you shortly.');
    
    // Clear the form
    setFormData({ name: '', email: '', message: '' });

    // Hide feedback message after 5 seconds
    setTimeout(() => {
      setFeedback('');
    }, 5000);
  };

  return (
    <section id="contact" className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
      <div className="max-w-lg mx-auto p-8 rounded-lg shadow-lg">
        <form id="contactForm" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-transparent"
              required
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700">
            Send Message
          </button>
        </form>
        {feedback && (
          <p id="form-feedback" className="text-green-500 text-center mt-4">
            {feedback}
          </p>
        )}
      </div>
    </section>
  );
};

export default Contact;