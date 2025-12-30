import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Calendar as CalendarIcon, 
  BookOpen, 
  MessageSquare, 
  BarChart2, 
  Settings, 
  Bell, 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  User, 
  Mail, 
  FileText, 
  Upload, 
  Download, 
  Send, 
  Users, 
  Clock, 
  MapPin, 
  X, 
  Check, 
  AlertCircle, 
  Paperclip, 
  Target, 
  PieChart, 
  EyeOff, 
  Calculator, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingDown, 
  Repeat, 
  CalendarDays, 
  MoreHorizontal, 
  Reply, 
  Forward, 
  Trash2, 
  Inbox, 
  Send as SendIcon, 
  File, 
  Megaphone, 
  Info, 
  CheckCircle, 
  FileCheck, 
  GraduationCap, 
  BadgeCheck, 
  CreditCard,
  LogOut
} from 'lucide-react';

// --- 1. Constants & Mock Data ---

const CURRENT_USER = {
  name: '王大明',
  dept: '心理學系',
  degree: '學士班',
  year: '二年級',
  gender: '生理男性',
  studentId: '413315000',
  email: '413315000@alum.ccu.edu.tw',
  avatar: "https://api.dicebear.com/7.x/micah/svg?seed=Felix&backgroundColor=e6e6e6&clothing=hoodie&eyebrows=up&eyes=round&mouth=smile"
};

const SEMESTERS = ['113-1', '113-2', '114-1', '114-2'];

// Morandi Palette
const COLORS = {
  rose: { bg: 'bg-[#eadcdb]', text: 'text-[#8c5e5e]', border: 'border-[#d6b5b5]', cover: 'bg-[#cba6a6]', hex: '#cba6a6' },
  blue: { bg: 'bg-[#dbe4ea]', text: 'text-[#5d707f]', border: 'border-[#b6c7d6]', cover: 'bg-[#9fb3c4]', hex: '#9fb3c4' },
  green: { bg: 'bg-[#dce5dd]', text: 'text-[#5c7a63]', border: 'border-[#bcd1bf]', cover: 'bg-[#a3bfa7]', hex: '#a3bfa7' },
  purple: { bg: 'bg-[#e4e0e8]', text: 'text-[#7d7286]', border: 'border-[#cdc5d4]', cover: 'bg-[#b8adc4]', hex: '#b8adc4' },
  indigo: { bg: 'bg-[#dee1e8]', text: 'text-[#656d8a]', border: 'border-[#c4c9d9]', cover: 'bg-[#a3aac2]', hex: '#a3aac2' },
  amber: { bg: 'bg-[#f0eadd]', text: 'text-[#8a7a5c]', border: 'border-[#e0d6c1]', cover: 'bg-[#d1c4a9]', hex: '#d1c4a9' },
  teal: { bg: 'bg-[#dae8e6]', text: 'text-[#567a78]', border: 'border-[#b8d6d4]', cover: 'bg-[#98b3b9]', hex: '#98b3b9' },
  gray: { bg: 'bg-[#f4f4f5]', text: 'text-[#52525b]', border: 'border-[#e4e4e7]', cover: 'bg-[#a1a1aa]', hex: '#a1a1aa' },
};

const COURSES_DATA = {
  '114-2': [
    { id: 'psy_cog', code: 'PSY301', name: '人類學習與認知', type: '必修', professor: '李玉琇', ta: '無助教', location: '社科院 127', time: [{ day: 4, start: 10.25, end: 12 }], style: COLORS.rose },
    { id: 'physio_psy_2', code: 'PSY305', name: '生理心理學（二）', type: '必修', professor: '李季湜', ta: '林助教', location: '社科院 423', time: [{ day: 3, start: 10.16, end: 12 }], style: COLORS.blue },
    { id: 'personality', code: 'PSY308', name: '性格心理學', type: '必修', professor: '許功餘', ta: '張助教', location: '社科院 115', time: [{ day: 3, start: 13.25, end: 16 }], style: COLORS.green },
    { id: 'abnormal', code: 'PSY310', name: '變態心理學', type: '必修', professor: '徐晏萱', ta: '黃助教', location: '社科院 127', time: [{ day: 1, start: 13.25, end: 16 }], style: COLORS.purple }
  ],
  '114-1': [
    { id: 'exp_psy', code: 'PSY205', name: '心理學實驗法', type: '必修', professor: '陳欣進', ta: '陳助教', location: '社科院 423', time: [{ day: 2, start: 16.25, end: 19 }], style: COLORS.indigo },
    { id: 'physio_psy_1', code: 'PSY304', name: '生理心理學（一）', type: '必修', professor: '蔡玲玲', ta: '林助教', location: '社科院 423', time: [{ day: 3, start: 10.16, end: 12 }], style: COLORS.amber },
    { id: 'physio_2', code: 'BIO202', name: '生理學（二）', type: '選修', professor: '蔡玲玲', ta: '無助教', location: '社科院 423', time: [{ day: 1, start: 10.16, end: 12 }], style: COLORS.teal },
    { id: 'social_psy', code: 'PSY210', name: '社會心理學', type: '必修', professor: '藤原健', ta: '王助教', location: '社科院 423', time: [{ day: 4, start: 13.25, end: 16 }], style: COLORS.rose }
  ],
  '113-2': [
    { id: 'gen_psy_2', code: 'PSY102', name: '普通心理學（二）', type: '必修', professor: '梁思遠、藤原健、姜定宇', ta: '教學群', location: '社科院 127', time: [{ day: 3, start: 13.25, end: 16 }], style: COLORS.blue },
    { id: 'stats_2', code: 'PSY202', name: '心理及教育統計學（二）', type: '必修', professor: '蘇雅蕙', ta: '陳助教', location: '社科院 127', time: [{ day: 2, start: 13.25, end: 16 }], style: COLORS.amber },
    { id: 'physio_1', code: 'BIO201', name: '生理學（一）', type: '選修', professor: '蔡玲玲', ta: '無助教', location: '社科院 423', time: [{ day: 1, start: 15.16, end: 16 }], style: COLORS.green },
    { id: 'reading_skills', code: 'PSY105', name: '心理學閱讀技巧', type: '選修', professor: '王豐彬', ta: '無助教', location: '社科院 127', time: [{ day: 3, start: 8.16, end: 10 }], style: { bg: 'bg-[#e5e5e5]', text: 'text-[#666666]', border: 'border-[#cccccc]', cover: 'bg-[#a3a3a3]', hex: '#a3a3a3' } }
  ],
  '113-1': [
    { id: 'gen_psy_1', code: 'PSY101', name: '普通心理學（一）', type: '必修', professor: '李季湜、陳欣進、趙長懋', ta: '教學群', location: '社科院 127', time: [{ day: 3, start: 13.25, end: 16 }], style: COLORS.blue },
    { id: 'stats_1', code: 'PSY201', name: '心理及教育統計學（一）', type: '必修', professor: '蘇雅蕙', ta: '陳助教', location: '社科院 127', time: [{ day: 2, start: 13.25, end: 16 }], style: COLORS.amber },
    { id: 'calc', code: 'MATH101', name: '微積分', type: '必修', professor: '陳孟豁', ta: '李助教', location: '共教215/管院105', time: [{ day: 2, start: 10.25, end: 11.5 }, { day: 4, start: 10.25, end: 11.5 }, { day: 3, start: 12, end: 13 }], style: COLORS.rose }
  ]
};

const TASKS_MOCK = [
  { id: 1, title: '變態心理學：期末個案分析報告', courseId: 'abnormal', type: 'assignment', deadline: '2025-05-15 23:59', status: 'pending', desc: '請選擇一個虛擬或真實案例，運用課堂所學之診斷標準進行分析。字數限制 3000 字。' },
  { id: 2, title: '性格心理學：大五人格測驗反思', courseId: 'personality', type: 'assignment', deadline: '2025-05-20 23:59', status: 'pending', desc: '完成線上測驗後，撰寫 1000 字反思心得。' },
  { id: 3, title: '生理心理學（二）：期中考 Ch1-5', courseId: 'physio_psy_2', type: 'exam', deadline: '2025-05-12 10:00', status: 'upcoming', desc: '範圍包含神經傳導與藥物機制。' },
];

const CONTACTS_MOCK = [
  { id: 't1', name: '李玉琇', role: '教授', email: 'prof.li@ccu.edu.tw' },
  { id: 't2', name: '蘇雅蕙', role: '教授', email: 'prof.su@ccu.edu.tw' },
  { id: 's1', name: '陳欣進', role: '教授', email: 'prof.chen@ccu.edu.tw' },
  { id: 'ta1', name: '林助教', role: '助教', email: 'ta.lin@ccu.edu.tw' },
  { id: 'ta2', name: '黃助教', role: '助教', email: 'ta.huang@ccu.edu.tw' },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, title: '作業繳交提醒：變態心理學期末報告', time: '10 分鐘前', read: false, type: 'alert' },
  { id: 2, title: '新成績公佈：性格心理學期中考', time: '1 小時前', read: false, type: 'info' },
];

// --- Mock Messages Data ---
const MOCK_MESSAGES_DATA = {
  chats: [
    { 
      id: 'c1', 
      type: 'chat',
      name: '林助教 (生理心理學)', 
      role: '助教', 
      lastMsg: '關於期末考的範圍，請參考剛剛發布的公告。', 
      time: '10:42', 
      unread: true,
      history: [
        { id: 1, sender: 'me', text: '助教你好，請問期末考會考第五章嗎？', time: '10:30' },
        { id: 2, sender: 'other', text: '同學你好，關於期末考的範圍，請參考剛剛發布的公告喔！基本上是以老師上課講過的為主。', time: '10:42' }
      ]
    },
    { 
      id: 'c2', 
      type: 'chat',
      name: '張小美', 
      role: '同學', 
      lastMsg: '等一下要不要一起去吃午餐？', 
      time: '09:15', 
      unread: false,
      history: [
        { id: 1, sender: 'other', text: '誒等一下下課要不要一起去吃學餐？', time: '09:15' }
      ]
    },
    { 
      id: 'c3', 
      type: 'chat',
      name: '陳助教 (心教統)', 
      role: '助教', 
      lastMsg: '同學好，已上傳~', 
      time: '1 年前', 
      unread: false,
      history: [
        { id: 1, sender: 'me', text: '助教您好～不好意思想請問一下，這次大概什麼時候會公佈平常助教課的正確解答呢？謝謝！', time: '1 年前' },
        { id: 2, sender: 'other', text: '同學好，已上傳~', time: '1 年前' }
      ]
    },
    { 
      id: 'c4', 
      type: 'chat',
      name: '陳助教 (心理及教育統計學（一）)', 
      role: '助教', 
      lastMsg: '同學好，已上傳~', 
      time: '一年前', 
      unread: false,
      history: [
        { id: 1, sender: 'me', text: '助教您好～不好意思想請問一下，這次大概什麼時候會公佈平常助教課的正確解答呢？謝謝！', time: '一年前' },
        { id: 2, sender: 'other', text: '同學好，已上傳~', time: '一年前' }
      ]
    }
  ],
  inbox: [
    { 
      id: 'e1', 
      type: 'email',
      sender: '教務處', 
      email: 'academic@ccu.edu.tw', 
      subject: '114學年度第1學期選課通知', 
      time: '昨天', 
      content: '親愛的同學您好：\n\n114學年度第1學期選課即將於下週一開始，請各位同學注意選課時間。\n\n詳細時程請見教務處網站。\n\n教務處 敬上', 
      read: false,
      recipient: '王大明'
    },
    { 
      id: 'e2', 
      type: 'email',
      sender: '李玉琇 教授', 
      email: 'prof.li@ccu.edu.tw', 
      subject: '人類學習與認知 - 期末報告格式說明', 
      time: '2 天前', 
      content: '各位修課同學：\n\n附檔為期末報告的格式範本，請務必遵照格式撰寫。若有任何問題，請於週五前提出。\n\n祝 學習順利\n李玉琇', 
      read: true,
      recipient: '人類學習與認知 修課學生'
    }
  ],
  sent: [
    { 
      id: 's1', 
      type: 'email',
      sender: '我', 
      recipient: '陳欣進 教授', 
      subject: 'Re: 心理學實驗法請假', 
      time: '3 天前', 
      content: '老師好，\n\n我是王大明，學號 413315000。因下週二身體不適需請病假一天，隨信附上診斷證明。\n\n謝謝老師。\n\n學生 王大明 敬上', 
      read: true 
    }
  ],
  drafts: [
    { 
      id: 'd1', 
      type: 'email',
      sender: '我', 
      recipient: '助教', 
      subject: '成績複查申請', 
      time: '1 週前', 
      content: '助教您好，\n\n我對期中考第二題的評分有疑問，希望能申請複查...', 
      read: true 
    }
  ]
};

