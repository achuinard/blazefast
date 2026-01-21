import React, { useState } from "react";
import { Card, TextInput, Textarea, Checkbox, Button, Label, FileInput, Spinner } from "flowbite-react";
import { getFunctions, httpsCallable } from "firebase/functions";
import toast from "react-hot-toast";

const INITIAL_STATE = {
  projectName: "",
  iconBase64: "",
  iconPreview: "",
  googleServicesJson: "",
  googleServiceInfoPlist: "",
  authMethods: [] as string[],
};

const ReactNativeFirebaseProjectForm = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [generating, setGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleIconFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] || '';
      setFormData(prevData => ({
        ...prevData,
        iconBase64: base64,
        iconPreview: result
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleTextFile = (fieldName: 'googleServicesJson' | 'googleServiceInfoPlist') => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      setFormData(prevData => ({
        ...prevData,
        [fieldName]: result
      }));
    };

    reader.readAsText(file);
  };

  const handleMultiSelect = (name: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: prevData.authMethods.includes(value)
        ? prevData.authMethods.filter(item => item !== value)
        : [...prevData.authMethods, value]
    }));
  };

  const removeIcon = () => {
    setFormData(prevData => ({
      ...prevData,
      iconBase64: "",
      iconPreview: ""
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.authMethods.length) {
      toast.error("Select at least one authentication method");
      return;
    }

    if (!/^[a-zA-Z][a-zA-Z0-9 -]*$/.test(formData.projectName)) {
      toast.error("App name can only contain letters, numbers, spaces, and hyphens, and can't start with a number");
      return;
    }

    try {
      JSON.parse(formData.googleServicesJson);
    } catch {
      toast.error("Invalid google-services.json format");
      return;
    }

    if (!formData.googleServiceInfoPlist.includes("<key>BUNDLE_ID</key>")) {
      toast.error("Invalid GoogleService-Info.plist format");
      return;
    }

    setGenerating(true);

    try {
      const functions = getFunctions();
      const generateProject = httpsCallable<
        {
          projectName: string;
          googleServicesJson: string;
          googleServiceInfoPlist: string;
          authMethods: string[];
          iconBase64?: string;
        },
        { zipBase64: string; filename: string }
      >(functions, 'generateProject');

      const result = await generateProject({
        projectName: formData.projectName,
        googleServicesJson: formData.googleServicesJson,
        googleServiceInfoPlist: formData.googleServiceInfoPlist,
        authMethods: formData.authMethods,
        iconBase64: formData.iconBase64 || undefined,
      });

      const { zipBase64, filename } = result.data;
      const binaryString = atob(zipBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/zip' });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Project generated! Check your downloads.");
      setFormData(INITIAL_STATE);
    } catch (error: unknown) {
      console.error('Generation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Generation failed';
      toast.error(errorMessage);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900">
      <Card className="bg-gray-800 border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6 text-gray-300">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <Label htmlFor="projectName" className="mb-2 block text-white">App Name</Label>
                <TextInput
                  id="projectName"
                  name="projectName"
                  required
                  disabled={generating}
                  value={formData.projectName}
                  onChange={handleInputChange}
                  placeholder="My Awesome App"
                />
              </div>
              <div>
                <Label htmlFor="iconFile" className="mb-2 block text-white">Icon (1024x1024 recommended)</Label>
                {!formData.iconPreview && (
                  <FileInput
                    accept="image/png"
                    id="iconFile"
                    name="iconFile"
                    disabled={generating}
                    onChange={handleIconFile}
                  />
                )}
                {formData.iconPreview && (
                  <div className="flex items-center space-x-2">
                    <img src={formData.iconPreview} alt="App Icon" className="w-10 h-10 rounded" />
                    <Button
                      disabled={generating}
                      onClick={removeIcon}
                      type="button"
                      color="gray"
                      size="xs"
                    >
                      Remove Icon
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-white">iOS Configuration (GoogleService-Info.plist)</h3>
                <p className="text-sm text-gray-400">
                  Download from Firebase Console → Project Settings → iOS app
                </p>
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".plist"
                  className="hidden"
                  disabled={generating}
                  onChange={handleTextFile('googleServiceInfoPlist')}
                />
                <span className="px-3 py-1.5 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-lg">
                  Select File
                </span>
              </label>
            </div>
            <Textarea
              required
              rows={8}
              className="p-2 font-mono text-sm bg-gray-700 border-gray-600 text-gray-200"
              disabled={generating}
              placeholder={`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "...">
<plist version="1.0">
<dict>
  <key>BUNDLE_ID</key>
  <string>com.yourcompany.yourapp</string>
  ...
</dict>
</plist>`}
              id="googleServiceInfoPlist"
              name="googleServiceInfoPlist"
              value={formData.googleServiceInfoPlist}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold text-white">Android Configuration (google-services.json)</h3>
                <p className="text-sm text-gray-400">
                  Download from Firebase Console → Project Settings → Android app
                </p>
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  disabled={generating}
                  onChange={handleTextFile('googleServicesJson')}
                />
                <span className="px-3 py-1.5 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-lg">
                  Select File
                </span>
              </label>
            </div>
            <Textarea
              required
              rows={8}
              className="p-2 font-mono text-sm bg-gray-700 border-gray-600 text-gray-200"
              disabled={generating}
              placeholder={`{
  "project_info": {
    "project_id": "your-project-id",
    ...
  },
  "client": [...]
}`}
              id="googleServicesJson"
              name="googleServicesJson"
              value={formData.googleServicesJson}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">Authentication Methods</h3>
            <p className="text-sm text-gray-400 mb-2">
              Select the auth providers you've enabled in Firebase Console
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-300">
              {["Email/Password", "Google", "Facebook", "Anonymous", "Apple"].map(method => (
                <div key={method} className="flex items-center">
                  <Checkbox
                    id={`auth-${method}`}
                    disabled={generating}
                    checked={formData.authMethods.includes(method)}
                    onChange={() => handleMultiSelect("authMethods", method)}
                  />
                  <Label htmlFor={`auth-${method}`} className="ml-2 text-gray-300">
                    {method}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 border-none"
            disabled={generating}
          >
            {generating ? (
              <div className="flex items-center justify-center">
                <Spinner size="sm" className="mr-2" />
                Generating...
              </div>
            ) : (
              "Generate & Download Project"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ReactNativeFirebaseProjectForm;
