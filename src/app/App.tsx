import { useState } from "react";
import { ExtensionPopup } from "./components/ExtensionPopup";
import { DemoArticles } from "./components/DemoArticles";
import { Card } from "./components/ui/card";
import { Shield, Chrome, Info } from "lucide-react";

export default function App() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">
                  Credibility Checker
                </h1>
                <p className="text-xs text-gray-500">
                  Browser Extension Prototype
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Chrome className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                Chrome Extension
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">
                Interactive Extension Prototype
              </h3>
              <p className="text-sm text-blue-800 mb-2">
                This is a functional prototype of a browser
                extension that analyzes news articles for
                credibility. The extension evaluates source
                reputation, author credentials, and linguistic
                patterns to generate an integrity score.
              </p>
              <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
                <li>
                  Source reliability scoring based on historical
                  accuracy
                </li>
                <li>
                  Author credibility assessment using
                  publication history
                </li>
                <li>
                  Clickbait and emotional trigger detection
                </li>
                <li>
                  Bias analysis and fact-checking integration
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Extension Preview */}
          <div>
            <div className="mb-4">
              <h2 className="font-semibold text-gray-900 mb-1">
                Extension Interface
              </h2>
              <p className="text-sm text-gray-600">
                This is how the extension popup would appear in
                your browser
              </p>
            </div>

            <div className="flex justify-center">
              <div className="shadow-2xl rounded-lg overflow-hidden border-2 border-gray-200">
                <ExtensionPopup />
              </div>
            </div>
          </div>

          {/* Demo & Info */}
          <div className="space-y-6">
            {/* Sample Articles */}
            <Card className="p-6">
              <DemoArticles
                onSelectArticle={(article) => {
                  console.log("Selected article:", article);
                }}
              />
            </Card>

            {/* How It Works */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                How It Works
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-blue-600">
                        1
                      </span>
                    </div>
                    <h4 className="font-medium text-sm">
                      Source Analysis
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">
                    Evaluates the publishing source's historical
                    accuracy, editorial standards, and
                    reputation within the journalism community.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-purple-600">
                        2
                      </span>
                    </div>
                    <h4 className="font-medium text-sm">
                      Author Credibility
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">
                    Checks the author's credentials, publication
                    history, expertise in the subject, and
                    previous fact-checking results.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-green-600">
                        3
                      </span>
                    </div>
                    <h4 className="font-medium text-sm">
                      Linguistic Analysis
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">
                    Detects clickbait patterns, emotional
                    manipulation, sensationalism, and biased
                    language using natural language processing.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-orange-600">
                        4
                      </span>
                    </div>
                    <h4 className="font-medium text-sm">
                      Integrity Score
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">
                    Combines all factors into a single score
                    (0-100) with detailed breakdowns and
                    warnings for concerning patterns.
                  </p>
                </div>
              </div>
            </Card>

            {/* Features */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Key Features
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">
                    Real-time Analysis
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Instant credibility scoring
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">
                    Warning System
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Alerts for clickbait & bias
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">
                    History Tracking
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    View past analyses
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">
                    Customizable
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Adjust sensitivity settings
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            This is a prototype demonstration • Actual
            implementation would require backend API integration
          </p>
        </div>
      </div>
    </div>
  );
}