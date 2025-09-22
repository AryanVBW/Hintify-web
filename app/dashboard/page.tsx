import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  TrendingUp,
  MessageSquare,
  Clock,
  Target,
  Star,
  Calendar,
  BarChart3,
  Activity,
  Award,
  Lightbulb,
  CheckCircle,
  Zap,
  Trophy,
} from "lucide-react"
import Image from "next/image"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <header className="border-b border-white/10 bg-black sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image src="/logo.png" alt="Hintify" width={48} height={48} className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Hintify Dashboard
              </h1>
              <p className="text-gray-400 text-sm font-medium">Track your thinking journey and growth</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <Card className="group bg-gradient-to-br from-yellow-900/60 via-yellow-800/50 to-amber-900/40 border-yellow-400/40 hover:border-yellow-400/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-200">Questions Asked</CardTitle>
              <div className="p-2 bg-yellow-400/20 rounded-lg group-hover:bg-yellow-400/30 transition-colors">
                <MessageSquare className="h-5 w-5 text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">127</div>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-400" />
                +12 from last week
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-gradient-to-br from-green-900/60 via-green-800/50 to-emerald-900/40 border-green-400/40 hover:border-green-400/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-400/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-200">Problems Solved</CardTitle>
              <div className="p-2 bg-green-400/20 rounded-lg group-hover:bg-green-400/30 transition-colors">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">89</div>
              <p className="text-xs text-gray-400">70% success rate</p>
            </CardContent>
          </Card>

          <Card className="group bg-gradient-to-br from-blue-900/60 via-blue-800/50 to-cyan-900/40 border-blue-400/40 hover:border-blue-400/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-200">Thinking Score</CardTitle>
              <div className="p-2 bg-blue-400/20 rounded-lg group-hover:bg-blue-400/30 transition-colors">
                <Brain className="h-5 w-5 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">8.4</div>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Zap className="h-3 w-3 text-blue-400" />
                +0.3 this month
              </p>
            </CardContent>
          </Card>

          <Card className="group bg-gradient-to-br from-purple-900/60 via-purple-800/50 to-violet-900/40 border-purple-400/40 hover:border-purple-400/70 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-400/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-200">Current Streak</CardTitle>
              <div className="p-2 bg-purple-400/20 rounded-lg group-hover:bg-purple-400/30 transition-colors">
                <Award className="h-5 w-5 text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">15 days</div>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Trophy className="h-3 w-3 text-purple-400" />
                Personal best!
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 backdrop-blur-md bg-black/40 border border-white/20 rounded-xl p-3 shadow-lg shadow-black/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=inactive]:text-white data-[state=inactive]:hover:text-yellow-400 data-[state=inactive]:hover:bg-white/10 font-semibold rounded-lg transition-all duration-300 data-[state=active]:shadow-lg py-3 px-4"
            >
              <Activity className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=inactive]:text-white data-[state=inactive]:hover:text-yellow-400 data-[state=inactive]:hover:bg-white/10 font-semibold rounded-lg transition-all duration-300 data-[state=active]:shadow-lg py-3 px-4"
            >
              <Clock className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=inactive]:text-white data-[state=inactive]:hover:text-yellow-400 data-[state=inactive]:hover:bg-white/10 font-semibold rounded-lg transition-all duration-300 data-[state=active]:shadow-lg py-3 px-4"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black data-[state=inactive]:text-white data-[state=inactive]:hover:text-yellow-400 data-[state=inactive]:hover:bg-white/10 font-semibold rounded-lg transition-all duration-300 data-[state=active]:shadow-lg py-3 px-4"
            >
              <Target className="h-4 w-4 mr-2" />
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-black border-white/10 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl text-white">
                    <div className="p-2 bg-yellow-400/20 rounded-lg">
                      <Activity className="h-6 w-6 text-yellow-400" />
                    </div>
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-green-400/10 to-emerald-400/5 border border-green-400/20 hover:border-green-400/40 transition-all duration-300">
                    <div className="w-3 h-3 bg-green-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">Solved JavaScript debugging problem</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />2 hours ago
                        <Badge variant="secondary" className="bg-blue-400/20 text-blue-400 text-xs">
                          Programming
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-yellow-400/10 to-amber-400/5 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">Working on calculus integration</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />5 hours ago
                        <Badge variant="secondary" className="bg-green-400/20 text-green-400 text-xs">
                          Mathematics
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-green-400/10 to-emerald-400/5 border border-green-400/20 hover:border-green-400/40 transition-all duration-300">
                    <div className="w-3 h-3 bg-green-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">Resolved team conflict approach</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />1 day ago
                        <Badge variant="secondary" className="bg-purple-400/20 text-purple-400 text-xs">
                          Life Skills
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black border-white/10 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl text-white">
                    <div className="p-2 bg-blue-400/20 rounded-lg">
                      <Target className="h-6 w-6 text-blue-400" />
                    </div>
                    Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">Critical Thinking</span>
                      <span className="text-white font-bold">85%</span>
                    </div>
                    <div className="relative">
                      <Progress value={85} className="h-3 bg-gray-800" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">Problem Solving</span>
                      <span className="text-white font-bold">72%</span>
                    </div>
                    <div className="relative">
                      <Progress value={72} className="h-3 bg-gray-800" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">Independent Learning</span>
                      <span className="text-white font-bold">91%</span>
                    </div>
                    <div className="relative">
                      <Progress value={91} className="h-3 bg-gray-800" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-black border-white/10 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3 text-white">
                  <div className="p-2 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-lg">
                    <Trophy className="h-6 w-6 text-yellow-400" />
                  </div>
                  This Week's Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center space-y-3 p-6 rounded-xl bg-gradient-to-br from-yellow-400/10 to-amber-400/5 border border-yellow-400/20">
                    <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                      23
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Questions This Week</p>
                  </div>
                  <div className="text-center space-y-3 p-6 rounded-xl bg-gradient-to-br from-green-400/10 to-emerald-400/5 border border-green-400/20">
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      18
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Problems Solved</p>
                  </div>
                  <div className="text-center space-y-3 p-6 rounded-xl bg-gradient-to-br from-blue-400/10 to-cyan-400/5 border border-blue-400/20">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      4.2
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Avg. Hints Needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-black border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  Question History
                </CardTitle>
                <CardDescription>Your recent questions and their outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      question: "How do I optimize this React component for better performance?",
                      category: "Programming",
                      status: "Solved",
                      hints: 3,
                      time: "2 hours ago",
                      rating: 5,
                    },
                    {
                      question: "What's the best approach to solve this calculus integration problem?",
                      category: "Mathematics",
                      status: "In Progress",
                      hints: 2,
                      time: "5 hours ago",
                      rating: null,
                    },
                    {
                      question: "How should I handle this difficult conversation with my manager?",
                      category: "Life Skills",
                      status: "Solved",
                      hints: 4,
                      time: "1 day ago",
                      rating: 4,
                    },
                    {
                      question: "Why isn't my CSS flexbox layout working as expected?",
                      category: "Programming",
                      status: "Solved",
                      hints: 2,
                      time: "2 days ago",
                      rating: 5,
                    },
                  ].map((item, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-white font-medium mb-1">{item.question}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400">
                              {item.category}
                            </Badge>
                            <Badge
                              variant={item.status === "Solved" ? "default" : "secondary"}
                              className={
                                item.status === "Solved"
                                  ? "bg-green-400/20 text-green-400"
                                  : "bg-blue-400/20 text-blue-400"
                              }
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Lightbulb className="h-3 w-3" />
                              {item.hints} hints used
                            </span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                        {item.rating && (
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < item.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <BarChart3 className="h-5 w-5 text-blue-400" />
                    Question Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Programming</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                        <span className="text-sm text-white">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Mathematics</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                        <span className="text-sm text-white">30%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Life Skills</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div className="bg-purple-400 h-2 rounded-full" style={{ width: "15%" }}></div>
                        </div>
                        <span className="text-sm text-white">15%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Science</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "10%" }}></div>
                        </div>
                        <span className="text-sm text-white">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    Success Rate Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">78%</div>
                      <p className="text-sm text-gray-400">Overall Success Rate</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">This Week</span>
                        <span className="text-green-400">82%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Last Week</span>
                        <span className="text-white">75%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">This Month</span>
                        <span className="text-green-400">79%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Last Month</span>
                        <span className="text-white">71%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Award className="h-5 w-5 text-yellow-400" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
                      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Brain className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Critical Thinker</p>
                        <p className="text-sm text-gray-400">Solved 50+ problems independently</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-400/10 border border-green-400/20">
                      <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                        <Target className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Problem Solver</p>
                        <p className="text-sm text-gray-400">Maintained 70%+ success rate</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-400/10 border border-blue-400/20">
                      <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Consistent Learner</p>
                        <p className="text-sm text-gray-400">15-day learning streak</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Growth Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-300">Thinking Independence</span>
                        <span className="text-sm text-white">Level 8</span>
                      </div>
                      <Progress value={80} className="h-3" />
                      <p className="text-xs text-gray-400 mt-1">2 levels gained this month</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-300">Problem Complexity</span>
                        <span className="text-sm text-white">Level 6</span>
                      </div>
                      <Progress value={60} className="h-3" />
                      <p className="text-xs text-gray-400 mt-1">Tackling harder problems</p>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-300">Hint Efficiency</span>
                        <span className="text-sm text-white">Level 7</span>
                      </div>
                      <Progress value={70} className="h-3" />
                      <p className="text-xs text-gray-400 mt-1">Using fewer hints per problem</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
