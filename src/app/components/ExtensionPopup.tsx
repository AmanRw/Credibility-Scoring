import { useState } from 'react';
import { Shield, Settings, History, Info, Globe } from 'lucide-react';
import { ArticleAnalyzer } from './ArticleAnalyzer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

interface HistoryItem {
  id: string;
  title: string;
  url: string;
  score: number;
  timestamp: Date;
}

export function ExtensionPopup() {
  const [currentUrl] = useState('https://example-news-site.com/article/...');
  const [currentTitle] = useState('Major Scientific Breakthrough Announced by Researchers');
  const [autoAnalyze, setAutoAnalyze] = useState(true);
  const [showWarnings, setShowWarnings] = useState(true);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      title: 'Economic Update: Markets React to New Policy',
      url: 'https://reuters.com/...',
      score: 87,
      timestamp: new Date(2026, 2, 10, 14, 30),
    },
    {
      id: '2',
      title: 'SHOCKING: This One Trick Doctors Hate!',
      url: 'https://clickbait-news.com/...',
      score: 23,
      timestamp: new Date(2026, 2, 10, 12, 15),
    },
    {
      id: '3',
      title: 'Climate Report Shows Concerning Trends',
      url: 'https://theguardian.com/...',
      score: 72,
      timestamp: new Date(2026, 2, 9, 18, 45),
    },
  ]);

  const handleAnalyze = () => {
    // Add to history
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      title: currentTitle,
      url: currentUrl,
      score: Math.floor(Math.random() * 100),
      timestamp: new Date(),
    };
    setHistory([newItem, ...history]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'bg-green-100 text-green-800';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="w-[400px] h-[600px] bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-6 h-6" />
          <h1 className="font-semibold">Credibility Checker</h1>
        </div>
        <p className="text-xs text-blue-100">Real-time news article integrity analysis</p>
      </div>

      {/* Current Page Info */}
      <div className="bg-gray-50 px-4 py-3 border-b">
        <div className="flex items-start gap-2">
          <Globe className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-gray-900 truncate">{currentTitle}</p>
            <p className="text-xs text-gray-500 truncate">{currentUrl}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="analyze" className="h-full flex flex-col">
          <TabsList className="w-full grid grid-cols-3 rounded-none border-b">
            <TabsTrigger value="analyze" className="gap-1">
              <Shield className="w-3 h-3" />
              <span className="text-xs">Analyze</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-1">
              <History className="w-3 h-3" />
              <span className="text-xs">History</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-1">
              <Settings className="w-3 h-3" />
              <span className="text-xs">Settings</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="analyze" className="m-0 h-full">
              <ArticleAnalyzer
                url={currentUrl}
                title={currentTitle}
                onAnalyze={handleAnalyze}
              />
            </TabsContent>

            <TabsContent value="history" className="m-0 p-4 space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Recent Analyses</h3>
                <Badge variant="secondary" className="text-xs">
                  {history.length} articles
                </Badge>
              </div>

              {history.length === 0 ? (
                <div className="text-center py-12">
                  <History className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm text-gray-500">No analysis history yet</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Analyzed articles will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-500 truncate mb-2">
                              {item.url}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge className={`text-xs ${getScoreColor(item.score)}`}>
                                Score: {item.score}
                              </Badge>
                              <span className="text-xs text-gray-400">
                                {formatTimestamp(item.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="settings" className="m-0 p-4 space-y-4">
              <div>
                <h3 className="font-medium mb-4">Extension Settings</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Auto-analyze articles</p>
                      <p className="text-xs text-gray-500">
                        Automatically analyze when you visit news sites
                      </p>
                    </div>
                    <Switch checked={autoAnalyze} onCheckedChange={setAutoAnalyze} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Show warning badges</p>
                      <p className="text-xs text-gray-500">
                        Display warnings for clickbait and bias
                      </p>
                    </div>
                    <Switch checked={showWarnings} onCheckedChange={setShowWarnings} />
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium mb-2">Minimum credibility threshold</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="50"
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-8">50</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Show warnings for scores below this threshold
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium mb-2">Trusted sources</p>
                    <div className="space-y-2">
                      {['reuters.com', 'apnews.com', 'bbc.com'].map((source) => (
                        <div
                          key={source}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                          <span className="text-xs">{source}</span>
                          <button className="text-xs text-red-600 hover:text-red-700">
                            Remove
                          </button>
                        </div>
                      ))}
                      <button className="text-xs text-blue-600 hover:text-blue-700">
                        + Add trusted source
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="pt-2">
                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-blue-900">About This Extension</p>
                    <p className="text-xs text-blue-700 mt-1">
                      This extension analyzes news articles using source reputation data,
                      author credentials, and linguistic patterns to provide credibility scores.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="border-t px-4 py-2 bg-gray-50">
        <p className="text-xs text-center text-gray-500">
          Credibility Checker v1.0.0 • Prototype
        </p>
      </div>
    </div>
  );
}
