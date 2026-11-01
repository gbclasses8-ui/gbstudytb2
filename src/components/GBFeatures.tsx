import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  KeyRound,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Award,
  BookOpen,
  GraduationCap,
  FileText,
  LogOut,
  Send,
  Layers,
  Check,
  AlertCircle,
  RotateCcw,
  Sliders,
  ExternalLink
} from 'lucide-react';

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  imageUrl: string;
  linkText: string;
  actionType: 'batch' | 'test' | 'telegram' | 'link';
  targetId?: string;
  active: boolean;
}

export interface MockTest {
  id: string;
  title: string;
  classLevel: string;
  subject: string;
  durationMinutes: number;
  totalMarks: number;
  questionsCount: number;
  questions: {
    q: string;
    options: string[];
    correct: number;
    explanation?: string;
  }[];
}

const DEFAULT_SLIDES: CarouselSlide[] = [
  {
    id: 'slide-1',
    title: 'मैट्रिक परीक्षा 2026-27 टॉपर बैच',
    subtitle: 'Class 10th संपूर्ण सिलेबस, दैनिक लाइव क्लासेस, हस्तलिखित नोट्स और DPP',
    badge: '🔥 MOST POPULAR',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
    linkText: 'बैच में शामिल हों',
    actionType: 'batch',
    targetId: '697a0890f708feadceaf8e29',
    active: true
  },
  {
    id: 'slide-2',
    title: 'वरदान बैच - 12th Science & Arts 2026-27',
    subtitle: 'भौतिकी, रसायन, जीवविज्ञान, गणित व कला संकाय की सम्पूर्ण तैयारी',
    badge: '⭐ RECOMMENDED',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
    linkText: 'अभी पढ़ना शुरू करें',
    actionType: 'batch',
    targetId: '696f785373cd1e3b3306170c',
    active: true
  },
  {
    id: 'slide-3',
    title: 'GB STUDY फ्री ऑल-बिहार ऑनलाइन टेस्ट सीरीज',
    subtitle: 'लाइव टाइमर, ऑटो-स्कोरिंग और संपूर्ण व्याख्या के साथ परीक्षा जैसी तैयारी',
    badge: '📝 FREE MOCK TEST',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
    linkText: 'टेस्ट अभी दें',
    actionType: 'test',
    active: true
  },
  {
    id: 'slide-4',
    title: 'ऑफिशियल टेलीग्राम चैनल से तुरंत जुड़ें',
    subtitle: 'दैनिक क्लास लिंक, पीडीएफ नोट्स और परीक्षा के महत्वपूर्ण अलर्ट्स',
    badge: '📢 OFFICIAL CHANNEL',
    imageUrl: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1200&auto=format&fit=crop&q=80',
    linkText: 'टेलीग्राम चैनल खोलें',
    actionType: 'telegram',
    active: true
  }
];

