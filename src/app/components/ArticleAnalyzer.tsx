import { useState } from 'react';
import { Shield, TrendingUp, User, AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';

interface AnalysisResult {
  overallScore: number;
  sourceScore: number;
  authorScore: number;
  linguisticScore: number;
  sourceName: string;
  authorName: string;
  clickbaitDetected: boolean;
  emotionalTriggers: string[];
  factCheckStatus: 'verified' | 'unverified' | 'disputed';
  biasDetected: string | null;
}

interface ArticleAnalyzerProps {
  url: string;
  title: string;
  onAnalyze: () => void;
}

export function ArticleAnalyzer({ url, title, onAnalyze }: ArticleAnalyzerProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Mock analysis function
  const analyzeArticle = () => {
    setAnalyzing(true);
    onAnalyze();

    // Simulate analysis delay
    setTimeout(() => {
      // Mock results based on different scenarios
      const mockResults: AnalysisResult[] = [
        {
          overallScore: 87,
          sourceScore: 92,
          authorScore: 85,
          linguisticScore: 84,
          sourceName: 'Reuters',
          authorName: 'Sarah Johnson',
          clickbaitDetected: false,
          emotionalTriggers: [],
          factCheckStatus: 'verified',
          biasDetected: null,
        },
        {
          overallScore: 45,
          sourceScore: 38,
          authorScore: 52,
          linguisticScore: 45,
          sourceName: 'UnknownNews.blog',
          authorName: 'Anonymous',
          clickbaitDetected: true,
          emotionalTriggers: ['Shocking', 'You won\'t believe', 'Experts hate'],
          factCheckStatus: 'disputed',
          biasDetected: 'Strong political bias detected',
        },
        {
          overallScore: 72,
          sourceScore: 78,
          authorScore: 70,
          linguisticScore: 68,
          sourceName: 'The Guardian',
          authorName: 'Michael Chen',
          clickbaitDetected: false,
          emotionalTriggers: ['Breaking'],
          factCheckStatus: 'verified',
          biasDetected: 'Slight editorial slant detected',
        },
      ];

      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      setAnalyzing(false);
    }, 1500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 75) return 'default';
    if (score >= 50) return 'secondary';
    return 'destructive';
  };

  if (!result && !analyzing) {
    return (
      <div className="p-6 text-center">
        <Shield className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h3 className="mb-2">Analyze Article Credibility</h3>
        <p className="text-sm text-gray-600 mb-4">
          Get a comprehensive integrity score for this article
        </p>
        <button
          onClick={analyzeArticle}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Analyze Now
        </button>
      </div>
    );
  }

  if (analyzing) {
    return (
      <div className="p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="mb-2">Analyzing Article...</h3>
          <p className="text-sm text-gray-600">Evaluating credibility factors</p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Progress value={100} className="flex-1" />
            <span className="text-xs text-gray-600">Source verification</span>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={66} className="flex-1" />
            <span className="text-xs text-gray-600">Author credentials</span>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={33} className="flex-1" />
            <span className="text-xs text-gray-600">Linguistic analysis</span>
          </div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="p-4">
      {/* Overall Score */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke={result.overallScore >= 75 ? '#16a34a' : result.overallScore >= 50 ? '#ca8a04' : '#dc2626'}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(result.overallScore / 100) * 351.86} 351.86`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(result.overallScore)}`}>
              {result.overallScore}
            </span>
            <span className="text-xs text-gray-600">Integrity Score</span>
          </div>
        </div>
        <div className="mt-3">
          <Badge variant={getScoreBadgeVariant(result.overallScore)} className="text-sm">
            {result.overallScore >= 75 ? 'High Credibility' : result.overallScore >= 50 ? 'Moderate Credibility' : 'Low Credibility'}
          </Badge>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Detailed Scores */}
      <Tabs defaultValue="breakdown" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="warnings">Warnings</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-4 mt-4">
          {/* Source Score */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Source Reliability</span>
              </div>
              <span className={`text-sm font-bold ${getScoreColor(result.sourceScore)}`}>
                {result.sourceScore}/100
              </span>
            </div>
            <Progress value={result.sourceScore} className="mb-1" />
            <p className="text-xs text-gray-600">{result.sourceName}</p>
          </div>

          {/* Author Score */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">Author Credibility</span>
              </div>
              <span className={`text-sm font-bold ${getScoreColor(result.authorScore)}`}>
                {result.authorScore}/100
              </span>
            </div>
            <Progress value={result.authorScore} className="mb-1" />
            <p className="text-xs text-gray-600">{result.authorName}</p>
          </div>

          {/* Linguistic Score */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Content Quality</span>
              </div>
              <span className={`text-sm font-bold ${getScoreColor(result.linguisticScore)}`}>
                {result.linguisticScore}/100
              </span>
            </div>
            <Progress value={result.linguisticScore} className="mb-1" />
            <p className="text-xs text-gray-600">Linguistic analysis complete</p>
          </div>

          {/* Fact Check Status */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-2">
              {result.factCheckStatus === 'verified' && (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Fact Checked</span>
                </>
              )}
              {result.factCheckStatus === 'unverified' && (
                <>
                  <Info className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Not Verified</span>
                </>
              )}
              {result.factCheckStatus === 'disputed' && (
                <>
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-600">Claims Disputed</span>
                </>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="warnings" className="space-y-3 mt-4">
          {result.clickbaitDetected && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-orange-900">Clickbait Detected</p>
                    <p className="text-xs text-orange-700 mt-1">
                      Headline uses sensationalist language patterns
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {result.emotionalTriggers.length > 0 && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Emotional Triggers Found</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {result.emotionalTriggers.map((trigger, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-white">
                          {trigger}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {result.biasDetected && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Bias Analysis</p>
                    <p className="text-xs text-blue-700 mt-1">{result.biasDetected}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!result.clickbaitDetected && result.emotionalTriggers.length === 0 && !result.biasDetected && (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-600" />
              <p className="text-sm text-gray-600">No significant warnings detected</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Separator className="my-4" />

      <button
        onClick={analyzeArticle}
        className="w-full px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        Re-analyze
      </button>
    </div>
  );
}
