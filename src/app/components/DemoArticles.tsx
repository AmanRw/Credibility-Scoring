import { useState } from 'react';
import { ExternalLink, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface Article {
  id: string;
  title: string;
  source: string;
  url: string;
  excerpt: string;
  expectedScore: number;
  category: 'high' | 'medium' | 'low';
}

const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'Federal Reserve Announces Interest Rate Decision',
    source: 'Reuters',
    url: 'https://reuters.com/example',
    excerpt: 'The Federal Reserve has decided to maintain current interest rates following today\'s meeting...',
    expectedScore: 87,
    category: 'high',
  },
  {
    id: '2',
    title: 'New Study Shows Climate Change Impact on Ocean Temperatures',
    source: 'Nature Journal',
    url: 'https://nature.com/example',
    excerpt: 'Researchers from multiple institutions have published findings indicating significant changes...',
    expectedScore: 92,
    category: 'high',
  },
  {
    id: '3',
    title: 'SHOCKING: Celebrities DON\'T Want You to Know This Secret!',
    source: 'ClickNews.blog',
    url: 'https://clicknews.blog/example',
    excerpt: 'You won\'t believe what we discovered! Industry experts are furious about this one simple trick...',
    expectedScore: 23,
    category: 'low',
  },
  {
    id: '4',
    title: 'Local Community Rallies Around New Education Initiative',
    source: 'City Times',
    url: 'https://citytimes.com/example',
    excerpt: 'Community leaders gathered yesterday to discuss the implementation of new educational programs...',
    expectedScore: 68,
    category: 'medium',
  },
  {
    id: '5',
    title: 'Tech Company Announces Revolutionary Product Launch',
    source: 'TechBuzz Daily',
    url: 'https://techbuzz.com/example',
    excerpt: 'In a press release this morning, the company claims their new device will "change everything"...',
    expectedScore: 45,
    category: 'low',
  },
  {
    id: '6',
    title: 'Healthcare Policy Changes Take Effect Next Month',
    source: 'Associated Press',
    url: 'https://apnews.com/example',
    excerpt: 'New healthcare regulations approved last quarter will begin implementation on April 1st...',
    expectedScore: 89,
    category: 'high',
  },
];

interface DemoArticlesProps {
  onSelectArticle: (article: Article) => void;
}

export function DemoArticles({ onSelectArticle }: DemoArticlesProps) {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredArticles = filter === 'all' 
    ? sampleArticles 
    : sampleArticles.filter(a => a.category === filter);

  const getScoreBadge = (score: number) => {
    if (score >= 75) return { text: 'High', className: 'bg-green-100 text-green-800' };
    if (score >= 50) return { text: 'Medium', className: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Low', className: 'bg-red-100 text-red-800' };
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-3">Sample Articles to Test</h3>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('high')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filter === 'high'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            High Credibility
          </button>
          <button
            onClick={() => setFilter('medium')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filter === 'medium'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setFilter('low')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filter === 'low'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Low Credibility
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredArticles.map((article) => {
          const badge = getScoreBadge(article.expectedScore);
          return (
            <Card
              key={article.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onSelectArticle(article)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-sm line-clamp-2">{article.title}</h4>
                      <Badge className={`text-xs flex-shrink-0 ${badge.className}`}>
                        {badge.text}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="font-medium">{article.source}</span>
                      <span>•</span>
                      <span>Expected score: {article.expectedScore}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
