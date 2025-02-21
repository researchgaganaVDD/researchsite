import { useState } from "react";
import { Upload, CheckCircle2, AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://ezgihiuglhbzrarydqku.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6Z2loaXVnbGhienJhcnlkcWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNjUyNjcsImV4cCI6MjA1NTc0MTI2N30.DedW0zXH7KOYx_KrAmd20NOyKcFUcMfP_HsK_5VbncU");

interface IFormData {
  name: string;
  age: string;
  gender: string;
  fingersImage: File | null;
  tongueImage: File | null;
  eyesImage: File | null;
}

const MedicalIntakeForm = () => {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    age: "",
    gender: "",
    fingersImage: null,
    tongueImage: null,
    eyesImage: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, imageType: string) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      setFormData({ ...formData, [imageType]: file });
      setImagePreview({ ...imagePreview, [imageType]: URL.createObjectURL(file) });
    }
  };

  const uploadImage = async (file: File, path: string) => {
    const { data, error } = await supabase.storage.from("image").upload(path, file);
    if (error) throw error;
    return data.path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const filePaths: Record<string, string> = {};
      for (const key of ["fingersImage", "tongueImage", "eyesImage"] as const) {
        if (formData[key]) {
          filePaths[key] = await uploadImage(formData[key]!, `images/${Date.now()}-${key}`);
        }
      }
      
      await supabase.from("user_data").insert([{ 
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        ...filePaths 
      }]);
      
      setSubmitted(true);
    } catch (err) {
      setError("Failed to submit. Please try again. " + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const imageTypes = [
    {
      id: "fingersImage",
      label: "Finger Nail Analysis",
      description: "Clear photo of your fingers nails in good lighting",
    },
    {
      id: "tongueImage",
      label: "Tongue Analysis",
      description: "Clear photo of your tongue in good lighting",
    },
    {
      id: "eyesImage",
      label: "Eye Analysis",
      description: "Clear close-up photo of your eyes",
    },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow-md">
          <div className="p-8">
            <div className="text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-semibold text-gray-900">Thank you for your submission!</h2>
              <p className="text-gray-600">We have received your information and will process it shortly.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Submit Another Form
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <nav className="bg-white shadow-sm p-4 rounded-lg flex items-center mb-6">
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => window.location.href = "/"}
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="ml-4 text-xl font-semibold text-gray-900">Medical Intake Form</h1>
      </nav>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Subject Information</h2>
          <p className="mt-1 text-gray-600">Please fill out all required fields and upload the requested images</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  onChange={handleChange}
                  required
                  min="0"
                  max="120"
                  placeholder="Enter your age"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {imageTypes.map((imageType) => (
                <div key={imageType.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900">{imageType.label}</h3>
                    <p className="text-sm text-gray-600 mt-1">{imageType.description}</p>
                  </div>
                  <div className="p-4 pt-0">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id={imageType.id}
                      onChange={(e) => handleImageChange(e, imageType.id)}
                    />
                    <label
                      htmlFor={imageType.id}
                      className="block cursor-pointer border-2 border-dashed border-gray-300 rounded-lg transition-colors hover:border-gray-400"
                    >
                      <div className="aspect-square relative">
                        {imagePreview[imageType.id] ? (
                          <img
                            src={imagePreview[imageType.id]}
                            alt={imageType.label}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Upload className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 text-white bg-blue-600 rounded-lg font-medium transition-colors
                ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Form"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MedicalIntakeForm;