// --- 2. Shared Components ---

const Card = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-[#ffffff] rounded-2xl shadow-[0_2px_10px_-5px_rgba(0,0,0,0.05)] border border-[#f0f0f0] ${className} ${onClick ? 'cursor-pointer hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.08)] transition-all duration-200' : ''}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className = '', variant = 'primary', icon: Icon, disabled = false }) => {
  const variants = {
    primary: 'bg-[#8da399] text-white hover:bg-[#7a8f85] shadow-sm active:scale-95', 
    secondary: 'bg-[#f4f1ea] text-[#6b6b6b] hover:bg-[#e8e4db] border border-[#e0dad0] active:scale-95',
    danger: 'bg-[#eadcdb] text-[#8c5e5e] hover:bg-[#d6b5b5] active:scale-95',
    outline: 'bg-transparent border border-[#d6ccc2] text-[#8c8c8c] hover:bg-[#faf9f6] hover:text-[#5c5c5c] active:scale-95'
  };
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-[#5c5c5c]/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-[#fdfcfb] rounded-3xl w-full ${maxWidth} shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in-95 duration-300 flex flex-col max-h-[90vh] border border-[#f0f0f0]`}>
        <div className="flex justify-between items-center p-5 border-b border-[#f2f0e9] flex-shrink-0">
          <h3 className="font-serif font-bold text-lg text-[#4a4a4a]">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-[#f2f0e9] rounded-full text-[#8c8c8c] transition-colors"><X size={20} /></button>
        </div>
        <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">{children}</div>
      </div>
    </div>
  );
};

// --- 3. View Components ---

// --- TAB 1: CALENDAR (行事曆) ---
const CalendarView = ({ onComposeMessage }) => {
  const [viewMode, setViewMode] = useState('month'); 
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Reminder State
  const [reminderSettings, setReminderSettings] = useState({ value: 15, unit: 'minutes' });
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [customReminder, setCustomReminder] = useState({ value: '', unit: 'minutes' });
  
  // Personal Events State
  const [personalEvents, setPersonalEvents] = useState([
    { 
      id: 'p1', 
      title: '牙醫預約', 
      date: '2025-05-14', 
      time: '18:30', 
      location: '信安牙醫', 
      recurrence: 'none', 
      recurrenceEndDate: '',
      description: '記得帶健保卡，檢查臼齒。',
      type: 'personal' 
    }
  ]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '', recurrence: 'none', recurrenceEndDate: '', description: '' });

  // Contact State within Task Modal
  const [contactTarget, setContactTarget] = useState('professor'); // professor | ta
  const [contactMethod, setContactMethod] = useState('email'); // email | message

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekHours = Array.from({ length: 11 }, (_, i) => i + 8); 

  // Format reminder display
  const getReminderDisplay = () => {
    const unitMap = { minutes: '分鐘', hours: '小時', days: '天', weeks: '週' };
    return `${reminderSettings.value} ${unitMap[reminderSettings.unit]}前`;
  };

  const handleSyncCalendar = () => {
    alert("已成功連結至您的個人 Google 行事曆！");
  };

  const getEventsForDay = (day) => {
    const dateStr = `2025-05-${String(day).padStart(2, '0')}`;
    const courseTasks = TASKS_MOCK.filter(t => new Date(t.deadline).getDate() === day);
    const pEvents = personalEvents.filter(e => e.date === dateStr);
    return [...courseTasks, ...pEvents];
  };

  const handleAddEvent = () => {
    if(!newEvent.title || !newEvent.date) return;
    setPersonalEvents([...personalEvents, { ...newEvent, id: `p${Date.now()}`, type: 'personal' }]);
    setShowEventModal(false);
    setNewEvent({ title: '', date: '', time: '', location: '', recurrence: 'none', recurrenceEndDate: '', description: '' });
  };

  const handleSaveReminder = () => {
    if (customReminder.value) {
        setReminderSettings({ value: parseInt(customReminder.value), unit: customReminder.unit });
    }
    setShowReminderModal(false);
  };

  const handleContactSubmit = () => {
    const course = COURSES_DATA['114-2'].find(c => c.id === selectedTask.courseId);
    if (!course) return;
    
    const recipientName = contactTarget === 'professor' ? course.professor : course.ta;
    onComposeMessage({
      to: recipientName,
      context: `關於 ${selectedTask.title} 的問題`,
      type: contactMethod
    });
    setSelectedTask(null);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#ffffff] p-4 rounded-2xl border border-[#f0f0f0] shadow-sm flex-shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="font-serif text-lg font-bold text-[#4a4a4a] tracking-wide">2025 年 5 月</h2>
          <div className="flex bg-[#f7f5f0] rounded-full p-1 border border-[#e0dad0]">
            <button onClick={() => setViewMode('month')} className={`px-4 py-1 text-xs rounded-full transition-all font-medium ${viewMode === 'month' ? 'bg-[#ffffff] shadow-sm text-[#5c5c5c]' : 'text-[#9e9e9e] hover:text-[#7a7a7a]'}`}>月</button>
            <button onClick={() => setViewMode('week')} className={`px-4 py-1 text-xs rounded-full transition-all font-medium ${viewMode === 'week' ? 'bg-[#ffffff] shadow-sm text-[#5c5c5c]' : 'text-[#9e9e9e] hover:text-[#7a7a7a]'}`}>週</button>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="secondary" icon={Plus} className="px-3 py-1.5 text-xs" onClick={() => setShowEventModal(true)}>新增事件</Button>
           
           <div className="flex items-center gap-2 text-xs text-[#8c8c8c] bg-[#f7f5f0] px-3 py-1.5 rounded-full border border-[#e0dad0]">
             <Bell size={12}/>
             <span>提醒: {getReminderDisplay()}</span>
             <button className="text-[#8da399] hover:underline ml-1 font-bold" onClick={() => setShowReminderModal(true)}>修改</button>
           </div>
           <Button variant="outline" onClick={handleSyncCalendar} icon={CalendarIcon} className="px-3 py-1.5 text-xs">同步</Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-hidden bg-[#ffffff] rounded-2xl border border-[#f0f0f0] shadow-sm p-3">
        {viewMode === 'month' ? (
          <div className="h-full grid grid-cols-7 grid-rows-6 gap-px bg-[#f7f5f0] rounded-xl overflow-hidden border border-[#f0f0f0]">
            {weekDays.map(d => <div key={d} className="bg-[#ffffff] p-2 text-center text-xs font-bold text-[#a09a94] uppercase tracking-widest">{d}</div>)}
            {[...Array(4)].map((_, i) => <div key={`pad-${i}`} className="bg-[#ffffff/50]"></div>)}
            {daysInMonth.map(day => {
                const events = getEventsForDay(day);
                return (
                  <div key={day} className="bg-[#ffffff] p-1.5 hover:bg-[#faf9f6] transition-colors relative group cursor-pointer flex flex-col items-start min-h-0 overflow-hidden" onClick={() => { if(events.length === 0) { setNewEvent({...newEvent, date: `2025-05-${String(day).padStart(2,'0')}`}); setShowEventModal(true); } }}>
                    <span className={`text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full mb-1 flex-shrink-0 ${day === 12 ? 'bg-[#8da399] text-white shadow-sm' : 'text-[#6b6b6b]'}`}>{day}</span>
                    <div className="w-full space-y-0.5 overflow-y-auto custom-scrollbar flex-1">
                      {events.map(event => (
                        <div 
                          key={event.id} 
                          onClick={(e) => { e.stopPropagation(); setSelectedTask(event); }}
                          className={`text-[9px] px-1 py-0.5 rounded truncate border font-medium cursor-pointer hover:opacity-80 transition-opacity
                            ${event.type === 'personal' ? 'bg-[#f4f4f5] text-[#52525b] border-[#e4e4e7]' : 
                              event.type === 'exam' ? 'bg-[#eadcdb] text-[#8c5e5e] border-[#d6b5b5]' : 'bg-[#f4f1ea] text-[#8a7a5c] border-[#e0d6c1]'}
                          `}
                        >
                            {event.type === 'personal' ? '' : event.type === 'exam' ? '考: ' : '作: '} {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
            })}
          </div>
        ) : (
          /* Week View Simplified */
          <div className="h-full flex flex-col relative">
             <div className="grid grid-cols-[50px_repeat(5,1fr)] flex-1 h-full">
                <div className="flex flex-col h-full border-r border-[#f0f0f0]">
                   <div className="h-8 bg-white z-20 border-b border-[#f0f0f0]"></div>
                   {weekHours.map(h => (
                     <div key={h} className="flex-1 border-b border-[#f7f7f7] flex items-start justify-center pt-1 text-[10px] font-medium text-[#b0b0b0]">{h}:00</div>
                   ))}
                </div>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, dIdx) => (
                  <div key={d} className="flex flex-col h-full border-r border-[#f0f0f0] relative">
                      <div className="h-8 flex items-center justify-center font-serif font-bold text-[#a09a94] bg-white z-20 border-b border-[#f0f0f0] tracking-wider text-xs">{d}</div>
                      <div className="flex-1 relative">
                        {weekHours.map(h => (
                          <div key={`${h}-${d}`} className="absolute w-full border-b border-[#fcfcfc]" style={{ top: `${((h - 8) / 11) * 100}%`, height: `${(1/11)*100}%` }}></div>
                        ))}
                        {dIdx === 0 && (
                           <div className="absolute left-1 right-1 p-1.5 bg-[#eadcdb] rounded border border-[#d6b5b5] text-[10px] text-[#8c5e5e] shadow-sm cursor-pointer hover:brightness-95 transition-all z-10" 
                                style={{ top: `${((10 - 8) / 11) * 100}%`, height: 'auto' }}
                                onClick={() => setSelectedTask(TASKS_MOCK[0])}>
                             <div className="font-bold mb-0.5">作業截止</div>
                             <div className="truncate opacity-80">變態心理學</div>
                           </div>
                        )}
                      </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>

      {/* Task / Event Detail Modal */}
      <Modal isOpen={!!selectedTask} onClose={() => setSelectedTask(null)} title={selectedTask?.type === 'personal' ? "私人行程" : "任務詳情"} maxWidth="max-w-xl">
         {selectedTask && (
           <div className="space-y-5">
             {selectedTask.type === 'personal' ? (
                // Personal Event Detail
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-[#faf9f6] rounded-xl border border-[#e0dad0]">
                      <div className="p-3 rounded-xl bg-[#f4f4f5] text-[#52525b]"><User size={24}/></div>
                      <div>
                        <h4 className="text-lg font-serif font-bold text-[#4a4a4a] mb-1">{selectedTask.title}</h4>
                        <div className="text-sm text-[#8c8c8c] space-y-1">
                          <p className="flex items-center"><Clock size={14} className="mr-1.5"/> {selectedTask.date} {selectedTask.time}</p>
                          <p className="flex items-center"><MapPin size={14} className="mr-1.5"/> {selectedTask.location || '無地點'}</p>
                          {selectedTask.recurrence !== 'none' && <p className="flex items-center text-[#8da399]"><Repeat size={14} className="mr-1.5"/> 重複: {selectedTask.recurrence === 'daily' ? '每天' : selectedTask.recurrence === 'weekly' ? '每週' : selectedTask.recurrence === 'monthly' ? '每月' : '每年'}</p>}
                        </div>
                      </div>
                  </div>
                  
                  {selectedTask.description && (
                      <div className="bg-white p-3 rounded-xl border border-[#f0f0f0]">
                         <label className="text-[10px] font-bold text-[#b0b0b0] uppercase tracking-widest mb-1 block">備註</label>
                         <p className="text-sm text-[#5c5c5c] leading-relaxed">{selectedTask.description}</p>
                      </div>
                  )}

                  <div className="flex justify-end gap-3 pt-4 border-t border-[#f0f0f0]">
                      <Button variant="secondary" onClick={() => setSelectedTask(null)}>關閉</Button>
                      <Button variant="danger" icon={Trash2} onClick={() => { setPersonalEvents(personalEvents.filter(e => e.id !== selectedTask.id)); setSelectedTask(null); }}>刪除</Button>
                  </div>
                </div>
             ) : (
                // Course Task Detail
                <>
                  <div className="flex items-start gap-4 p-4 bg-[#faf9f6] rounded-xl border border-[#e0dad0]">
                    <div className={`p-3 rounded-xl ${selectedTask.type === 'exam' ? 'bg-[#eadcdb] text-[#8c5e5e]' : 'bg-[#e0d6c1] text-[#8a7a5c]'}`}>
                      {selectedTask.type === 'exam' ? <AlertCircle size={24}/> : <FileText size={24}/>}
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-[#4a4a4a] mb-1">{selectedTask.title}</h4>
                      <p className="text-sm text-[#8c8c8c] flex items-center font-medium"><Clock size={14} className="mr-1.5"/> 截止期限: {selectedTask.deadline}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-[#b0b0b0] uppercase tracking-widest mb-2 block">任務說明</label>
                    <p className="text-[#5c5c5c] leading-relaxed text-sm font-light">{selectedTask.desc}</p>
                  </div>

                  <div className="bg-[#fdfcfb] border border-[#e0dad0] rounded-xl p-4 mt-1">
                      <h4 className="text-xs font-bold text-[#8da399] uppercase tracking-widest mb-3 flex items-center gap-1"><MessageSquare size={12}/> 有問題嗎？聯絡教學團隊</h4>
                      
                      <div className="flex flex-col gap-3">
                         <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-[10px] font-bold text-[#b0b0b0] mb-1 block">聯絡對象</label>
                                <div className="flex gap-1 bg-[#f7f5f0] p-1 rounded-lg">
                                   <button onClick={() => setContactTarget('professor')} className={`flex-1 py-1.5 text-xs rounded-md transition-all ${contactTarget === 'professor' ? 'bg-white shadow-sm text-[#5c5c5c] font-bold' : 'text-[#9e9e9e]'}`}>教授</button>
                                   <button onClick={() => setContactTarget('ta')} className={`flex-1 py-1.5 text-xs rounded-md transition-all ${contactTarget === 'ta' ? 'bg-white shadow-sm text-[#5c5c5c] font-bold' : 'text-[#9e9e9e]'}`}>助教</button>
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] font-bold text-[#b0b0b0] mb-1 block">聯絡方式</label>
                                <div className="flex gap-1 bg-[#f7f5f0] p-1 rounded-lg">
                                   <button onClick={() => setContactMethod('email')} className={`flex-1 py-1.5 text-xs rounded-md transition-all ${contactMethod === 'email' ? 'bg-white shadow-sm text-[#5c5c5c] font-bold' : 'text-[#9e9e9e]'}`}>寄信</button>
                                   <button onClick={() => setContactMethod('message')} className={`flex-1 py-1.5 text-xs rounded-md transition-all ${contactMethod === 'message' ? 'bg-white shadow-sm text-[#5c5c5c] font-bold' : 'text-[#9e9e9e]'}`}>訊息</button>
                                </div>
                            </div>
                         </div>
                         <Button variant="primary" className="w-full" onClick={handleContactSubmit}>
                             <Send size={14} className="mr-1"/> 發送{contactMethod === 'email' ? '郵件' : '訊息'}
                         </Button>
                      </div>
                  </div>

                  {selectedTask.type === 'assignment' && (
                      <div className="pt-4 border-t border-[#f0f0f0]">
                        <Button variant="secondary" icon={Upload} className="w-full">上傳作業檔案</Button>
                      </div>
                  )}
                </>
             )}
           </div>
         )}
      </Modal>

      {/* Reminder Settings Modal */}
      <Modal isOpen={showReminderModal} onClose={() => setShowReminderModal(false)} title="設定預設提醒時間">
         <div className="space-y-4">
            <p className="text-sm text-[#8c8c8c]">請選擇所有作業與考試的預設提醒時間：</p>
            <div className="grid grid-cols-2 gap-3">
               {[
                 { val: 15, u: 'minutes', label: '15 分鐘前' }, 
                 { val: 30, u: 'minutes', label: '30 分鐘前' }, 
                 { val: 60, u: 'minutes', label: '1 小時前' }, 
                 { val: 1440, u: 'minutes', label: '1 天前' }
               ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => { setReminderSettings({ value: opt.val, unit: opt.u }); setShowReminderModal(false); }}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${reminderSettings.value === opt.val ? 'border-[#8da399] bg-[#8da399]/10 text-[#8da399]' : 'border-[#e0dad0] hover:bg-[#f7f5f0] text-[#5c5c5c]'}`}
                  >
                      {opt.label}
                  </button>
               ))}
            </div>
            <div className="pt-4 border-t border-[#f0f0f0]">
               <label className="text-xs font-bold text-[#b0b0b0] mb-2 block">自訂時間</label>
               <div className="flex gap-2">
                 <input 
                   type="number" 
                   className="flex-1 p-2 border border-[#e0dad0] rounded-lg" 
                   placeholder="數值" 
                   value={customReminder.value}
                   onChange={e => setCustomReminder({...customReminder, value: e.target.value})}
                 />
                 <select 
                   className="p-2 border border-[#e0dad0] rounded-lg bg-white text-[#5c5c5c]"
                   value={customReminder.unit}
                   onChange={e => setCustomReminder({...customReminder, unit: e.target.value})}
                 >
                    <option value="minutes">分鐘</option>
                    <option value="hours">小時</option>
                    <option value="days">天</option>
                    <option value="weeks">週</option>
                 </select>
                 <Button onClick={handleSaveReminder} className="px-4">儲存</Button>
               </div>
            </div>
         </div>
      </Modal>

      {/* Add Personal Event Modal */}
      <Modal isOpen={showEventModal} onClose={() => setShowEventModal(false)} title="新增個人行程">
         <div className="space-y-4">
            <div>
               <label className="text-xs font-bold text-[#b0b0b0] mb-1 block">事件名稱</label>
               <input type="text" className="w-full p-2 border border-[#e0dad0] rounded-lg bg-[#fdfcfb] focus:outline-none focus:border-[#8da399]" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} placeholder="例如：社團成發、牙醫..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="text-xs font-bold text-[#b0b0b0] mb-1 block">日期</label>
                  <input type="date" className="w-full p-2 border border-[#e0dad0] rounded-lg bg-[#fdfcfb]" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
               </div>
               <div>
                  <label className="text-xs font-bold text-[#b0b0b0] mb-1 block">時間</label>
                  <input type="time" className="w-full p-2 border border-[#e0dad0] rounded-lg bg-[#fdfcfb]" value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} />
               </div>
            </div>
            <div>
               <label className="text-xs font-bold text-[#b0b0b0] mb-1 block">地點</label>
               <input type="text" className="w-full p-2 border border-[#e0dad0] rounded-lg bg-[#fdfcfb]" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} placeholder="選填" />
            </div>
            <div>
               <label className="text-xs font-bold text-[#b0b0b0] mb-1 block">備註</label>
               <textarea className="w-full p-2 border border-[#e0dad0] rounded-lg bg-[#fdfcfb] resize-none h-20" value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} placeholder="選填" />
            </div>
            <div className="pt-2 grid grid-cols-2 gap-4">
               <div>
                   <label className="text-xs font-bold text-[#b0b0b0] mb-1 block">重複頻率</label>
                   <select 
                      className="w-full p-2 border border-[#e0dad0] rounded-lg bg-[#fdfcfb] text-[#5c5c5c]"
                      value={newEvent.recurrence} 
                      onChange={e => setNewEvent({...newEvent, recurrence: e.target.value})}
                   >
                      <option value="none">不重複</option>
                      <option value="daily">每天</option>
                      <option value="weekly">每週</option>
                      <option value="monthly">每月</option>
                      <option value="yearly">每年</option>
                   </select>
               </div>
               {newEvent.recurrence !== 'none' && (
                 <div className="animate-in fade-in slide-in-from-left-2">
                   <label className="text-xs font-bold text-[#b0b0b0] mb-1 block">結束重複日期</label>
                   <input type="date" className="w-full p-2 border border-[#e0dad0] rounded-lg bg-[#fdfcfb]" value={newEvent.recurrenceEndDate} onChange={e => setNewEvent({...newEvent, recurrenceEndDate: e.target.value})} />
                 </div>
               )}
            </div>
            <div className="pt-4">
               <Button className="w-full" onClick={handleAddEvent} icon={Plus}>新增至行事曆</Button>
            </div>
         </div>
      </Modal>
    </div>
  );
};

// --- TAB 2: SCHEDULE (課表) ---
const ScheduleView = ({ onNavigateToCourse }) => {
  const [currentSemester, setCurrentSemester] = useState('114-2');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const hoursCount = 13; 
  const hours = Array.from({ length: hoursCount }, (_, i) => i + 8); 

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
         <h2 className="font-serif text-lg font-bold text-[#4a4a4a] tracking-wide">我的課表</h2>
         <div className="flex bg-[#fdfcfb] rounded-full border border-[#f0f0f0] p-1 shadow-sm">
            {SEMESTERS.map(sem => (
              <button
                key={sem}
                onClick={() => setCurrentSemester(sem)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${currentSemester === sem ? 'bg-[#8da399] text-white shadow-sm' : 'text-[#8c8c8c] hover:bg-[#f2f0e9]'}`}
              >
                {sem}
              </button>
            ))}
         </div>
      </div>

      <div className="flex-1 bg-[#ffffff] border border-[#f0f0f0] rounded-2xl shadow-sm overflow-hidden p-2 relative">
        <div className="h-full flex flex-col w-full">
            {/* Header Row */}
            <div className="flex h-10 border-b border-[#f0f0f0] flex-shrink-0">
               <div className="w-[50px] bg-[#ffffff] sticky left-0 z-30"></div> 
               {days.map(d => (
                 <div key={d} className="flex-1 flex items-center justify-center font-serif font-bold text-[#a09a94] border-l border-[#f0f0f0] tracking-wider bg-[#ffffff] text-sm">{d}</div>
               ))}
            </div>

            {/* Grid Body */}
            <div className="flex-1 flex relative">
                {/* Time Column */}
                <div className="w-[50px] flex flex-col border-r border-[#f0f0f0] bg-[#ffffff] flex-shrink-0">
                   {hours.map(h => (
                     <div key={h} className="flex-1 flex items-start justify-center pt-1 text-[10px] font-medium text-[#b0b0b0] font-serif border-b border-[#f7f7f7]">
                       {h}:00
                     </div>
                   ))}
                </div>

                {/* Days Columns Background */}
                <div className="flex-1 flex relative">
                   {[0,1,2,3,4].map(i => (
                     <div key={i} className="flex-1 border-r border-[#fcfcfc] relative h-full">
                        {hours.map(h => (
                          <div key={h} className="absolute w-full border-b border-[#fcfcfc]" style={{
                            top: `${((h - 8) / hoursCount) * 100}%`,
                            height: `${(1/hoursCount)*100}%`
                          }}></div>
                        ))}
                     </div>
                   ))}

                   {/* Course Blocks Overlay */}
                   {COURSES_DATA[currentSemester]?.map(course => (
                     course.time.map((t, idx) => (
                       <div
                          key={`${course.id}-${idx}`}
                          onClick={() => onNavigateToCourse(course)}
                          className={`
                            absolute mx-1 rounded-lg border cursor-pointer 
                            hover:brightness-95 hover:shadow-md transition-all duration-300
                            flex flex-col justify-center px-2 pointer-events-auto overflow-hidden
                            ${course.style.bg} ${course.style.border} border-l-[3px]
                          `}
                          style={{
                            left: `${(t.day - 1) * 20}%`, 
                            width: '20%',
                            top: `${((t.start - 8) / hoursCount) * 100}%`,
                            height: `${((t.end - t.start) / hoursCount) * 100}%`,
                            zIndex: 10
                          }}
                       >
                         <div className={`font-bold text-[10px] leading-tight mb-0.5 ${course.style.text} truncate`}>{course.name}</div>
                         <div className={`hidden md:flex items-center text-[9px] opacity-80 ${course.style.text} truncate`}><MapPin size={8} className="mr-1"/>{course.location}</div>
                       </div>
                     ))
                   ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- TAB 3: COURSE DASHBOARD (課程儀表板) ---
const CourseDashboard = ({ selectedCourse: initialCourse, onBack, onComposeMessage }) => {
  const [activeTab, setActiveTab] = useState('announcement');
  const [currentSemester, setCurrentSemester] = useState('114-2');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  
  // New States for Interactions
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [contactTarget, setContactTarget] = useState(null); // { name, role }
  
  useEffect(() => {
    if (initialCourse) {
      let foundSem = '114-2';
      Object.keys(COURSES_DATA).forEach(sem => {
        if (COURSES_DATA[sem].find(c => c.id === initialCourse.id)) foundSem = sem;
      });
      setCurrentSemester(foundSem);
      setSelectedCourseId(initialCourse.id);
      setViewMode('detail');
    } else {
      setViewMode('grid');
      setSelectedCourseId(null);
    }
  }, [initialCourse]);

  const currentCourse = useMemo(() => COURSES_DATA[currentSemester]?.find(c => c.id === selectedCourseId), [currentSemester, selectedCourseId]);

  const handleContactClick = (role, name) => {
    setContactTarget({ name, role });
  };
  
  const handleContactSelection = (type) => {
    if (contactTarget) {
      onComposeMessage({ to: contactTarget.name, context: currentCourse.name, type: type });
      setContactTarget(null);
    }
  };

  const handleBackToGrid = () => {
    if (initialCourse && onBack) {
      onBack();
    } else {
      setViewMode('grid');
      setSelectedCourseId(null);
    }
  };
  
  const handleUpload = () => {
      // Mock upload process
      alert("檔案上傳成功！");
      setShowUploadModal(false);
  }

  if (viewMode === 'grid') {
    return (
      <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-end mb-4 border-b border-[#e0dad0] pb-3">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#4a4a4a]">課程儀表板</h2>
            <p className="text-[#8c8c8c] text-xs font-light tracking-wide mt-1">請選擇學期以瀏覽課程。</p>
          </div>
          <div className="relative">
            <select 
              value={currentSemester} 
              onChange={(e) => setCurrentSemester(e.target.value)}
              className="appearance-none bg-[#fdfcfb] border border-[#d6ccc2] text-[#5c5c5c] py-1.5 pl-3 pr-8 rounded-full leading-tight focus:outline-none focus:ring-1 focus:ring-[#8da399] font-medium text-sm shadow-sm cursor-pointer hover:bg-[#f7f5f0] transition-colors"
            >
               {SEMESTERS.map(s => <option key={s} value={s}>{s} 學期</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 text-[#8c8c8c] pointer-events-none" size={14}/>
          </div>
        </div>

        {(!COURSES_DATA[currentSemester] || COURSES_DATA[currentSemester].length === 0) ? (
          <div className="flex-1 flex flex-col items-center justify-center text-[#b0b0b0] border-2 border-dashed border-[#e0dad0] rounded-2xl m-4 bg-[#f9f8f6]">
            <BookOpen size={48} className="mb-4 opacity-30" />
            <p className="text-sm font-serif">本學期尚無課程資料</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-10 pr-2 custom-scrollbar">
            {COURSES_DATA[currentSemester].map(course => (
              <div 
                key={course.id}
                onClick={() => { setSelectedCourseId(course.id); setViewMode('detail'); }}
                className="group bg-[#ffffff] rounded-2xl shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] border border-[#f0f0f0] overflow-hidden cursor-pointer hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-40"
              >
                <div className={`h-12 ${course.style.cover} relative px-4 flex items-center justify-between overflow-hidden`}>
                   <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent"></div>
                   <span className="relative z-10 bg-[#ffffff]/30 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-white tracking-widest">{course.code}</span>
                   <span className="relative z-10 bg-[#ffffff]/30 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-white">{course.type}</span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between bg-[#ffffff]">
                   <div>
                     <h3 className="font-serif text-base font-bold text-[#4a4a4a] mb-1 group-hover:text-[#8da399] transition-colors leading-snug line-clamp-1">{course.name}</h3>
                     <div className="flex items-center text-[#8c8c8c] text-xs gap-3">
                        <span className="flex items-center"><User size={12} className="mr-1 text-[#b0b0b0]"/> {course.professor}</span>
                        <span className="flex items-center"><MapPin size={12} className="mr-1 text-[#b0b0b0]"/> {course.location}</span>
                     </div>
                   </div>
                   <div className="pt-2 border-t border-[#f7f5f0] flex justify-between items-center mt-1">
                      <span className="text-[10px] font-bold text-[#b0b0b0] uppercase tracking-widest">進入課程</span>
                      <ChevronRight size={14} className="text-[#d6ccc2] group-hover:text-[#8da399] transition-colors"/>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (!currentCourse) return null;

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-right-8 duration-500">
      <div className="flex items-center mb-3">
        <button onClick={handleBackToGrid} className="flex items-center text-[#8c8c8c] hover:text-[#4a4a4a] hover:bg-[#f2f0e9] px-3 py-1.5 rounded-full transition-colors mr-3 group">
          <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform"/> <span className="font-medium text-xs">返回列表</span>
        </button>
        <span className="text-[#b0b0b0] font-light text-xs mx-2">/</span>
        <span className="text-[#8c8c8c] font-medium text-xs">{currentSemester}</span>
        <span className="text-[#b0b0b0] font-light text-xs mx-2">/</span>
        <span className="text-[#4a4a4a] font-bold tracking-wide text-sm">{currentCourse.name}</span>
      </div>

      {/* Simplified Course Header - More compact as requested */}
      <div className="bg-[#ffffff] px-6 py-4 rounded-xl border border-[#f0f0f0] shadow-sm mb-4 flex justify-between items-center relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-2 h-full ${currentCourse.style.cover}`}></div>
        <div>
           <div className="flex items-center space-x-2 mb-1">
             <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white tracking-widest ${currentCourse.style.cover}`}>{currentCourse.code}</span>
             <span className="text-[#8c8c8c] text-[10px] font-medium bg-[#f7f5f0] px-2 py-0.5 rounded">{currentCourse.location}</span>
             <span className="text-[#8c8c8c] text-[10px] font-medium bg-[#f7f5f0] px-2 py-0.5 rounded">{currentCourse.type}</span>
           </div>
           <h1 className="font-serif text-lg font-bold text-[#4a4a4a] tracking-tight">{currentCourse.name}</h1>
        </div>
        <div className="flex gap-2">
            <Button variant="secondary" className="px-3 py-1.5 text-xs h-8" onClick={() => handleContactClick('教師', currentCourse.professor)}>
              <User size={14} /> <span className="text-xs">教師</span>
            </Button>
            <Button variant="secondary" className="px-3 py-1.5 text-xs h-8" onClick={() => handleContactClick('助教', currentCourse.ta)}>
              <Users size={14} /> <span className="text-xs">助教</span>
            </Button>
        </div>
      </div>

      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex space-x-4 mb-4 px-2">
          {[{id:'announcement', l:'公告', i: Megaphone}, {id:'materials', l:'教材', i: BookOpen}, {id:'homework', l:'作業上傳', i: Upload}].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2 text-sm font-bold flex items-center space-x-2 transition-all relative ${activeTab === tab.id ? 'text-[#8da399]' : 'text-[#9e9e9e] hover:text-[#7a7a7a]'}`}
            >
              <tab.i size={16}/>
              <span className="tracking-widest text-xs">{tab.l}</span>
              {activeTab === tab.id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8da399] rounded-full"></span>}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-[#ffffff] rounded-2xl border border-[#f0f0f0] shadow-sm overflow-y-auto custom-scrollbar p-0">
          {/* 2-Column Layout for Better Readability */}
          <div className="p-6">
            {activeTab === 'announcement' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-[#e0d6c1] bg-[#fdf2d9]/30 p-5 rounded-xl h-fit">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-[#fdf2d9] rounded-full text-[#9c7b4f]"><AlertCircle size={16}/></div>
                      <span className="font-serif font-bold text-base text-[#5c5c5c]">期中考範圍更動</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#9c7b4f] bg-[#fdf2d9] px-2 py-0.5 rounded-full tracking-widest">2025.05.10</span>
                  </div>
                  <div className="pl-8"><p className="text-[#5c5c5c] leading-loose text-sm font-light">各位同學好，原本預計考到第五章的範圍，現修正為<strong className="font-bold text-[#4a4a4a]">考到第四章結束</strong>。請大家告訴大家！</p></div>
                </div>
                
                {/* More mock announcements */}
                <div className="border border-[#b6c7d6] bg-[#dbe4ea]/30 p-5 rounded-xl h-fit">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-[#dbe4ea] rounded-full text-[#5d707f]"><Info size={16}/></div>
                      <span className="font-serif font-bold text-base text-[#5c5c5c]">課程異動通知</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#5d707f] bg-[#dbe4ea] px-2 py-0.5 rounded-full tracking-widest">2025.05.01</span>
                  </div>
                  <div className="pl-8"><p className="text-[#5c5c5c] leading-loose text-sm font-light">下週三 (5/17) 的課程將改為線上進行，連結已發送至各位信箱，請準時上線。</p></div>
                </div>
              </div>
            )}
            
            {activeTab === 'materials' && (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 {[1,2,3,4,5,6].map(i => (
                   <div key={i} className="flex items-center p-3 border border-[#f0f0f0] rounded-xl hover:border-[#d6b5b5] cursor-pointer group transition-all bg-[#faf9f6]">
                     <div className="w-10 h-10 bg-[#eadcdb] text-[#8c5e5e] rounded-lg flex items-center justify-center mr-3 shadow-sm"><FileText size={20} /></div>
                     <div className="flex-1 min-w-0">
                       <div className="font-serif font-bold text-sm text-[#4a4a4a] mb-0.5 truncate">Week {i} 課程講義</div>
                       <div className="text-[10px] text-[#9e9e9e] font-light">2.4 MB</div>
                     </div>
                     <button className="p-1.5 rounded-full text-[#b0b0b0] hover:bg-[#eadcdb] hover:text-[#8c5e5e] transition-all"><Download size={16}/></button>
                   </div>
                 ))}
               </div>
            )}
            
            {activeTab === 'homework' && (
               <div className="space-y-3 max-w-4xl">
                  <div className="flex flex-col md:flex-row justify-between items-center p-5 border-l-4 border-l-[#d1c4a9] bg-[#fdfcfb] rounded-r-xl shadow-sm hover:shadow-md transition-shadow">
                     <div className="flex items-center gap-4 mb-3 md:mb-0 w-full md:w-auto">
                        <div className="w-10 h-10 rounded-full bg-[#f0eadd] flex items-center justify-center text-[#8a7a5c]"><AlertCircle size={20} /></div>
                        <div>
                          <h4 className="font-serif font-bold text-base text-[#4a4a4a] mb-0.5">期中報告草稿</h4>
                          <div className="flex items-center gap-2">
                             <span className="text-[#8a7a5c] font-bold text-xs bg-[#f0eadd]/50 px-2 py-0.5 rounded">截止: 2025.05.15</span>
                             <span className="text-[#9e9e9e] text-[10px]">未繳交</span>
                          </div>
                        </div>
                     </div>
                     <Button variant="primary" icon={Upload} className="text-xs px-4 py-2 w-full md:w-auto" onClick={() => setShowUploadModal(true)}>上傳檔案</Button>
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-center p-5 border border-[#f0f0f0] rounded-xl bg-[#faf9f6] opacity-75 hover:opacity-100 transition-opacity">
                     <div className="flex items-center gap-4 mb-3 md:mb-0 w-full md:w-auto">
                        <div className="w-10 h-10 rounded-full bg-[#dce5dd] flex items-center justify-center text-[#5c7a63]"><Check size={20} /></div>
                        <div>
                          <h4 className="font-serif font-bold text-base text-[#4a4a4a] mb-0.5">第一次作業：文獻回顧</h4>
                          <div className="flex items-center gap-2">
                             <span className="text-[#5c7a63] font-bold text-xs">已繳交 (95分)</span>
                             <span className="text-[#9e9e9e] text-[10px]">2025.03.20</span>
                          </div>
                        </div>
                     </div>
                     <Button variant="secondary" className="text-xs px-4 py-2 w-full md:w-auto" onClick={() => setShowFeedbackModal(true)}>查看回饋</Button>
                  </div>
               </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Upload Modal */}
      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="上傳作業檔案">
         <div className="space-y-4">
             <div className="border-2 border-dashed border-[#e0dad0] rounded-2xl p-8 flex flex-col items-center justify-center text-[#9e9e9e] hover:bg-[#faf9f6] transition-colors cursor-pointer">
                 <Upload size={32} className="mb-2 text-[#b0b0b0]"/>
                 <p className="text-sm font-bold text-[#5c5c5c]">點擊選擇檔案 或 拖曳至此</p>
                 <p className="text-xs text-[#b0b0b0] mt-1">支援格式：PDF, Word, JPG (上限 10MB)</p>
             </div>
             <div className="flex justify-end pt-2">
                 <Button onClick={handleUpload}>確認上傳</Button>
             </div>
         </div>
      </Modal>

      {/* Feedback Modal */}
      <Modal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} title="作業回饋：文獻回顧">
          <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-[#fdfcfb] border border-[#f0f0f0] rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-[#dce5dd] flex items-center justify-center text-[#5c7a63] font-bold text-lg">95</div>
                  <div>
                      <h4 className="text-sm font-bold text-[#4a4a4a]">總分</h4>
                      <p className="text-xs text-[#8c8c8c]">評分日期：2025.03.25</p>
                  </div>
              </div>
              <div className="bg-[#faf9f6] p-5 rounded-xl">
                  <h4 className="text-xs font-bold text-[#b0b0b0] uppercase tracking-widest mb-3 flex items-center gap-1"><MessageSquare size={12}/> 助教評語</h4>
                  <p className="text-sm text-[#5c5c5c] leading-loose">
                      同學您好，您的報告架構非常完整，文獻引用的格式也都正確無誤。特別是在第二章節對於實驗設計的探討非常有深度，展現了良好的批判性思考能力。唯一的小建議是結論部分可以再精簡一些，突出重點會更好。繼續保持！
                  </p>
              </div>
              <Button variant="secondary" className="w-full" onClick={() => setShowFeedbackModal(false)}>關閉</Button>
          </div>
      </Modal>

      {/* Contact Choice Modal */}
      <Modal isOpen={!!contactTarget} onClose={() => setContactTarget(null)} title={`聯絡${contactTarget?.role}`}>
          <div className="space-y-4">
              <p className="text-sm text-[#5c5c5c] text-center mb-2">請問您想要如何聯絡 {contactTarget?.name}？</p>
              <div className="grid grid-cols-2 gap-4">
                  <div 
                    className="p-4 border border-[#e0dad0] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#faf9f6] transition-all group"
                    onClick={() => handleContactSelection('email')}
                  >
                      <div className="w-12 h-12 bg-[#f4f1ea] rounded-full flex items-center justify-center text-[#6b6b6b] group-hover:scale-110 transition-transform mb-2"><Mail size={24}/></div>
                      <span className="font-bold text-sm text-[#4a4a4a]">寄送信件</span>
                      <span className="text-xs text-[#9e9e9e] mt-1">正式詢問、請假</span>
                  </div>
                  <div 
                    className="p-4 border border-[#e0dad0] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#faf9f6] transition-all group"
                    onClick={() => handleContactSelection('message')}
                  >
                      <div className="w-12 h-12 bg-[#eadcdb] rounded-full flex items-center justify-center text-[#8c5e5e] group-hover:scale-110 transition-transform mb-2"><MessageSquare size={24}/></div>
                      <span className="font-bold text-sm text-[#4a4a4a]">傳送訊息</span>
                      <span className="text-xs text-[#9e9e9e] mt-1">即時討論、簡短問題</span>
                  </div>
              </div>
          </div>
      </Modal>
    </div>
  );
};

// --- TAB 4: MESSAGES (對話與訊息) ---
const MessageCenter = ({ onCompose }) => {
  const [subTab, setSubTab] = useState('inbox'); 
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const activeList = MOCK_MESSAGES_DATA[subTab] || [];

  return (
    <div className="h-full flex bg-[#ffffff] rounded-2xl border border-[#f0f0f0] shadow-sm overflow-hidden relative">
      {/* Sidebar */}
      <div className="w-72 border-r border-[#f0f0f0] flex flex-col bg-[#faf9f6]">
        <div className="p-4 border-b border-[#f0f0f0]">
          <div className="grid grid-cols-2 gap-2 bg-[#f0eadd]/50 p-1 rounded-lg mb-4">
            {['chat', 'inbox', 'sent', 'drafts'].map(t => (
              <button 
                key={t}
                onClick={() => { setSubTab(t); setSelectedMessage(null); }}
                className={`py-1.5 text-[10px] font-bold rounded-md capitalize transition-all ${subTab === t ? 'bg-[#ffffff] shadow-sm text-[#5c5c5c]' : 'text-[#9e9e9e]'}`}
              >
                {t === 'chat' ? '訊息' : t === 'inbox' ? '收件匣' : t === 'sent' ? '寄件備份' : '草稿'}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-[#b0b0b0]" size={16} />
            <input type="text" placeholder="搜尋..." className="w-full bg-[#ffffff] border border-[#e0dad0] rounded-full pl-10 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#8da399] text-[#5c5c5c]"/>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
           {activeList.map(item => (
             <div 
               key={item.id} 
               onClick={() => setSelectedMessage(item)}
               className={`p-4 border-b border-[#f7f5f0] cursor-pointer transition-colors group ${selectedMessage?.id === item.id ? 'bg-[#ffffff] border-l-4 border-l-[#8da399]' : 'hover:bg-[#ffffff]'}`}
             >
               <div className="flex justify-between mb-1">
                 <span className={`font-serif font-bold text-sm ${!item.read && !item.messages ? 'text-[#8da399]' : 'text-[#4a4a4a]'}`}>
                    {subTab === 'chat' ? item.name : item.sender}
                 </span>
                 <span className="text-[10px] text-[#b0b0b0]">{item.time}</span>
               </div>
               <div className="text-[10px] text-[#8c8c8c] line-clamp-1 font-light">
                 {subTab === 'chat' ? item.lastMsg : item.subject}
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* Main Reading Area */}
      <div className="flex-1 flex flex-col relative bg-[#ffffff]">
        {!selectedMessage ? (
            <div className="flex-1 flex flex-col items-center justify-center text-[#d6ccc2]">
              <MessageSquare size={48} className="mb-4 opacity-20" />
              <p className="font-serif text-sm">請選擇一則訊息以閱讀</p>
            </div>
        ) : (
            <div className="flex-1 flex flex-col h-full">
                {/* Header */}
                <div className="h-16 border-b border-[#f0f0f0] flex items-center justify-between px-6 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        {subTab === 'chat' ? (
                            <div className="w-8 h-8 rounded-full bg-[#e0dad0] flex items-center justify-center text-[#5c5c5c] font-bold">
                                {selectedMessage.name[0]}
                            </div>
                        ) : (
                            <div className="p-2 bg-[#f4f1ea] rounded-full text-[#6b6b6b]"><Mail size={16}/></div>
                        )}
                        <div>
                            <h3 className="font-bold text-[#4a4a4a] text-sm">
                                {subTab === 'chat' ? selectedMessage.name : selectedMessage.subject}
                            </h3>
                            {subTab !== 'chat' && (
                                <p className="text-[10px] text-[#9e9e9e]">
                                    寄件者: {selectedMessage.sender} {selectedMessage.email && `<${selectedMessage.email}>`}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {subTab !== 'chat' && (
                            <>
                                <button className="p-1.5 hover:bg-[#f7f5f0] rounded text-[#8c8c8c]"><Reply size={16}/></button>
                                <button className="p-1.5 hover:bg-[#f7f5f0] rounded text-[#8c8c8c]"><Trash2 size={16}/></button>
                            </>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-[#faf9f6]">
                    {subTab === 'chat' ? (
                        <div className="space-y-4">
                            {selectedMessage.history.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${msg.sender === 'me' ? 'bg-[#8da399] text-white rounded-br-none' : 'bg-[#ffffff] text-[#5c5c5c] rounded-bl-none border border-[#f0f0f0]'}`}>
                                        {msg.text}
                                        <div className={`text-[9px] mt-1 text-right ${msg.sender === 'me' ? 'text-white/70' : 'text-[#b0b0b0]'}`}>{msg.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white p-6 rounded-xl border border-[#f0f0f0] shadow-sm min-h-[300px]">
                            <div className="flex justify-between items-start mb-6 border-b border-[#f7f7f7] pb-4">
                                <div className="space-y-1">
                                    <div className="text-xs text-[#8c8c8c]"><span className="font-bold">收件者:</span> {selectedMessage.recipient || '我'}</div>
                                    <div className="text-xs text-[#8c8c8c]"><span className="font-bold">日期:</span> {selectedMessage.time}</div>
                                </div>
                            </div>
                            <div className="text-sm text-[#5c5c5c] leading-loose whitespace-pre-wrap font-light">
                                {selectedMessage.content}
                            </div>
                            {/* Mock Attachment */}
                            <div className="mt-8 pt-4 border-t border-[#f7f7f7]">
                                <div className="inline-flex items-center gap-2 p-2 border border-[#e0dad0] rounded-lg bg-[#f9f8f6] cursor-pointer hover:bg-[#f0f0f0]">
                                    <File size={16} className="text-[#8da399]"/>
                                    <span className="text-xs text-[#5c5c5c]">附件.pdf</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Input (Chat only) */}
                {subTab === 'chat' && (
                    <div className="p-4 bg-[#ffffff] border-t border-[#f0f0f0] flex gap-2 items-center">
                        <button className="p-2 text-[#b0b0b0] hover:text-[#8da399]"><Plus size={20}/></button>
                        <input type="text" placeholder="輸入訊息..." className="flex-1 bg-[#f9f8f6] border-none rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-[#8da399] text-[#5c5c5c]"/>
                        <button className="p-2 bg-[#8da399] text-white rounded-full hover:bg-[#7a8f85]"><SendIcon size={16}/></button>
                    </div>
                )}
            </div>
        )}
        
        {/* Floating Action Button (Speed Dial) */}
        <div className="absolute bottom-8 right-8 flex flex-col items-end gap-3">
           {isFabOpen && (
             <>
               <button onClick={() => onCompose({ type: 'email' })} className="flex items-center gap-2 bg-[#f4f1ea] px-3 py-1.5 rounded-full shadow-md text-[#5c5c5c] text-xs font-bold hover:bg-[#e8e4db] animate-in slide-in-from-bottom-2">
                 <Mail size={14}/> 撰寫郵件
               </button>
               <button onClick={() => onCompose({ type: 'message' })} className="flex items-center gap-2 bg-[#f4f1ea] px-3 py-1.5 rounded-full shadow-md text-[#5c5c5c] text-xs font-bold hover:bg-[#e8e4db] animate-in slide-in-from-bottom-2">
                 <MessageSquare size={14}/> 撰寫訊息
               </button>
             </>
           )}
           <button 
             onClick={() => setIsFabOpen(!isFabOpen)}
             className={`w-12 h-12 bg-[#8da399] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all hover:bg-[#7a8f85] ${isFabOpen ? 'rotate-45' : ''}`}
           >
             <Plus size={24} />
           </button>
        </div>
      </div>
    </div>
  );
};

// --- TAB 5: GRADES (成績查看) ---
const GradebookView = () => {
  const [currentSemester, setCurrentSemester] = useState('114-2');
  const [expandedCourses, setExpandedCourses] = useState([]); // Track expanded IDs
  const [showDistribution, setShowDistribution] = useState(null); 
  const [showCalculator, setShowCalculator] = useState(null); // Changed to store course calculation data
  const courses = COURSES_DATA[currentSemester] || [];

  const toggleCourse = (id) => {
    setExpandedCourses(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const getMockScores = (courseId) => {
    const hash = courseId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const score = 60 + (hash % 40); 
    const isHidden = (hash % 5) === 0; // Randomly hide some distributions
    // Generate dynamic five-number summary based on score
    const fiveSummary = {
        top: Math.min(100, score + 15),
        front: Math.min(100, score + 8),
        avg: score - 2,
        back: Math.max(0, score - 10),
        bottom: Math.max(0, score - 20)
    };

    // Generate assignments for calculation
    const assignments = [
        { name: '作業一', weight: 10, score: Math.min(100, score + 5) },
        { name: '作業二', weight: 10, score: Math.min(100, score + 2) },
        { name: '課堂參與', weight: 10, score: 90 }
    ];
    const midterm = { weight: 30, score: Math.min(100, score - 5) };
    const final = { weight: 40, score: score > 90 ? '--' : Math.min(100, score + 2) };

    return {
      total: score,
      assignments,
      midterm,
      final,
      // Mapping old properties for compatibility
      assignment: assignments[0].score, 
      isHidden,
      rank: Math.floor((100 - score) / 2) + 1,
      midtermRank: Math.floor((100 - score) / 2) + 3,
      finalRank: Math.floor((100 - score) / 2) + 2,
      fiveSummary
    };
  };

  // Calculate Historical Stats (All semesters)
  const historicalStats = useMemo(() => {
    let totalScore = 0;
    let totalCredits = 0;
    Object.values(COURSES_DATA).forEach(semesterCourses => {
      semesterCourses.forEach(course => {
        const scores = getMockScores(course.id);
        totalScore += scores.total * 3; 
        totalCredits += 3;
      });
    });
    return {
      avg: totalCredits ? (totalScore / totalCredits).toFixed(1) : 0,
      credits: totalCredits,
      title: '歷年總成績分佈',
      isHidden: false,
      isHistorical: true,
      fiveSummary: { top: 92, front: 85, avg: 78, back: 70, bottom: 60 },
      rank: 5, // Mock rank
      totalRank: 42 // Added Total Rank
    };
  }, []);

  // Determine user relative position string
  const getUserPosition = (score, fiveSummary, isHidden) => {
    if (isHidden) return "";
    if (score >= fiveSummary.top) return "您的成績位於 頂標 以上";
    if (score >= fiveSummary.front) return "您的成績位於 前標 與 頂標 之間";
    if (score >= fiveSummary.avg) return "您的成績位於 均標 與 前標 之間";
    if (score >= fiveSummary.back) return "您的成績位於 後標 與 均標 之間";
    return "您的成績位於 底標 與 後標 之間";
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
       
       {/* 1. Historical Summary Block */}
       <div 
         className="bg-[#8da399] rounded-2xl p-6 text-white mb-6 shadow-md flex justify-between items-center relative overflow-hidden cursor-pointer hover:brightness-105 transition-all"
         onClick={() => setShowDistribution(historicalStats)}
       >
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div>
             <h3 className="text-xs font-bold text-white/80 uppercase tracking-widest mb-1 flex items-center gap-1">
               歷年學業總覽 <TrendingUp size={12}/>
             </h3>
             <div className="flex items-end gap-4">
                <div>
                   <span className="text-4xl font-serif font-bold">{historicalStats.avg}</span>
                   <span className="text-xs text-white/70 ml-1">累積平均</span>
                </div>
                <div className="h-8 w-px bg-white/30 mx-2"></div>
                <div>
                   <span className="text-2xl font-serif font-bold">{historicalStats.credits}</span>
                   <span className="text-xs text-white/70 ml-1">實得學分</span>
                </div>
                <div className="h-8 w-px bg-white/30 mx-2"></div>
                <div>
                    <span className="text-2xl font-serif font-bold">#{historicalStats.rank}</span>
                    <span className="text-xs text-white/70 ml-1">系排名</span>
                </div>
                {/* NEW: Total Rank */}
                <div className="h-8 w-px bg-white/30 mx-2"></div>
                <div>
                    <span className="text-2xl font-serif font-bold">#{historicalStats.totalRank}</span>
                    <span className="text-xs text-white/70 ml-1">總排名</span>
                </div>
             </div>
          </div>
          <Award size={48} className="text-white/20"/>
       </div>

       {/* 2. Semester Selector & Warning Badge */}
       <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-lg font-bold text-[#4a4a4a]">學期成績明細</h2>
            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg border border-red-100 flex items-center gap-1 animate-pulse">
              <AlertTriangle size={12}/> 預警中：性格心理學
            </span>
          </div>
          <div className="relative">
            <select 
              value={currentSemester} 
              onChange={(e) => setCurrentSemester(e.target.value)}
              className="appearance-none bg-[#fdfcfb] border border-[#d6ccc2] text-[#5c5c5c] py-1.5 pl-3 pr-8 rounded-full font-bold shadow-sm cursor-pointer hover:bg-[#f7f5f0] text-sm"
            >
               {SEMESTERS.map(s => <option key={s} value={s}>{s} 學期</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 text-[#8c8c8c] pointer-events-none" size={14}/>
          </div>
       </div>

       <div className="space-y-3 overflow-y-auto pb-10 custom-scrollbar pr-2 flex-1">
         {courses.length === 0 ? (
           <div className="p-8 text-center text-[#b0b0b0] border-2 border-dashed border-[#e0dad0] rounded-2xl">尚無成績資料</div>
         ) : (
           courses.map(course => {
             const scores = getMockScores(course.id);
             const isExpanded = expandedCourses.includes(course.id);
             
             return (
               <Card key={course.id} className={`overflow-hidden border border-[#f0f0f0] shadow-sm transition-all ${isExpanded ? 'ring-1 ring-[#d6ccc2]' : ''}`}>
                 {/* Collapsible Header */}
                 <div 
                   className="p-4 flex justify-between items-center cursor-pointer hover:bg-[#faf9f6] transition-colors"
                   onClick={() => toggleCourse(course.id)}
                 >
                    <div className="flex items-center gap-3">
                       <div className={`w-1 h-8 rounded-full ${course.style.cover}`}></div>
                       <div>
                         <h3 className="font-serif font-bold text-[#4a4a4a] text-base">{course.name}</h3>
                         <div className="text-[10px] text-[#9e9e9e] flex items-center gap-2 mt-0.5">
                            <span className="bg-[#f7f5f0] px-1.5 py-0.5 rounded border border-[#e0dad0]">{course.type}</span>
                            <span>{course.professor}</span>
                         </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       {/* Calculator Trigger */}
                       <div 
                         className="text-right group cursor-pointer" 
                         onClick={(e) => { 
                           e.stopPropagation(); 
                           setShowCalculator({ title: `${course.name} 成績計算細則`, ...scores });
                         }}
                       >
                          <div className="text-xl font-serif font-bold text-[#8da399] group-hover:text-[#7a8f85] transition-colors">{scores.total}</div>
                          <div className="text-[9px] text-[#b0b0b0] underline decoration-dotted">目前積分 (點擊查看)</div>
                       </div>
                       
                       {/* Distribution Trigger */}
                       <div 
                          className="p-2 rounded-full hover:bg-[#f0eadd] text-[#b0b0b0] hover:text-[#8a7a5c] cursor-pointer transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDistribution({title: `${course.name} - 總成績分佈`, score: scores.total, fiveSummary: scores.fiveSummary, ...scores});
                          }}
                          title="查看五標與分佈"
                       >
                          <BarChart2 size={18} />
                       </div>

                       {isExpanded ? <ChevronUp size={18} className="text-[#b0b0b0]"/> : <ChevronDown size={18} className="text-[#b0b0b0]"/>}
                    </div>
                 </div>

                 {/* Expanded Details */}
                 {isExpanded && (
                   <div className="px-5 pb-5 pt-2 bg-[#fcfcfc] border-t border-[#f7f7f7] animate-in slide-in-from-top-2">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                         <div className="p-3 bg-[#ffffff] border border-[#f0f0f0] rounded-xl text-center cursor-pointer hover:border-[#d6ccc2]" onClick={() => setShowDistribution({title: '期中考分佈', score: scores.midterm.score, fiveSummary: { top: 90, front: 80, avg: 70, back: 60, bottom: 50 }, ...scores})}>
                            <div className="text-[10px] text-[#9e9e9e] mb-1">期中考</div>
                            <div className="text-lg font-bold text-[#5c5c5c]">{scores.midterm.score}</div>
                            <div className="text-[9px] text-[#b0b0b0] mt-1">排名 {scores.midtermRank}</div>
                         </div>
                         <div className="p-3 bg-[#ffffff] border border-[#f0f0f0] rounded-xl text-center cursor-pointer hover:border-[#d6ccc2]" onClick={() => setShowDistribution({title: '期末考分佈', score: scores.final.score, fiveSummary: { top: 88, front: 78, avg: 68, back: 58, bottom: 48 }, ...scores})}>
                            <div className="text-[10px] text-[#9e9e9e] mb-1">期末考</div>
                            <div className="text-lg font-bold text-[#5c5c5c]">{scores.final.score}</div>
                            <div className="text-[9px] text-[#b0b0b0] mt-1">排名 {scores.finalRank}</div>
                         </div>
                      </div>
                      
                      <div>
                         <h4 className="text-[10px] font-bold text-[#b0b0b0] uppercase tracking-widest mb-2 flex items-center"><FileText size={12} className="mr-1"/> 平時作業細項</h4>
                         <div className="space-y-2">
                            {scores.assignments.map((hw, i) => (
                              <div key={i} className="flex justify-between items-center p-2 bg-[#ffffff] border border-[#f7f7f7] rounded-lg text-xs cursor-pointer hover:bg-[#faf9f6]" onClick={() => setShowDistribution({title: `${hw.name} 分佈`, score: hw.score, fiveSummary: { top: 95, front: 85, avg: 75, back: 65, bottom: 55 }, ...scores})}>
                                 <span className="text-[#5c5c5c] font-medium">{hw.name}</span>
                                 <div className="flex items-center gap-3">
                                    <span className="text-[#9e9e9e] text-[10px]">排名 {Math.floor(Math.random()*10)+1}</span>
                                    <span className="font-bold text-[#4a4a4a]">{hw.score}</span>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                 )}
               </Card>
             );
           })
         )}
       </div>

       {/* Distribution Modal */}
       <Modal isOpen={!!showDistribution} onClose={() => setShowDistribution(null)} title={showDistribution?.title || '成績分佈'}>
          {showDistribution?.isHidden ? (
             <div className="flex flex-col items-center justify-center py-10 text-[#b0b0b0]">
                <EyeOff size={48} className="mb-4 opacity-50"/>
                <p className="font-bold text-base">教師已隱藏成績分佈</p>
                <p className="text-xs mt-2">此課程不公開排名與五標資訊</p>
             </div>
          ) : (
             <div className="space-y-6">
                {/* 5-Number Summary */}
                <div className="bg-[#faf9f6] p-4 rounded-xl flex justify-between text-center">
                   {[
                     { l: '頂標', v: showDistribution?.fiveSummary?.top || 88 }, 
                     { l: '前標', v: showDistribution?.fiveSummary?.front || 76 }, 
                     { l: '均標', v: showDistribution?.fiveSummary?.avg || 65 }, 
                     { l: '後標', v: showDistribution?.fiveSummary?.back || 52 }, 
                     { l: '底標', v: showDistribution?.fiveSummary?.bottom || 40 }
                   ].map(stat => (
                     <div key={stat.l}>
                        <div className="text-[10px] text-[#9e9e9e] mb-1">{stat.l}</div>
                        <div className="font-serif font-bold text-[#5c5c5c] text-lg">{stat.v}</div>
                     </div>
                   ))}
                </div>

                {/* Conditional Rendering: Historical Trend vs Distribution Chart */}
                {showDistribution?.isHistorical ? (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-[#b0b0b0] uppercase tracking-widest mb-2 flex items-center"><TrendingUp size={12} className="mr-1"/> 排名走勢 (近四學期)</h4>
                    <div className="h-40 w-full relative border-l border-b border-[#e0dad0] flex items-end justify-between px-4 pb-0">
                       {/* SVG Trend Line */}
                       <svg className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none" style={{zIndex: 0}}>
                          <polyline 
                             fill="none" 
                             stroke="#dcb5b5" 
                             strokeWidth="3" 
                             points="
                               20,120
                               120,90
                               220,60
                               320,60
                             "
                          />
                       </svg>
                       {/* Points */}
                       {['113-1', '113-2', '114-1', '114-2'].map((sem, i) => {
                         const rank = [10, 8, 5, 5][i]; 
                         const yPos = (rank / 15) * 100; // approximation
                         return (
                           <div key={sem} className="flex flex-col items-center group relative z-10">
                              <div className="w-3 h-3 bg-[#8c5e5e] rounded-full border-2 border-white shadow-sm mb-2" style={{marginBottom: `${(15-rank)*10}px`}}></div>
                              <span className="text-[10px] text-[#b0b0b0] mt-1">{sem}</span>
                              <div className="absolute -top-16 text-xs font-bold text-[#8c5e5e] bg-white px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{top: `${140 - (15-rank)*10}px`}}>#{rank}</div>
                           </div>
                         )
                       })}
                    </div>
                    <div className="text-center text-[10px] text-[#8da399] mt-2 bg-[#8da399]/10 py-2 rounded-lg">
                       恭喜！您的排名呈現穩定上升趨勢
                    </div>
                  </div>
                ) : (
                  <div className="h-40 flex items-end justify-between space-x-2 text-[10px] text-[#8c8c8c] px-2">
                      {[5, 12, 35, 20, 8].map((h, i) => (
                        <div key={i} className="w-full flex flex-col items-center group relative">
                           <div className="w-full bg-[#f0f0f0] rounded-t-md relative group-hover:bg-[#dbe4ea] transition-all" style={{height: `${h*3}px`}}></div>
                           <span className="mt-2 text-[#b0b0b0]">{['<60','60-69','70-79','80-89','90+'][i]}</span>
                        </div>
                      ))}
                  </div>
                )}
                
                {/* Score Position Text (Only for non-historical views) */}
                {!showDistribution?.isHistorical && showDistribution?.score && showDistribution?.fiveSummary && (
                  <div className="text-center pt-4 border-t border-[#f0f0f0]">
                     <p className="text-sm font-bold text-[#8da399] bg-[#8da399]/10 py-2 rounded-lg">
                       {getUserPosition(showDistribution.score, showDistribution.fiveSummary, showDistribution.isHidden)}
                     </p>
                  </div>
                )}
             </div>
          )}
       </Modal>

       {/* Calculation Breakdown Modal */}
       <Modal isOpen={!!showCalculator} onClose={() => setShowCalculator(null)} title={showCalculator?.title}>
          {showCalculator && (
              <div className="space-y-4">
                  <div className="bg-[#f9f8f6] p-4 rounded-xl border border-[#e0dad0]">
                      <div className="flex justify-between text-xs font-bold text-[#b0b0b0] mb-2 border-b border-[#e0dad0] pb-1">
                          <span>項目</span>
                          <span className="w-12 text-right">權重</span>
                          <span className="w-12 text-right">得分</span>
                          <span className="w-12 text-right">折算</span>
                      </div>
                      {showCalculator.assignments.map((hw, i) => (
                          <div key={i} className="flex justify-between text-sm text-[#5c5c5c] py-1">
                              <span>{hw.name}</span>
                              <span className="w-12 text-right">{hw.weight}%</span>
                              <span className="w-12 text-right">{hw.score}</span>
                              <span className="w-12 text-right font-bold">{(hw.score * hw.weight / 100).toFixed(1)}</span>
                          </div>
                      ))}
                      {/* Midterm */}
                      <div className="flex justify-between text-sm text-[#5c5c5c] py-1">
                          <span>期中考</span>
                          <span className="w-12 text-right">{showCalculator.midterm.weight}%</span>
                          <span className="w-12 text-right">{showCalculator.midterm.score}</span>
                          <span className="w-12 text-right font-bold">{(showCalculator.midterm.score * showCalculator.midterm.weight / 100).toFixed(1)}</span>
                      </div>
                      {/* Final */}
                      <div className="flex justify-between text-sm text-[#5c5c5c] py-1">
                          <span>期末考</span>
                          <span className="w-12 text-right">{showCalculator.final.weight}%</span>
                          <span className="w-12 text-right">{showCalculator.final.score === '--' ? '-' : showCalculator.final.score}</span>
                          <span className="w-12 text-right font-bold">{showCalculator.final.score === '--' ? '0.0' : (showCalculator.final.score * showCalculator.final.weight / 100).toFixed(1)}</span>
                      </div>
                      <div className="border-t border-[#e0dad0] mt-2 pt-2 flex justify-between items-center">
                          <span className="font-bold text-[#4a4a4a]">目前總計</span>
                          <span className="text-xl font-serif font-bold text-[#8da399]">{showCalculator.total}</span>
                      </div>
                  </div>
                  <p className="text-xs text-[#9e9e9e] text-center">
                      * 若期末考尚未登錄，總分將不包含期末考佔比。
                  </p>
              </div>
          )}
       </Modal>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [showProfile, setShowProfile] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [composeData, setComposeData] = useState(null); 
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) setShowNotifications(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigateToCourse = (course) => {
    setSelectedCourse(course);
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar': return <CalendarView onComposeMessage={setComposeData}/>;
      case 'schedule': return <ScheduleView onNavigateToCourse={handleNavigateToCourse} />;
      case 'dashboard': return <CourseDashboard selectedCourse={selectedCourse} onBack={() => setActiveTab('schedule')} onComposeMessage={setComposeData} />;
      case 'messages': return <MessageCenter onCompose={setComposeData} />;
      case 'grades': return <GradebookView />;
      default: return null;
    }
  };

  const NAV_ITEMS = [
    { id: 'calendar', icon: CalendarIcon, l: '行事曆' },
    { id: 'schedule', icon: Clock, l: '課表' },
    { id: 'dashboard', icon: BookOpen, l: '課程' },
    { id: 'messages', icon: MessageSquare, l: '訊息' },
    { id: 'grades', icon: BarChart2, l: '成績' },
  ];

  return (
    <div className="flex h-screen bg-[#f9f8f6] text-[#4a4a4a] font-sans overflow-hidden selection:bg-[#d6cfc7] selection:text-white">
      
      {/* Sidebar */}
      <aside className="w-20 bg-[#ffffff] border-r border-[#f0f0f0] flex flex-col items-center py-6 z-20 shadow-sm">
        {/* Logo Section with ecourse3 text */}
        <div className="mb-8 flex flex-col items-center gap-1">
           <div className="p-2.5 bg-[#f7f5f0] rounded-xl text-[#8da399]">
             <BookOpen size={24} strokeWidth={1.5}/>
           </div>
           <span className="text-[10px] font-bold text-[#8da399] tracking-widest font-serif">ecourse3</span>
        </div>
        
        <nav className="flex-1 space-y-4 w-full px-2">
          {NAV_ITEMS.map(item => (
            <button 
              key={item.id} 
              onClick={() => {
                setActiveTab(item.id);
                // Fix: Clear selectedCourse when clicking "Course" tab to show the dashboard grid
                if (item.id === 'dashboard') {
                  setSelectedCourse(null);
                }
              }}
              className={`w-full flex flex-col items-center justify-center p-2.5 rounded-xl transition-all duration-300 group relative ${activeTab === item.id ? 'text-[#8da399] bg-[#f0eadd]/50' : 'text-[#b0b0b0] hover:text-[#8c8c8c] hover:bg-[#fcfcfc]'}`}
            >
              <item.icon size={20} strokeWidth={1.5} className={`mb-1 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-105'}`}/>
              <span className="text-[9px] font-medium tracking-widest">{item.l}</span>
              {activeTab === item.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#8da399] rounded-r-full"></div>}
            </button>
          ))}
        </nav>
        
        {/* Settings Only */}
        <div className="mt-auto flex flex-col items-center gap-4">
           <button className="p-2.5 text-[#b0b0b0] hover:text-[#4a4a4a] transition-colors rounded-full hover:bg-[#f7f5f0]">
             <Settings size={20} strokeWidth={1.5}/>
           </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col relative min-w-0 bg-[#f9f8f6]">
        <header className="h-16 flex items-center justify-between px-8 z-40">
           <div className="flex flex-col">
             <h2 className="font-serif text-xl font-bold text-[#4a4a4a] tracking-tight">
               {activeTab === 'dashboard' ? 'Course Dashboard' : activeTab === 'calendar' ? 'Calendar' : activeTab === 'schedule' ? 'Schedule' : activeTab === 'messages' ? 'Messages' : 'Grades'}
             </h2>
             <span className="text-[9px] font-bold text-[#b0b0b0] tracking-[0.2em] uppercase mt-0.5">Academic Year 114</span>
           </div>
           <div className="flex items-center gap-4">
              <div className="relative" ref={notificationRef}>
                <button onClick={() => setShowNotifications(!showNotifications)} className={`relative p-1.5 transition-colors ${showNotifications ? 'text-[#8da399]' : 'text-[#b0b0b0] hover:text-[#4a4a4a]'}`}>
                  <Bell size={20} strokeWidth={1.5} />
                  <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#dcb5b5] rounded-full border-2 border-[#f9f8f6]"></span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-10 w-72 bg-[#ffffff] rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-[#f0f0f0] overflow-hidden animate-in fade-in zoom-in-95 z-50 p-2">
                    <div className="text-[10px] font-bold text-[#b0b0b0] uppercase tracking-widest px-3 py-2 border-b border-[#f7f5f0]">Notifications</div>
                    {MOCK_NOTIFICATIONS.map(notif => (
                      <div key={notif.id} className="p-3 hover:bg-[#faf9f6] rounded-lg cursor-pointer transition-colors relative">
                        {!notif.read && <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#dcb5b5]"></div>}
                        <div className="text-xs font-bold text-[#5c5c5c] mb-0.5">{notif.title}</div>
                        <div className="text-[10px] text-[#9e9e9e]">{notif.time}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={() => setShowProfile(true)} className="flex items-center space-x-3 group cursor-pointer">
                <div className="text-right hidden md:block">
                  <div className="text-xs font-bold text-[#4a4a4a] group-hover:text-[#8da399] transition-colors">{CURRENT_USER.name}</div>
                  <div className="text-[10px] text-[#9e9e9e] tracking-wider">{CURRENT_USER.studentId}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#e0dad0] p-0.5 shadow-sm overflow-hidden group-hover:ring-2 ring-[#8da399]/50 transition-all">
                   <img src={CURRENT_USER.avatar} alt="User" className="bg-[#fdfcfb] rounded-full" />
                </div>
              </button>
              {/* Logout Button moved to Header */}
              <button 
                className="text-[#b0b0b0] hover:text-[#8c5e5e] transition-colors"
                title="登出"
                onClick={() => alert("您已登出系統")}
              >
                <LogOut size={20} strokeWidth={1.5} />
              </button>
           </div>
        </header>

        <div className="flex-1 overflow-hidden px-8 pb-6">
           <div className="h-full w-full animate-in fade-in duration-500">{renderContent()}</div>
        </div>
      </main>

      {/* Compose Modal */}
      <Modal isOpen={!!composeData} onClose={() => setComposeData(null)} title={composeData?.type === 'email' ? "撰寫信件" : "傳送訊息"}>
         <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-[#b0b0b0] mb-1.5 uppercase tracking-widest">收件者</label>
              {composeData?.to ? (
                <div className="flex items-center space-x-2 p-2 bg-[#f0eadd]/50 text-[#8a7a5c] rounded-lg border border-[#e0d6c1]">
                   <User size={14}/> <span className="font-bold text-xs">{composeData.to}</span>
                   <button onClick={() => setComposeData({...composeData, to: null})} className="ml-auto hover:bg-[#e0d6c1] rounded-full p-1"><X size={12}/></button>
                </div>
              ) : (
                <div className="relative">
                   <select className="w-full p-2.5 border border-[#e0dad0] rounded-xl appearance-none bg-[#fdfcfb] font-medium text-xs text-[#5c5c5c] focus:outline-none focus:border-[#8da399]">
                     <option value="">智慧搜尋聯絡人 (輸入課程或姓名)...</option>
                     {CONTACTS_MOCK.map(c => <option key={c.id} value={c.name}>{c.name} ({c.role})</option>)}
                   </select>
                   <ChevronDown className="absolute right-3 top-3 text-[#b0b0b0] pointer-events-none" size={14}/>
                </div>
              )}
            </div>

            {composeData?.type === 'email' && (
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-[#b0b0b0] mb-1.5 uppercase tracking-widest">主旨</label>
                <input type="text" defaultValue={composeData?.context ? `關於：${composeData.context}` : ''} className="p-2.5 border border-[#e0dad0] rounded-xl bg-[#fdfcfb] text-[#5c5c5c] text-xs focus:outline-none focus:border-[#8da399]" />
              </div>
            )}

            <div className="flex flex-col">
               <label className="text-[10px] font-bold text-[#b0b0b0] mb-1.5 uppercase tracking-widest">內容</label>
               <textarea className="h-32 p-3 border border-[#e0dad0] rounded-xl bg-[#fdfcfb] text-[#5c5c5c] text-xs focus:outline-none focus:border-[#8da399] resize-none leading-relaxed" placeholder="請在此輸入您的訊息..."></textarea>
            </div>

            {composeData?.type === 'email' && (
               <div className="border border-dashed border-[#e0dad0] rounded-xl p-3 flex justify-center text-[#9e9e9e] cursor-pointer hover:bg-[#f7f5f0] transition-colors items-center gap-2">
                 <Paperclip size={14}/> <span className="text-xs">拖曳檔案至此或點擊上傳附件</span>
               </div>
            )}

            <div className="flex justify-end pt-2">
               <Button onClick={() => setComposeData(null)} variant="primary" icon={SendIcon} className="text-xs px-4 py-2">傳送</Button>
            </div>
         </div>
      </Modal>

      {/* User Profile Modal */}
      <Modal isOpen={showProfile} onClose={() => setShowProfile(false)} title="個人資料">
        <div className="flex flex-col items-center mb-6">
           <div className="w-24 h-24 bg-[#f2f0e9] rounded-full mb-3 overflow-hidden shadow-inner p-1">
              <img src={CURRENT_USER.avatar} alt="User" className="w-full h-full object-cover bg-white rounded-full" />
           </div>
           <button className="text-xs text-[#8da399] font-bold hover:underline">更換大頭貼</button>
        </div>
        <div className="space-y-4">
           {[{ l: '姓名', v: CURRENT_USER.name }, { l: '系所', v: CURRENT_USER.dept }, { l: '學號', v: CURRENT_USER.studentId }, { l: '信箱', v: CURRENT_USER.email }].map((field, i) => (
             <div key={i} className="flex flex-col">
               <label className="text-[10px] font-bold text-[#b0b0b0] uppercase tracking-widest mb-1">{field.l}</label>
               <input type="text" value={field.v} readOnly className="w-full p-2.5 bg-[#f7f5f0] border-none rounded-xl text-[#5c5c5c] text-sm font-medium focus:ring-0" />
             </div>
           ))}
        </div>
        <div className="mt-6 flex justify-end">
           <Button onClick={() => setShowProfile(false)} variant="primary" className="text-xs">儲存變更</Button>
        </div>
      </Modal>

    </div>
  );
};

export default App;
