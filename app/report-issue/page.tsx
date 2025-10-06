"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Upload, X, CheckCircle, AlertCircle } from 'lucide-react'
import { Navbar } from '@/components/ui/navbar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// Form validation schema
const reportIssueSchema = z.object({
  issueType: z.string().min(1, "Please select an issue type"),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000, "Description must be less than 2000 characters"),
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  screenshots: z.array(z.any()).optional(),
})

type ReportIssueFormData = z.infer<typeof reportIssueSchema>

const issueTypes = [
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
  { value: "performance", label: "Performance Issue" },
  { value: "ui", label: "UI/UX Issue" },
  { value: "security", label: "Security Concern" },
  { value: "other", label: "Other" },
]

export default function ReportIssuePage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [screenshots, setScreenshots] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const form = useForm<ReportIssueFormData>({
    resolver: zodResolver(reportIssueSchema),
    defaultValues: {
      issueType: "",
      description: "",
      name: "",
      email: "",
      screenshots: [],
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/')
      const isUnder5MB = file.size <= 5 * 1024 * 1024 // 5MB limit
      
      if (!isImage) {
        setError('Only image files are allowed')
        return false
      }
      if (!isUnder5MB) {
        setError('Each file must be under 5MB')
        return false
      }
      return true
    })

    if (validFiles.length + screenshots.length > 5) {
      setError('Maximum 5 screenshots allowed')
      return
    }

    // Create preview URLs
    const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file))
    
    setScreenshots(prev => [...prev, ...validFiles])
    setPreviewUrls(prev => [...prev, ...newPreviewUrls])
    setError(null)
  }

  const removeScreenshot = (index: number) => {
    URL.revokeObjectURL(previewUrls[index])
    setScreenshots(prev => prev.filter((_, i) => i !== index))
    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: ReportIssueFormData) => {
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('issueType', data.issueType)
      formData.append('description', data.description)
      formData.append('name', data.name)
      formData.append('email', data.email)
      
      screenshots.forEach((file) => {
        formData.append('screenshots', file)
      })

      const response = await fetch('/api/report-issue', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit issue report')
      }

      setSuccess(true)
      form.reset()
      setScreenshots([])
      setPreviewUrls([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-black/40 backdrop-blur-md border-white/20">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="flex justify-center mb-6">
                  <div className="rounded-full bg-yellow-400/20 p-4">
                    <CheckCircle className="h-16 w-16 text-yellow-400" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
                <p className="text-gray-300 text-lg mb-8">
                  Your issue report has been successfully submitted. Our team will review it and get back to you soon.
                </p>
                <Button
                  onClick={() => setSuccess(false)}
                  className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold"
                >
                  Submit Another Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Report an Issue
            </h1>
            <p className="text-gray-400 text-lg">
              Help us improve Hintify by reporting bugs, suggesting features, or sharing your feedback
            </p>
          </div>

          {/* Form Card */}
          <Card className="bg-black/40 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Issue Details</CardTitle>
              <CardDescription className="text-gray-400">
                Please provide as much detail as possible to help us address your concern
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Error Alert */}
                  {error && (
                    <Alert className="bg-red-500/10 border-red-500/50 text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Issue Type */}
                  <FormField
                    control={form.control}
                    name="issueType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Issue Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-white/20 text-white">
                              <SelectValue placeholder="Select an issue type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black border-white/20">
                            {issueTypes.map((type) => (
                              <SelectItem 
                                key={type.value} 
                                value={type.value}
                                className="text-white hover:bg-white/10"
                              >
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please describe the issue in detail..."
                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 min-h-[150px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          {field.value.length}/2000 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Screenshot Upload */}
                  <div className="space-y-3">
                    <Label className="text-white">Screenshots (Optional)</Label>
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors">
                      <input
                        type="file"
                        id="screenshot-upload"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={loading || screenshots.length >= 5}
                      />
                      <label
                        htmlFor="screenshot-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <Upload className="h-10 w-10 text-gray-400 mb-3" />
                        <p className="text-white mb-1">Click to upload screenshots</p>
                        <p className="text-gray-400 text-sm">
                          PNG, JPG up to 5MB each (max 5 files)
                        </p>
                      </label>
                    </div>

                    {/* Screenshot Previews */}
                    {previewUrls.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Screenshot ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-white/20"
                            />
                            <button
                              type="button"
                              onClick={() => removeScreenshot(index)}
                              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {screenshots[index].name.length > 15
                                ? screenshots[index].name.substring(0, 15) + '...'
                                : screenshots[index].name}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Your Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your name here..."
                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="xyz@gamil.com"
                            className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          We'll use this to follow up on your report
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold text-lg h-12"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Report'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Footer */}
          <footer className="mt-16 text-center text-gray-400 text-sm">
            <div className="border-t border-white/10 pt-8">
              <p className="mb-2">
                © {new Date().getFullYear()} Hintify. All rights reserved.
              </p>
              <p className="text-gray-500">
                Need help? Contact us at{' '}
                <a
                  href="mailto:vivek.aryanvbw@gmail.com"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  vivek.aryanvbw@gmail.com
                </a>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