const DEFAULT_TESTS: MockTest[] = [
  {
    id: 'test-1',
    title: 'Class 10th Science (विज्ञान) - प्रकाश का परावर्तन एवं अपवर्तन',
    classLevel: '10th',
    subject: 'विज्ञान (Science)',
    durationMinutes: 15,
    totalMarks: 20,
    questionsCount: 5,
    questions: [
      {
        q: 'प्रकाश की किरण गमन करती है:',
        options: ['सीधी रेखा में', 'टेढ़ी रेखा में', 'किसी भी दिशा में', 'इनमें से कोई नहीं'],
        correct: 0,
        explanation: 'प्रकाश हमेशा सीधी (सरल) रेखा में गमन करता है।'
      },
      {
        q: 'प्रकाश के परावर्तन के कितने नियम हैं?',
        options: ['1', '2', '3', '4'],
        correct: 1,
        explanation: 'प्रकाश के परावर्तन के दो नियम होते हैं।'
      },
      {
        q: 'दाढ़ी बनाने में कौन सा दर्पण उपयुक्त होता है?',
        options: ['समतल दर्पण', 'उत्तल दर्पण', 'अवतल दर्पण', 'इनमें से कोई नहीं'],
        correct: 2,
        explanation: 'अवतल दर्पण सीधा और बड़ा प्रतिबिम्ब बनाता है इसलिए इसका प्रयोग हजामत में होता है।'
      },
      {
        q: 'लेंस की क्षमता का SI मात्रक क्या होता है?',
        options: ['डाइऑप्टर (D)', 'ल्यूमेन', 'लक्स', 'एंग्स्ट्रॉम'],
        correct: 0,
        explanation: 'लेंस की क्षमता का SI मात्रक डाइऑप्टर (m⁻¹) होता है।'
      },
      {
        q: 'किसी उत्तल लेंस का फोकस दूरी 50 cm है, तो उसकी क्षमता होगी:',
        options: ['+5 D', '-5 D', '-2 D', '+2 D'],
        correct: 3,
        explanation: 'P = 100 / f = 100 / 50 = +2D'
      }
    ]
  },
  {
    id: 'test-2',
    title: 'Class 10th Social Science - यूरोप में राष्ट्रवाद',
    classLevel: '10th',
    subject: 'सामाजिक विज्ञान (Social Science)',
    durationMinutes: 15,
    totalMarks: 20,
    questionsCount: 4,
    questions: [
      {
        q: 'इटली एवं जर्मनी वर्तमान में किस महादेश के अंतर्गत आते हैं?',
        options: ['उत्तरी अमेरिका', 'दक्षिण अमेरिका', 'यूरोप', 'पश्चिमी एशिया'],
        correct: 2,
        explanation: 'इटली और जर्मनी दोनों यूरोप महादेश में स्थित हैं।'
      },
      {
        q: 'फ्रांस में किस शासन वंश की पुनर्स्थापना विएना कांग्रेस द्वारा की गई थी?',
        options: ['हेप्सबर्ग', 'आर्लिया वंश', 'बूर्बो वंश', 'जारशाही'],
        correct: 2,
        explanation: 'विएना कांग्रेस (1815) के द्वारा फ्रांस में बूर्बो वंश को पुनः स्थापित किया गया था।'
      },
      {
        q: 'मेजिनी का संबंध किस संगठन से था?',
        options: ['लाल सेना', 'कार्बोनरी', 'फिलिक हेटारिया', 'डाइट'],
        correct: 1,
        explanation: 'मेजिनी गुप्त क्रांतिकारी संगठन कार्बोनरी का सदस्य था।'
      },
      {
        q: 'जर्मन राइन राज्य का निर्माण किसने किया था?',
        options: ['लुई 18वां', 'नेपोलियन बोनापार्ट', 'नेपोलियन III', 'बिस्मार्क'],
        correct: 1,
        explanation: 'नेपोलियन बोनापार्ट ने 39 राज्यों का जर्मन राइन संघ बनाया था।'
      }
    ]
  },
  {
    id: 'test-3',
    title: 'Class 12th Physics - विद्युत आवेश तथा क्षेत्र (Electric Charges)',
    classLevel: '12th',
    subject: 'भौतिकी (Physics)',
    durationMinutes: 20,
    totalMarks: 25,
    questionsCount: 5,
    questions: [
      {
        q: 'विद्युत आवेश का SI मात्रक क्या होता है?',
        options: ['एम्पियर', 'कूलॉम (C)', 'वोल्ट', 'फैराडे'],
        correct: 1,
        explanation: 'विद्युत आवेश का SI मात्रक कूलॉम (Coulomb) है।'
      },
      {
        q: 'मुक्त आकाश की परावैद्युतता (ε₀) का मान होता है:',
        options: ['9 × 10⁹ N·m²/C²', '8.85 × 10⁻¹² F/m', '1.6 × 10⁻¹⁹ C', 'इनमें से कोई नहीं'],
        correct: 1,
        explanation: 'Permittivity of free space ε₀ = 8.854 × 10⁻¹² F/m.'
      },
      {
        q: 'एक स्थिर विद्युत आवेश उत्पन्न करता है:',
        options: ['केवल विद्युत क्षेत्र', 'केवल चुंबकीय क्षेत्र', 'दोनों क्षेत्र', 'कोई क्षेत्र नहीं'],
        correct: 0,
        explanation: 'स्थिर आवेश केवल विद्युत क्षेत्र उत्पन्न करता है जबकि गतिमान आवेश चुंबकीय क्षेत्र भी बनाता है।'
      },
      {
        q: 'विद्युत द्विध्रुव आघूर्ण का SI मात्रक क्या है?',
        options: ['कूलॉम × मीटर (C·m)', 'कूलॉम / मीटर', 'कूलॉम / मीटर²', 'कूलॉम · मीटर²'],
        correct: 0,
        explanation: 'Electric dipole moment p = q × 2a, मात्रक C·m होता है।'
      },
      {
        q: 'साबुन के बुलबुले को जब आवेशित किया जाता है, तो उसकी त्रिज्या:',
        options: ['बढ़ती है', 'घटती है', 'अपरिवर्तित रहती है', 'शून्य हो जाती है'],
        correct: 0,
        explanation: 'समान आवेशों में प्रतिकर्षण के कारण साबुन के बुलबुले की त्रिज्या फैलती है।'
      }
    ]
  }
];

