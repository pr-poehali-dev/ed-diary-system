import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const grades = [
    { subject: 'Математика', grade: 5, color: 'bg-success', trend: 'up' },
    { subject: 'Русский язык', grade: 4, color: 'bg-primary', trend: 'up' },
    { subject: 'Физика', grade: 5, color: 'bg-success', trend: 'stable' },
    { subject: 'История', grade: 4, color: 'bg-primary', trend: 'down' },
    { subject: 'Английский', grade: 5, color: 'bg-success', trend: 'up' },
    { subject: 'Информатика', grade: 5, color: 'bg-success', trend: 'up' },
  ];

  const schedule = [
    { time: '08:00', subject: 'Математика', room: '305', teacher: 'Иванова А.П.' },
    { time: '09:00', subject: 'Русский язык', room: '201', teacher: 'Петрова М.С.' },
    { time: '10:00', subject: 'Физика', room: '402', teacher: 'Сидоров В.И.' },
    { time: '11:00', subject: 'История', room: '104', teacher: 'Кузнецова О.Л.' },
    { time: '12:00', subject: 'Английский', room: '203', teacher: 'Смирнова Е.А.' },
  ];

  const [homework, setHomework] = useState([
    { id: 1, subject: 'Математика', task: 'Решить задачи №15-20 из учебника', deadline: '15 дек', completed: true },
    { id: 2, subject: 'Физика', task: 'Подготовить доклад про законы Ньютона', deadline: '16 дек', completed: false },
    { id: 3, subject: 'Русский язык', task: 'Написать сочинение на тему "Зима"', deadline: '17 дек', completed: false },
    { id: 4, subject: 'История', task: 'Прочитать параграф 12, ответить на вопросы', deadline: '14 дек', completed: true },
  ]);

  const toggleHomework = (id: number) => {
    setHomework(prev => prev.map(hw => 
      hw.id === id ? { ...hw, completed: !hw.completed } : hw
    ));
  };

  const importantDates = [
    { date: '15 дек', event: 'Контрольная по математике', type: 'exam' },
    { date: '18 дек', event: 'Сдача проектов по информатике', type: 'project' },
    { date: '22 дек', event: 'Новогодний концерт', type: 'event' },
  ];

  const parentMessages = [
    { from: 'Классный руководитель', message: 'Родительское собрание 20 декабря в 18:00', time: '2 часа назад', unread: true },
    { from: 'Администрация', message: 'Зимние каникулы с 25 декабря по 10 января', time: '1 день назад', unread: false },
  ];

  const averageGrade = (grades.reduce((acc, g) => acc + g.grade, 0) / grades.length).toFixed(1);
  const completedHomework = homework.filter(h => h.completed).length;
  const homeworkProgress = (completedHomework / homework.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container mx-auto p-4 md:p-6 max-w-7xl">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Мой Дневник 📚
            </h1>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Icon name="Star" size={18} className="mr-2" />
              Средний балл: {averageGrade}
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">Отслеживай свой прогресс и достигай новых высот! 🚀</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="grades" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="grades" className="flex items-center gap-2">
                  <Icon name="Trophy" size={18} />
                  <span className="hidden sm:inline">Оценки</span>
                </TabsTrigger>
                <TabsTrigger value="schedule" className="flex items-center gap-2">
                  <Icon name="Clock" size={18} />
                  <span className="hidden sm:inline">Расписание</span>
                </TabsTrigger>
                <TabsTrigger value="homework" className="flex items-center gap-2">
                  <Icon name="BookOpen" size={18} />
                  <span className="hidden sm:inline">Домашка</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="grades" className="space-y-4 mt-4">
                <Card className="animate-scale-in shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="TrendingUp" size={24} className="text-success" />
                      Твои оценки
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {grades.map((item, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl border-2 hover:shadow-md transition-all duration-200 hover:scale-105 bg-card"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg">{item.subject}</h3>
                            <div className="flex items-center gap-2">
                              {item.trend === 'up' && <Icon name="TrendingUp" size={16} className="text-success" />}
                              {item.trend === 'down' && <Icon name="TrendingDown" size={16} className="text-destructive" />}
                              {item.trend === 'stable' && <Icon name="Minus" size={16} className="text-muted-foreground" />}
                              <Badge className={`${item.color} text-white text-xl px-3 py-1`}>
                                {item.grade}
                              </Badge>
                            </div>
                          </div>
                          <Progress value={item.grade * 20} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="mt-4">
                <Card className="animate-scale-in shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Calendar" size={24} className="text-primary" />
                      Расписание на сегодня
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {schedule.map((lesson, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 rounded-xl border-2 hover:shadow-md transition-all hover:border-primary bg-card"
                        >
                          <div className="flex-shrink-0 w-16 text-center">
                            <Badge variant="outline" className="text-sm font-semibold">
                              {lesson.time}
                            </Badge>
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-semibold text-lg">{lesson.subject}</h4>
                            <p className="text-sm text-muted-foreground">
                              Кабинет {lesson.room} • {lesson.teacher}
                            </p>
                          </div>
                          <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="homework" className="mt-4">
                <Card className="animate-scale-in shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Icon name="CheckCircle2" size={24} className="text-success" />
                        Домашние задания
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {completedHomework}/{homework.length} готово
                      </span>
                    </CardTitle>
                    <Progress value={homeworkProgress} className="h-2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {homework.map((hw) => (
                        <div
                          key={hw.id}
                          onClick={() => toggleHomework(hw.id)}
                          className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                            hw.completed ? 'bg-success/5 border-success/30' : 'bg-card hover:shadow-md hover:border-primary'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1 transition-transform hover:scale-110">
                              {hw.completed ? (
                                <Icon name="CheckCircle2" size={24} className="text-success" />
                              ) : (
                                <Icon name="Circle" size={24} className="text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-semibold">{hw.subject}</h4>
                              <p className={`text-sm mt-1 transition-all ${hw.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {hw.task}
                              </p>
                              <Badge variant="outline" className="mt-2">
                                <Icon name="Calendar" size={14} className="mr-1" />
                                {hw.deadline}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="animate-fade-in shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bell" size={24} className="text-accent" />
                  Связь с родителями
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {parentMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                        msg.unread ? 'bg-primary/5 border-primary/30' : 'bg-card'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{msg.from}</h4>
                          {msg.unread && (
                            <Badge className="bg-accent text-accent-foreground">Новое</Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="animate-scale-in shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="CalendarDays" size={24} className="text-secondary" />
                  Календарь
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="animate-fade-in shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="AlertCircle" size={24} className="text-destructive" />
                  Важные даты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {importantDates.map((item, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl border-2 transition-all hover:shadow-md bg-card"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {item.type === 'exam' && (
                            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                              <Icon name="FileText" size={20} className="text-destructive" />
                            </div>
                          )}
                          {item.type === 'project' && (
                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                              <Icon name="Lightbulb" size={20} className="text-secondary" />
                            </div>
                          )}
                          {item.type === 'event' && (
                            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                              <Icon name="PartyPopper" size={20} className="text-success" />
                            </div>
                          )}
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-1">{item.date}</Badge>
                          <p className="text-sm font-medium">{item.event}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="animate-scale-in shadow-lg bg-gradient-to-br from-success/10 to-primary/10 border-2 border-success/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-success flex items-center justify-center">
                    <Icon name="Star" size={32} className="text-white" />
                  </div>
                  <h3 className="font-bold text-xl">Молодец! 🎉</h3>
                  <p className="text-sm text-muted-foreground">
                    Ты на правильном пути! Продолжай в том же духе!
                  </p>
                  <Button className="w-full bg-success hover:bg-success/90">
                    <Icon name="Target" size={18} className="mr-2" />
                    Мои достижения
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;