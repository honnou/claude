'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  email: string
  phone: string
  service: string
  location: string
  preferredDate: string
  preferredTime: string
  message: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // In production, this would send to an API endpoint or email service
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log('Form data:', data)
      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-midnight-900 focus:ring-0 transition-colors"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-midnight-900 focus:ring-0 transition-colors"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone', { required: 'Phone number is required' })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-midnight-900 focus:ring-0 transition-colors"
          placeholder="(206) 555-1234"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Service Type */}
      <div>
        <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
          Service Needed *
        </label>
        <select
          id="service"
          {...register('service', { required: 'Please select a service' })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-midnight-900 focus:ring-0 transition-colors"
        >
          <option value="">Select a service...</option>
          <option value="courier">Document Courier</option>
          <option value="notary-waitlist">Notary Services (Waitlist - Q2 2026)</option>
          <option value="both">Both Services</option>
          <option value="question">General Question</option>
        </select>
        {errors.service && (
          <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
        )}
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
          Your Location (City) *
        </label>
        <input
          type="text"
          id="location"
          {...register('location', { required: 'Location is required' })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-midnight-900 focus:ring-0 transition-colors"
          placeholder="Auburn, WA"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      {/* Preferred Date */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred Date
          </label>
          <input
            type="date"
            id="preferredDate"
            {...register('preferredDate')}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-midnight-900 focus:ring-0 transition-colors"
          />
        </div>

        {/* Preferred Time */}
        <div>
          <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred Time
          </label>
          <select
            id="preferredTime"
            {...register('preferredTime')}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-midnight-900 focus:ring-0 transition-colors"
          >
            <option value="">Select time...</option>
            <option value="evening-5-7">Evening (5-7 PM)</option>
            <option value="evening-7-10">Evening (7-10 PM)</option>
            <option value="weekend-morning">Weekend Morning</option>
            <option value="weekend-afternoon">Weekend Afternoon</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Additional Details
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={5}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-midnight-900 focus:ring-0 transition-colors"
          placeholder="Please provide any additional details about your service needs, pickup/delivery addresses, or questions..."
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-center"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-green-800 font-semibold">Message sent successfully!</p>
          <p className="text-green-700 text-sm mt-1">
            We'll respond to your inquiry within 24 hours.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-800 font-semibold">Error sending message</p>
          <p className="text-red-700 text-sm mt-1">
            Please try again or email us directly at isaiah@nightridernotary.com
          </p>
        </div>
      )}

      <p className="text-sm text-gray-500 text-center">
        * Required fields
      </p>
    </form>
  )
}