export const GBStudyEnhancements: React.FC = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'all-course' | 'test' | 'my-batches' | 'owner'>('home');
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isAllCourseModalOpen, setIsAllCourseModalOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);

  // Logo 10-click Admin detector
  const [clickCount, setClickCount] = useState(0);
  const [showClickBadge, setShowClickBadge] = useState(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Admin Modal & State
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Carousel & Test Data
  const [slides, setSlides] = useState<CarouselSlide[]>(() => {
    try {
      const saved = localStorage.getItem('gb_study_carousel_banners');
      return saved ? JSON.parse(saved) : DEFAULT_SLIDES;
    } catch {
      return DEFAULT_SLIDES;
    }
  });

  const [tests, setTests] = useState<MockTest[]>(() => {
    try {
      const saved = localStorage.getItem('gb_study_mock_tests');
      return saved ? JSON.parse(saved) : DEFAULT_TESTS;
    } catch {
      return DEFAULT_TESTS;
    }
  });

  // Current Carousel index
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);

  // Active Test Exam Mode
  const [activeExam, setActiveExam] = useState<MockTest | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examTimeRemaining, setExamTimeRemaining] = useState(0);

  // New Banner Form (in Admin)
  const [newSlideTitle, setNewSlideTitle] = useState('');
  const [newSlideSubtitle, setNewSlideSubtitle] = useState('');
  const [newSlideBadge, setNewSlideBadge] = useState('🌟 NEW BATCH');
  const [newSlideImage, setNewSlideImage] = useState('');
  const [newSlideLinkText, setNewSlideLinkText] = useState('अभी देखें');
  const [newSlideAction, setNewSlideAction] = useState<'batch' | 'test' | 'telegram' | 'link'>('batch');

  // Sync slides to localStorage
  const saveSlides = (newSlides: CarouselSlide[]) => {
    setSlides(newSlides);
    try {
      localStorage.setItem('gb_study_carousel_banners', JSON.stringify(newSlides));
    } catch (e) {
      console.warn('Failed to save slides:', e);
    }
  };

  // Auto-play Carousel
  useEffect(() => {
    const activeSlides = slides.filter(s => s.active);
    if (activeSlides.length <= 1 || isAutoPlayPaused) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % activeSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [slides, isAutoPlayPaused]);

  // Exam Countdown Timer
  useEffect(() => {
    if (!activeExam || examSubmitted || examTimeRemaining <= 0) return;
    const timer = setInterval(() => {
      setExamTimeRemaining(prev => {
        if (prev <= 1) {
          setExamSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeExam, examSubmitted, examTimeRemaining]);

  // Global Logo 10-Click Hook
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if clicked element is GB STUDY Logo / Icon
      const isLogo =
        target.matches('img[alt*="GB STUDY"]') ||
        target.matches('.logo-fallback') ||
        target.closest('img[alt*="GB STUDY"]') ||
        target.closest('.logo-fallback') ||
        (target.innerText && target.innerText.includes('⚡') && target.closest('nav'));

      if (isLogo) {
        setClickCount(prev => {
          const next = prev + 1;
          setShowClickBadge(true);

          if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
          clickTimeoutRef.current = setTimeout(() => {
            setClickCount(0);
            setShowClickBadge(false);
          }, 3500);

          if (next >= 10) {
            setClickCount(0);
            setShowClickBadge(false);
            setIsAdminLoginOpen(true);
            setAdminError('');
          }
          return next;
        });
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  // Admin Login Verification
  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword.trim() === 'GBADMIN2026') {
      setIsAdminAuthenticated(true);
      setAdminError('');
      setAdminPassword('');
    } else {
      setAdminError('गलत पासवर्ड! कृपया सही एडमिन पासवर्ड (GBADMIN2026) दर्ज करें।');
    }
  };

  // Add Banner Handler
  const handleAddSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlideTitle.trim()) return;

    const newSlide: CarouselSlide = {
      id: `slide-${Date.now()}`,
      title: newSlideTitle.trim(),
      subtitle: newSlideSubtitle.trim() || 'GB STUDY - भारत का सर्वश्रेष्ठ ऑनलाइन लर्निंग प्लेटफॉर्म',
      badge: newSlideBadge.trim() || '🔥 ANNOUNCEMENT',
      imageUrl:
        newSlideImage.trim() ||
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
      linkText: newSlideLinkText.trim() || 'अभी देखें',
      actionType: newSlideAction,
      active: true
    };

    saveSlides([newSlide, ...slides]);
    setNewSlideTitle('');
    setNewSlideSubtitle('');
    setNewSlideImage('');
  };

  // Delete Banner Handler
  const handleDeleteSlide = (id: string) => {
    saveSlides(slides.filter(s => s.id !== id));
  };

  // Start Test Exam
  const handleStartExam = (test: MockTest) => {
    setActiveExam(test);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setExamSubmitted(false);
    setExamTimeRemaining(test.durationMinutes * 60);
    setIsTestModalOpen(false);
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (examSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    if (!activeExam) return { correct: 0, total: 0, percent: 0 };
    let correct = 0;
    activeExam.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) correct++;
    });
    const total = activeExam.questions.length;
    return {
      correct,
      total,
      percent: Math.round((correct / total) * 100)
    };
  };

  const activeSlides = slides.filter(s => s.active);
  const currentSlide = activeSlides[currentSlideIndex] || activeSlides[0];

  return (
    <>
      {/* 1. Tapping Counter Badge for Logo (Feedback when tapping towards 10 taps) */}
      {showClickBadge && clickCount > 2 && (
        <div className="fixed top-20 right-4 z-[9999] bg-blue-600/90 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-lg shadow-blue-500/30 backdrop-blur-md animate-bounce flex items-center gap-1.5 border border-blue-400/40">
          <KeyRound className="w-3.5 h-3.5 text-sky-200" />
          <span>Admin Tap: {clickCount} / 10</span>
        </div>
      )}

      {/* 2. Home Page Carousel Screen (Mounted directly onto home page) */}
      {activeSlides.length > 0 && (
        <div
          id="gb-home-carousel"
          className="w-full max-w-[90rem] mx-auto px-3 sm:px-6 mb-6"
          onMouseEnter={() => setIsAutoPlayPaused(true)}
          onMouseLeave={() => setIsAutoPlayPaused(false)}
        >
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-blue-500/20 bg-gradient-to-br from-[#0c1222] via-[#080d19] to-[#04060b] shadow-2xl shadow-blue-950/40">
            {/* Banner Background Image with Gradient Overlay */}
            <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden">
              <img
                src={currentSlide?.imageUrl}
                alt={currentSlide?.title}
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-700 ease-out brightness-[0.4]"
                onError={(e: any) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070b14] via-[#070b14]/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />

              {/* Slide Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-14 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-400 text-[11px] sm:text-xs font-black tracking-wider uppercase w-fit mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                  {currentSlide?.badge}
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-2 drop-shadow-md">
                  {currentSlide?.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-4 leading-relaxed max-w-lg">
                  {currentSlide?.subtitle}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (currentSlide?.actionType === 'test') {
                        setIsTestModalOpen(true);
                      } else if (currentSlide?.actionType === 'telegram') {
                        window.open('https://t.me/GBFreestudy', '_blank');
                      } else {
                        // Scroll down to batches
                        const target = document.querySelector('main');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all transform active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <span>{currentSlide?.linkText || 'अभी देखें'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsTestModalOpen(true)}
                    className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <span>ऑनलाइन टेस्ट</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            {activeSlides.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentSlideIndex(prev => (prev === 0 ? activeSlides.length - 1 : prev - 1))
                  }
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer active:scale-90"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentSlideIndex(prev => (prev + 1) % activeSlides.length)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer active:scale-90"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
                  {activeSlides.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentSlideIndex === idx ? 'w-6 bg-blue-500 shadow-md shadow-blue-500/50' : 'w-2 bg-white/30 hover:bg-white/60'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 3. Bottom Extra Floating Navigation Toolbar: [All Course] & [Test] in between My Batches & Owner */}
      <div className="fixed bottom-16 sm:bottom-20 right-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsAllCourseModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0c1222]/95 border border-blue-500/30 text-white hover:text-blue-400 font-bold text-xs shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer hover:border-blue-500/60"
          title="All Courses / सभी कोर्स"
        >
          <GraduationCap className="w-4 h-4 text-blue-400" />
          <span>All Course</span>
        </button>

        <button
          onClick={() => setIsTestModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 text-white font-extrabold text-xs shadow-xl shadow-blue-600/30 backdrop-blur-md transition-all active:scale-95 cursor-pointer hover:brightness-110"
          title="Online Mock Test Series / टेस्ट सीरीज"
        >
          <Award className="w-4 h-4 text-sky-200" />
          <span>Test Series</span>
        </button>
      </div>

      {/* 4. Admin Login / Password Modal (Triggered by 10 taps on GB STUDY Logo) */}
      {isAdminLoginOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-[#0f172a] border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-950/60 relative">
            <button
              onClick={() => {
                setIsAdminLoginOpen(false);
                setAdminError('');
                setAdminPassword('');
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              ✕
            </button>

            {!isAdminAuthenticated ? (
              <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-black text-white text-center font-display">
                  GB STUDY एडमिन कंट्रोल पैनल
                </h3>
                <p className="text-xs text-slate-400 text-center">
                  होमपेज बैनर कैरोसेल व टेस्ट सीरीज प्रबंधित करने हेतु एडमिन पासवर्ड दर्ज करें।
                </p>

                {adminError && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium text-center">
                    {adminError}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">एडमिन पासवर्ड (Password):</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={e => setAdminPassword(e.target.value)}
                      placeholder="Enter Admin Password..."
                      className="w-full bg-[#1e293b] border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all pr-10"
                      autoFocus
                    />
                    <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 transition-all cursor-pointer active:scale-95"
                >
                  एडमिन लॉगिन करें (Unlock Panel)
                </button>
              </form>
            ) : (
              /* Admin Control Dashboard */
              <div className="space-y-5 max-h-[80vh] overflow-y-auto pr-1">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                      <Sliders className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">GB STUDY एडमिन पैनल</h4>
                      <p className="text-[11px] text-emerald-400 font-semibold">● ऑथेंटिकेटेड (Authenticated)</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsAdminAuthenticated(false);
                      setIsAdminLoginOpen(false);
                    }}
                    className="p-1.5 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>लॉगआउट</span>
                  </button>
                </div>

                {/* Banner / Carousel Manager */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    होमपेज बैनर कैरोसेल जोड़ें (Add Carousel Slide)
                  </h5>

                  <form onSubmit={handleAddSlide} className="space-y-2.5 p-3.5 bg-black/40 border border-white/5 rounded-2xl">
                    <input
                      type="text"
                      placeholder="बैनर का मुख्य शीर्षक (Title)..."
                      value={newSlideTitle}
                      onChange={e => setNewSlideTitle(e.target.value)}
                      className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="उप-शीर्षक / विवरण (Subtitle)..."
                      value={newSlideSubtitle}
                      onChange={e => setNewSlideSubtitle(e.target.value)}
                      className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="बैनर इमेज URL (Direct Image Link)..."
                      value={newSlideImage}
                      onChange={e => setNewSlideImage(e.target.value)}
                      className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="बैज (e.g. ⭐ NEW BATCH)"
                        value={newSlideBadge}
                        onChange={e => setNewSlideBadge(e.target.value)}
                        className="bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="बटन टेक्स्ट (e.g. अभी देखें)"
                        value={newSlideLinkText}
                        onChange={e => setNewSlideLinkText(e.target.value)}
                        className="bg-[#1e293b] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>होमपेज कैरोसेल में नया बैनर जोड़ें</span>
                    </button>
                  </form>

                  {/* Active Banners List */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-bold text-slate-400 flex items-center justify-between">
                      <span>सक्रिय बैनर ({slides.length})</span>
                      <button
                        onClick={() => saveSlides(DEFAULT_SLIDES)}
                        className="text-sky-400 hover:underline flex items-center gap-1 text-[10px]"
                      >
                        <RotateCcw className="w-3 h-3" />
                        डिफ़ॉल्ट रीसेट करें
                      </button>
                    </div>

                    {slides.map((s, idx) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between gap-2 p-2.5 bg-[#1e293b]/60 border border-white/5 rounded-xl text-xs"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className="font-bold text-blue-400">#{idx + 1}</span>
                          <span className="text-white truncate font-medium">{s.title}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteSlide(s.id)}
                          className="text-rose-400 hover:text-rose-300 p-1 hover:bg-rose-500/10 rounded cursor-pointer shrink-0"
                          title="बैनर हटाएं"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsAdminLoginOpen(false);
                    }}
                    className="w-full py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 font-bold text-xs cursor-pointer"
                  >
                    एडमिन पैनल बंद करें
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Online Test Series Modal */}
      {isTestModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#0d1322] border border-blue-500/30 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-blue-950/60 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white font-display">
                    GB STUDY ऑनलाइन टेस्ट सीरीज
                  </h3>
                  <p className="text-xs text-slate-400">
                    मैट्रिक एवं इंटरमीडिएट बोर्ड परीक्षा के लिए फ्री ऑब्जेक्टिव टेस्ट
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsTestModalOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 cursor-pointer text-lg"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {tests.map(t => (
                <div
                  key={t.id}
                  className="p-4 rounded-2xl bg-[#141b2d] border border-blue-500/20 hover:border-blue-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase">
                        Class {t.classLevel}
                      </span>
                      <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span>{t.durationMinutes} मिनट</span>
                      </div>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white mb-1.5 line-clamp-2">
                      {t.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mb-3">
                      विषय: <span className="text-slate-200">{t.subject}</span> | प्रश्न: {t.questionsCount}
                    </p>
                  </div>

                  <button
                    onClick={() => handleStartExam(t)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>टेस्ट अभी शुरू करें</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3 rounded-2xl bg-blue-950/30 border border-blue-500/20 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
              <p className="text-[11px] text-slate-300 leading-relaxed">
                सभी टेस्ट बिहार बोर्ड एवं अन्य राज्य बोर्ड के नवीनतम परीक्षा पैटर्न पर आधारित हैं। टेस्ट सबमिट करते ही तुरंत स्कोर और व्याख्या प्राप्त होगी।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 6. Active Exam Live Test Simulator */}
      {activeExam && (
        <div className="fixed inset-0 z-[10000] flex flex-col bg-[#080d19] text-white">
          {/* Exam Header */}
          <div className="h-14 bg-[#0e1628] border-b border-white/10 px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="px-2 py-0.5 rounded-md bg-blue-600 text-[10px] font-black">
                {activeExam.classLevel}
              </span>
              <h4 className="text-xs sm:text-sm font-bold truncate">{activeExam.title}</h4>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {Math.floor(examTimeRemaining / 60)}:
                  {(examTimeRemaining % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <button
                onClick={() => setActiveExam(null)}
                className="text-xs text-slate-400 hover:text-white p-1 rounded cursor-pointer"
              >
                ✕ छोड़ें
              </button>
            </div>
          </div>

          {/* Exam Body */}
          <div className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 overflow-y-auto">
            {!examSubmitted ? (
              <div className="space-y-6">
                {/* Question Info */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>
                    प्रश्न {currentQuestionIndex + 1} / {activeExam.questions.length}
                  </span>
                  <span>प्रत्येक प्रश्न 4 अंक</span>
                </div>

                {/* Question Text */}
                <div className="p-5 rounded-2xl bg-[#11192e] border border-blue-500/20 text-sm sm:text-base font-bold text-white leading-relaxed">
                  {activeExam.questions[currentQuestionIndex].q}
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {activeExam.questions[currentQuestionIndex].options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 text-white font-bold shadow-lg shadow-blue-500/10'
                            : 'bg-[#0f172a] border-white/5 text-slate-300 hover:bg-[#152037] hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                              isSelected ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="text-xs sm:text-sm">{opt}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-400" />}
                      </button>
                    );
                  })}
                </div>

                {/* Exam Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    ← पिछला
                  </button>

                  {currentQuestionIndex < activeExam.questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
                    >
                      अगला प्रश्न →
                    </button>
                  ) : (
                    <button
                      onClick={() => setExamSubmitted(true)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/20 cursor-pointer"
                    >
                      टेस्ट सबमिट करें (Submit) ✓
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Score Card & Review */
              <div className="space-y-6 animate-in zoom-in-95">
                {(() => {
                  const score = calculateScore();
                  return (
                    <div className="text-center p-6 sm:p-8 bg-gradient-to-b from-[#111c38] to-[#0d1424] border border-blue-500/30 rounded-3xl shadow-2xl">
                      <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mx-auto mb-3">
                        <Award className="w-8 h-8 text-blue-400" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
                        टेस्ट परिणाम (Test Result)
                      </h3>
                      <p className="text-xs text-slate-400 mb-4">{activeExam.title}</p>

                      <div className="flex items-center justify-center gap-6 my-5">
                        <div className="text-center">
                          <span className="text-2xl sm:text-3xl font-black text-blue-400">
                            {score.correct} / {score.total}
                          </span>
                          <p className="text-[11px] text-slate-400">सही उत्तर</p>
                        </div>
                        <div className="w-px h-10 bg-white/10" />
                        <div className="text-center">
                          <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                            {score.percent}%
                          </span>
                          <p className="text-[11px] text-slate-400">सटीकता (Accuracy)</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-3 pt-4">
                        <button
                          onClick={() => {
                            setSelectedAnswers({});
                            setExamSubmitted(false);
                            setCurrentQuestionIndex(0);
                            setExamTimeRemaining(activeExam.durationMinutes * 60);
                          }}
                          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer"
                        >
                          पुनः टेस्ट दें (Retake)
                        </button>
                        <button
                          onClick={() => setActiveExam(null)}
                          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
                        >
                          होम पर जाएं
                        </button>
                      </div>
                    </div>
                  );
                })()}

                {/* Question Review */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-sm font-bold text-slate-300">प्रश्नों का विवरण एवं सही उत्तर (Answers):</h4>
                  {activeExam.questions.map((q, qIdx) => {
                    const userAns = selectedAnswers[qIdx];
                    const isCorrect = userAns === q.correct;
                    return (
                      <div
                        key={qIdx}
                        className={`p-4 rounded-2xl border ${
                          isCorrect ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-rose-950/20 border-rose-500/30'
                        }`}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <span className="font-bold text-xs text-blue-400">Q{qIdx + 1}.</span>
                          <span className="text-xs sm:text-sm font-semibold text-white">{q.q}</span>
                        </div>
                        <div className="text-xs space-y-1 pl-5">
                          <p className="text-slate-300">
                            आपका उत्तर:{' '}
                            <span className={isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                              {userAns !== undefined ? q.options[userAns] : 'अनुत्तरित (Unanswered)'}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-emerald-400">
                              सही उत्तर: <span className="font-bold">{q.options[q.correct]}</span>
                            </p>
                          )}
                          {q.explanation && (
                            <p className="text-slate-400 text-[11px] pt-1">💡 {q.explanation}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. All Course Catalog Modal */}
      {isAllCourseModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#0d1322] border border-blue-500/30 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-blue-950/60 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white font-display">
                    GB STUDY संपूर्ण कोर्स डायरेक्टरी (All Courses)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Class 9th, 10th, 11th, 12th, CUET व पॉलिटेक्निक के सभी बैच
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAllCourseModalOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 cursor-pointer text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Class 10th Matric 2026-27 (टॉपर बैच)', count: 'सम्पूर्ण 6 विषय + Topper Notes' },
                { name: 'Class 12th Science 2026-27 (वरदान बैच)', count: 'Physics, Chemistry, Math, Biology' },
                { name: 'Class 12th Arts 2026-27 (वरदान बैच)', count: 'History, Pol Science, Geography, Hindi' },
                { name: 'Class 11th Science Batch (सफलता बैच)', count: '11th Hindi & English Medium' },
                { name: 'Class 9th Full Course (उड़ान बैच)', count: 'Complete Foundation Syllabus' },
                { name: 'CUET 2026 Target Board Batch', count: 'All University Entrance Prep' },
                { name: 'Polytechnic 2026 (सार्थक बैच)', count: 'Engineering Diploma Entrance' }
              ].map((c, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setIsAllCourseModalOpen(false);
                    const target = document.querySelector('main');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-3.5 rounded-xl bg-[#131a2b] hover:bg-[#1a243d] border border-white/5 hover:border-blue-500/40 transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                        {c.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">{c.count}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={() => {
                  setIsAllCourseModalOpen(false);
                  const target = document.querySelector('main');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                सभी बैच कार्ड्स ब्राउज करें (Browse All Batches)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default GBStudyEnhancements;
