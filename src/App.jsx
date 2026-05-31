import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  Gauge,
  Layers3,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  Target
} from "lucide-react";

const templates = [
  {
    id: "launch",
    name: "Запуск проекта",
    description: "От идеи до первой версии с контролем времени, бюджета и зависимости от команды.",
    goal: "Запустить MVP за 30 дней",
    steps: [
      {
        title: "Сформулировать проблему",
        action: "Описать аудиторию, боль, критерии успеха и одно главное обещание продукта.",
        risk: 38,
        time: 2,
        cost: 1,
        complexity: 2,
        cons: ["можно слишком широко определить аудиторию", "без интервью гипотеза останется слабой"]
      },
      {
        title: "Собрать карту решений",
        action: "Выбрать 3-5 вариантов реализации и отсечь лишние функции.",
        risk: 54,
        time: 4,
        cost: 2,
        complexity: 4,
        cons: ["есть риск спорить о вкусах вместо проверки", "часть сильных идей может быть отложена"]
      },
      {
        title: "Сделать прототип",
        action: "Собрать кликабельный путь пользователя и проверить, где он ломается.",
        risk: 62,
        time: 7,
        cost: 3,
        complexity: 5,
        cons: ["быстрый прототип может выглядеть сыро", "понадобятся правки после первых тестов"]
      },
      {
        title: "Проверить на пользователях",
        action: "Провести 5 коротких сессий и записать повторяющиеся возражения.",
        risk: 71,
        time: 5,
        cost: 2,
        complexity: 4,
        cons: ["поиск респондентов займет время", "обратная связь может поменять приоритеты"]
      },
      {
        title: "Собрать первую версию",
        action: "Оставить только критический путь и подготовить запуск.",
        risk: 58,
        time: 12,
        cost: 5,
        complexity: 6,
        cons: ["узкое MVP может выглядеть скромно", "часть ручных процессов придется принять временно"]
      }
    ]
  },
  {
    id: "career",
    name: "Смена профессии",
    description: "План перехода без резких движений: навыки, портфолио, рынок и финансовая подушка.",
    goal: "Перейти в новую роль за 12 недель",
    steps: [
      {
        title: "Выбрать целевую роль",
        action: "Сравнить 3 направления по спросу, входному порогу и личной мотивации.",
        risk: 46,
        time: 3,
        cost: 1,
        complexity: 3,
        cons: ["слишком ранний выбор может сузить обзор", "данные по рынку быстро меняются"]
      },
      {
        title: "Составить матрицу навыков",
        action: "Разложить вакансии на требования и отметить пробелы.",
        risk: 51,
        time: 4,
        cost: 1,
        complexity: 4,
        cons: ["требования в вакансиях часто завышены", "легко недооценить soft skills"]
      },
      {
        title: "Сделать учебные спринты",
        action: "Каждую неделю закрывать один навык через практическую задачу.",
        risk: 64,
        time: 28,
        cost: 3,
        complexity: 6,
        cons: ["нужна стабильная дисциплина", "без обратной связи можно закрепить ошибки"]
      },
      {
        title: "Собрать портфолио",
        action: "Упаковать 2-3 кейса с задачей, процессом, результатом и выводами.",
        risk: 57,
        time: 14,
        cost: 2,
        complexity: 5,
        cons: ["кейсы требуют аккуратной подачи", "не все учебные работы выглядят рыночно"]
      },
      {
        title: "Пойти в отклики",
        action: "Настроить резюме, список компаний и регулярный цикл откликов.",
        risk: 73,
        time: 21,
        cost: 2,
        complexity: 6,
        cons: ["будут отказы и молчание", "понадобится адаптировать резюме под разные роли"]
      }
    ]
  },
  {
    id: "habit",
    name: "Новая привычка",
    description: "Последовательность для устойчивого изменения поведения без перегруза.",
    goal: "Закрепить привычку за 21 день",
    steps: [
      {
        title: "Сузить привычку",
        action: "Выбрать минимальное действие, которое можно выполнить даже в плохой день.",
        risk: 29,
        time: 1,
        cost: 0,
        complexity: 1,
        cons: ["малый масштаб может казаться несерьезным", "сложно отказаться от завышенной планки"]
      },
      {
        title: "Привязать к триггеру",
        action: "Поставить действие после уже существующего ритуала.",
        risk: 34,
        time: 1,
        cost: 0,
        complexity: 2,
        cons: ["триггер может быть нестабильным", "первые дни легко забыть связку"]
      },
      {
        title: "Убрать трение",
        action: "Подготовить среду так, чтобы начать было проще, чем отложить.",
        risk: 42,
        time: 2,
        cost: 1,
        complexity: 3,
        cons: ["понадобится менять окружение", "не все препятствия видны заранее"]
      },
      {
        title: "Отмечать прогресс",
        action: "Вести простой трекер и фиксировать серию без наказаний за пропуск.",
        risk: 48,
        time: 3,
        cost: 0,
        complexity: 2,
        cons: ["трекер может превратиться в самоцель", "пропуск иногда демотивирует сильнее, чем помогает"]
      },
      {
        title: "Усилить награду",
        action: "Добавить маленькое приятное завершение после выполнения.",
        risk: 36,
        time: 1,
        cost: 1,
        complexity: 1,
        cons: ["награда может отвлечь от цели", "внешняя мотивация не всегда держится долго"]
      }
    ]
  },
  {
    id: "business",
    name: "Открытие бизнеса",
    description: "План запуска малого дела с проверкой спроса, расходами и первыми продажами.",
    goal: "Открыть бизнес без лишних рисков",
    steps: [
      {
        title: "Проверить спрос",
        action: "Описать клиента, проблему и провести 10 коротких разговоров с потенциальными покупателями.",
        risk: 58,
        time: 7,
        cost: 1,
        complexity: 4,
        cons: ["часть людей будет отвечать вежливо, но не покупать", "можно ошибиться с сегментом"]
      },
      {
        title: "Посчитать экономику",
        action: "Собрать стартовые расходы, цену, маржу и точку окупаемости.",
        risk: 66,
        time: 4,
        cost: 2,
        complexity: 5,
        cons: ["часть расходов всплывет позже", "оптимистичный прогноз легко обманет"]
      },
      {
        title: "Сделать тестовое предложение",
        action: "Запустить простую страницу или объявление и собрать первые заявки.",
        risk: 61,
        time: 5,
        cost: 3,
        complexity: 4,
        cons: ["реклама может не окупиться сразу", "нужны быстрые правки по реакции рынка"]
      },
      {
        title: "Настроить процессы",
        action: "Описать закупки, доставку, оплату, поддержку и контроль качества.",
        risk: 72,
        time: 10,
        cost: 4,
        complexity: 7,
        cons: ["операционка быстро съест время", "без регламентов качество будет плавать"]
      },
      {
        title: "Запустить продажи",
        action: "Собрать первую партию клиентов и измерить повторные покупки.",
        risk: 76,
        time: 14,
        cost: 5,
        complexity: 6,
        cons: ["первые продажи нестабильны", "может потребоваться менять оффер"]
      }
    ]
  },
  {
    id: "travel",
    name: "Переезд",
    description: "Последовательность для переезда: документы, деньги, жилье, работа и адаптация.",
    goal: "Переехать без хаоса",
    steps: [
      {
        title: "Выбрать город",
        action: "Сравнить стоимость жизни, работу, климат, транспорт и безопасность.",
        risk: 45,
        time: 3,
        cost: 1,
        complexity: 3,
        cons: ["по отзывам сложно понять реальную жизнь", "приоритеты семьи могут отличаться"]
      },
      {
        title: "Подготовить документы",
        action: "Собрать список требований и проверить сроки оформления.",
        risk: 70,
        time: 14,
        cost: 2,
        complexity: 6,
        cons: ["сроки могут затянуться", "ошибка в документе ломает план"]
      },
      {
        title: "Посчитать бюджет",
        action: "Сложить аренду, депозит, дорогу, быт и запас на первые месяцы.",
        risk: 63,
        time: 2,
        cost: 5,
        complexity: 4,
        cons: ["легко забыть мелкие расходы", "курс и цены могут измениться"]
      },
      {
        title: "Найти жилье",
        action: "Отобрать районы, проверить объявления и подготовить вопросы арендодателю.",
        risk: 68,
        time: 10,
        cost: 4,
        complexity: 5,
        cons: ["хорошие варианты быстро уходят", "фото не всегда совпадают с реальностью"]
      },
      {
        title: "Собрать план адаптации",
        action: "Наметить первые дела: связь, транспорт, медицина, школа, окружение.",
        risk: 49,
        time: 7,
        cost: 2,
        complexity: 4,
        cons: ["адаптация займет больше сил, чем кажется", "часть задач появится только на месте"]
      }
    ]
  },
  {
    id: "marketing",
    name: "Продвижение продукта",
    description: "План маркетинга с проверкой каналов, контента, бюджета и конверсий.",
    goal: "Найти рабочий канал продаж",
    steps: [
      {
        title: "Сформулировать оффер",
        action: "Описать выгоду, доказательства, цену и главное возражение клиента.",
        risk: 52,
        time: 2,
        cost: 1,
        complexity: 3,
        cons: ["оффер может быть понятен команде, но не клиенту", "нужны реальные доказательства"]
      },
      {
        title: "Выбрать каналы",
        action: "Сравнить рекламу, контент, партнерства и прямые продажи по скорости проверки.",
        risk: 57,
        time: 3,
        cost: 2,
        complexity: 4,
        cons: ["слишком много каналов распылит бюджет", "не все каналы подходят аудитории"]
      },
      {
        title: "Собрать креативы",
        action: "Подготовить 3-5 вариантов сообщений и визуалов для теста.",
        risk: 61,
        time: 5,
        cost: 2,
        complexity: 5,
        cons: ["креативы быстро выгорают", "слабый текст испортит хороший продукт"]
      },
      {
        title: "Запустить тест",
        action: "Поставить ограниченный бюджет и измерить клики, заявки, цену лида.",
        risk: 74,
        time: 7,
        cost: 5,
        complexity: 6,
        cons: ["данных может быть мало", "первые результаты часто шумные"]
      },
      {
        title: "Усилить победителя",
        action: "Оставить лучший канал, улучшить слабые места и поднять бюджет постепенно.",
        risk: 67,
        time: 10,
        cost: 5,
        complexity: 6,
        cons: ["масштабирование может сломать экономику", "конкуренты быстро копируют удачные ходы"]
      }
    ]
  }
];

const emptyStep = {
  title: "Новый шаг",
  action: "Опишите действие, которое приблизит к цели.",
  risk: 45,
  time: 3,
  cost: 2,
  budgetLabel: "до 10 000 ₽",
  complexity: 3,
  cons: ["есть неопределенность", "нужна проверка на практике"]
};

function normalizeStep(step) {
  return {
    title: String(step.title || "Новый шаг").slice(0, 80),
    action: String(step.action || "Опишите действие, которое приблизит к цели.").slice(0, 360),
    risk: clamp(step.risk ?? 45, 0, 100),
    time: clamp(step.time ?? 3, 1, 60),
    cost: clamp(step.cost ?? 2, 0, 9),
    budgetLabel: String(step.budgetLabel || getBudgetLabel(step.cost ?? 2)).slice(0, 80),
    complexity: clamp(step.complexity ?? 3, 1, 9),
    cons: Array.isArray(step.cons) && step.cons.length
      ? step.cons.slice(0, 4).map((con) => String(con).slice(0, 120))
      : ["есть неопределенность", "нужна проверка на практике"]
  };
}

function createFallbackSummary(steps, limits) {
  const totalTime = steps.reduce((sum, step) => sum + step.time, 0);
  const totalCost = steps.reduce((sum, step) => sum + step.cost, 0);
  const averageRisk = Math.round(steps.reduce((sum, step) => sum + step.risk, 0) / steps.length);
  const budgetUnits = Math.max(1, limits.budgetRub / 10000);
  const pressure = Math.round(
    clamp((totalTime / limits.time) * 38 + (totalCost / budgetUnits) * 34 + (limits.strictness / 100) * 28, 0, 100)
  );

  return { totalTime, averageRisk, pressure };
}

function formatRubles(value) {
  return `${Math.round(value).toLocaleString("ru-RU")} ₽`;
}

function getBudgetLabel(cost) {
  if (cost <= 0) return "без затрат";
  if (cost <= 2) return "до 10 000 ₽";
  if (cost <= 4) return "10 000–30 000 ₽";
  if (cost <= 6) return "30 000–70 000 ₽";
  return "от 70 000 ₽";
}

function normalizeSummary(summary, fallback) {
  return {
    totalTime: clamp(summary?.totalTime ?? fallback.totalTime, 1, 365),
    averageRisk: clamp(summary?.averageRisk ?? fallback.averageRisk, 0, 100),
    pressure: clamp(summary?.pressure ?? fallback.pressure, 0, 100)
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value)));
}

function riskLabel(value) {
  if (value >= 70) return "критично";
  if (value >= 50) return "заметно";
  return "терпимо";
}

function riskTone(value) {
  if (value >= 70) return "high";
  if (value >= 50) return "medium";
  return "low";
}

function loadBarHeight(value, multiplier, min = 10) {
  return `${clamp(Math.max(min, value * multiplier), min, 100)}%`;
}

function App() {
  const [templateId, setTemplateId] = useState(templates[0].id);
  const [customGoal, setCustomGoal] = useState("");
  const [steps, setSteps] = useState(() => templates[0].steps.map(normalizeStep));
  const [activeIndex, setActiveIndex] = useState(0);
  const [limits, setLimits] = useState({ time: 30, budgetRub: 50000, strictness: 55 });
  const [aiSummary, setAiSummary] = useState(null);
  const [aiGoal, setAiGoal] = useState("");
  const [aiDescription, setAiDescription] = useState("");
  const [aiBusy, setAiBusy] = useState("");
  const [aiMessage, setAiMessage] = useState("");

  const selectedTemplate = templates.find((template) => template.id === templateId) ?? templates[0];

  const fallbackSummary = useMemo(() => createFallbackSummary(steps, limits), [limits, steps]);
  const totals = aiSummary ?? fallbackSummary;

  const chartData = useMemo(
    () =>
      steps.map((step, index) => ({
        ...step,
        index,
        adjustedRisk: step.risk
      })),
    [steps]
  );

  const activeStep = chartData[activeIndex] ?? chartData[0];
  const maxTime = Math.max(...steps.map((step) => step.time), 1);

  function updateStep(index, patch) {
    setSteps((current) =>
      current.map((step, stepIndex) => (stepIndex === index ? { ...step, ...patch } : step))
    );
  }

  function addStep() {
    setSteps((current) => [...current, { ...emptyStep }]);
    setActiveIndex(steps.length);
  }

  function removeStep() {
    if (steps.length <= 1) return;

    setSteps((current) => current.filter((_, index) => index !== activeIndex));
    setActiveIndex((current) => Math.max(0, Math.min(current - 1, steps.length - 2)));
  }

  function resetScenario() {
    setSteps(selectedTemplate.steps.map(normalizeStep));
    setCustomGoal("");
    setAiGoal("");
    setAiDescription("");
    setAiMessage("");
    setAiSummary(null);
    setActiveIndex(0);
    setLimits({ time: 30, budgetRub: 50000, strictness: 55 });
  }

  async function generateAiPlan() {
    const goal = (aiGoal || customGoal || selectedTemplate.goal).trim();

    if (!goal) {
      setAiMessage("Напиши цель, чтобы ИИ собрал план.");
      return;
    }

    setAiBusy("plan");
    setAiMessage("");

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, limits })
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Не получилось сгенерировать план.");

      setCustomGoal(data.goal);
      setAiGoal(data.goal);
      setAiDescription(data.description);
      const nextSteps = data.steps.map(normalizeStep);
      setSteps(nextSteps);
      setAiSummary(normalizeSummary(data.summary, createFallbackSummary(nextSteps, limits)));
      setActiveIndex(0);
      setAiMessage("План и показатели посчитаны ИИ.");
    } catch (error) {
      setAiMessage(error.message);
    } finally {
      setAiBusy("");
    }
  }

  async function analyzeActiveStep() {
    setAiBusy("step");
    setAiMessage("");

    try {
      const response = await fetch("/api/analyze-step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: customGoal || selectedTemplate.goal,
          step: activeStep,
          steps,
          limits
        })
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Не получилось найти минусы.");

      updateStep(activeStep.index, {
        cons: data.cons
      });
      setAiMessage("Минусы обновлены ИИ.");
    } catch (error) {
      setAiMessage(error.message);
    } finally {
      setAiBusy("");
    }
  }

  return (
    <main className="app-shell">
      <section className="workspace">
        <aside className="sidebar" aria-label="Параметры плана">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">
              <Layers3 size={22} />
            </div>
            <div>
              <p>IdeaDiagram</p>
              <span>План действий и минусы</span>
            </div>
          </div>

          <div className="sidebar-heading">
            <span>Параметры оценки</span>
            <p>ИИ учитывает эти рамки при генерации плана и итоговых показателей.</p>
          </div>

          <div className="sliders">
            <RangeControl
              icon={<Clock3 size={17} />}
              label="Дней в запасе"
              min={7}
              max={90}
              value={limits.time}
              onChange={(value) => setLimits((current) => ({ ...current, time: value }))}
            />
            <MoneyControl
              icon={<Gauge size={17} />}
              label="Бюджет, ₽"
              value={limits.budgetRub}
              onChange={(value) => setLimits((current) => ({ ...current, budgetRub: value }))}
            />
            <RangeControl
              icon={<AlertTriangle size={17} />}
              label="Строгость оценки"
              min={10}
              max={100}
              value={limits.strictness}
              onChange={(value) => setLimits((current) => ({ ...current, strictness: value }))}
            />
          </div>

          <div className="sidebar-note">
            <span>Фокус</span>
            <strong>{riskLabel(totals.pressure)}</strong>
            <p>Итоговая нагрузка плана по оценке ИИ.</p>
          </div>

          <div className="sidebar-current">
            <span>Текущий шаг</span>
            <strong>{activeStep.title}</strong>
            <p>{activeStep.adjustedRisk}% минусов · {activeStep.time} дн. · сложность {activeStep.complexity}</p>
            <p>{activeStep.budgetLabel || getBudgetLabel(activeStep.cost)}</p>
          </div>

          <div className="sidebar-actions">
            <button type="button" className="icon-button" onClick={addStep} aria-label="Добавить шаг" title="Добавить шаг">
              <Plus size={18} />
            </button>
            <button
              type="button"
              className="icon-button"
              onClick={removeStep}
              disabled={steps.length <= 1}
              aria-label="Удалить шаг"
              title="Удалить шаг"
            >
              <Minus size={18} />
            </button>
            <button
              type="button"
              className="icon-button"
              onClick={resetScenario}
              aria-label="Сбросить сценарий"
              title="Сбросить сценарий"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          <div className="sidebar-contact">
            <a href="mailto:hello@ideadiagram.app">hello@ideadiagram.app</a>
            <a href="tel:+79990000000">+7 999 000-00-00</a>
          </div>
        </aside>

        <section className="main-panel">
          <header className="planner-hero">
            <div className="hero-content">
              <p className="eyebrow">
                <Sparkles size={16} />
                ИИ-планировщик
              </p>
              <h1>{customGoal || "Собери план действий"}</h1>
              <p>{aiDescription || "Опиши задачу простыми словами, а ИИ соберет шаги, минусы и диаграммы риска."}</p>

              <div className="ai-composer">
                <div className="prompt-box">
                  <textarea
                    value={aiGoal}
                    onChange={(event) => setAiGoal(event.target.value)}
                    placeholder="Например: запустить сайт для поиска репетиторов"
                  />
                  <button type="button" className="ai-button" onClick={generateAiPlan} disabled={aiBusy === "plan"}>
                    <Sparkles size={18} />
                    {aiBusy === "plan" ? "Генерирую..." : "Сгенерировать"}
                  </button>
                </div>

                {aiMessage && <p className="ai-message">{aiMessage}</p>}
              </div>
            </div>

            <div className="hero-aside">
              <div className="hero-status">
                <span className={`pulse-dot ${riskTone(totals.pressure)}`} />
                <strong>{riskLabel(totals.pressure)}</strong>
                <span>нагрузка плана</span>
              </div>
              <div className="summary-grid">
                <Metric icon={<Clock3 size={18} />} label="Время" value={`${totals.totalTime} дн.`} tone="time" />
                <Metric icon={<BarChart3 size={18} />} label="Риск" value={`${totals.averageRisk}%`} tone="risk" />
                <Metric icon={<Target size={18} />} label="Давление" value={`${totals.pressure}%`} tone="pressure" />
              </div>
            </div>
          </header>

          <section className="flow-section" aria-label="Цепочка действий">
            {chartData.map((step, index) => (
              <button
                key={`${step.title}-${index}`}
                type="button"
                className={`step-node ${index === activeIndex ? "active" : ""} ${riskTone(step.adjustedRisk)}`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="step-number">{index + 1}</span>
                <span className="step-copy">
                  <span className="step-title">{step.title}</span>
                  <span className="step-risk">{step.adjustedRisk}% минусов</span>
                </span>
                {index < steps.length - 1 && <ChevronRight className="step-arrow" size={18} aria-hidden="true" />}
              </button>
            ))}
          </section>

          <section className="analysis-grid">
            <article className="chart-panel risk-panel">
              <div className="panel-title">
                <BarChart3 size={19} />
                <h2>Диаграмма минусов</h2>
              </div>
              <div className="bar-chart" aria-label="Диаграмма рисков по шагам">
                {chartData.map((step) => (
                  <button
                    key={`${step.title}-bar`}
                    type="button"
                    className={`bar-row ${step.index === activeIndex ? "active" : ""} ${riskTone(step.adjustedRisk)}`}
                    onClick={() => setActiveIndex(step.index)}
                  >
                    <span>{step.index + 1}</span>
                    <div className="bar-track">
                      <div className="bar-mask" style={{ width: `${100 - step.adjustedRisk}%` }} />
                    </div>
                    <strong>{step.adjustedRisk}%</strong>
                  </button>
                ))}
              </div>
            </article>

            <article className="chart-panel">
              <div className="panel-title">
                <Gauge size={19} />
                <h2>Нагрузка шагов</h2>
              </div>
              <div className="load-chart" aria-label="Сравнение времени, денег и сложности">
                {chartData.map((step) => (
                  <button
                    type="button"
                    key={`${step.title}-load`}
                    className={`load-column ${step.index === activeIndex ? "active" : ""}`}
                    onClick={() => setActiveIndex(step.index)}
                  >
                    <span className="load-stack">
                      <span className="load-time" style={{ height: `${Math.max(14, (step.time / maxTime) * 100)}%` }} />
                      <span className="load-cost" style={{ height: loadBarHeight(step.cost, 12) }} />
                      <span className="load-complexity" style={{ height: loadBarHeight(step.complexity, 11) }} />
                    </span>
                    <span>{step.index + 1}</span>
                  </button>
                ))}
              </div>
              <div className="legend">
                <span><i className="legend-time" /> время</span>
                <span><i className="legend-cost" /> деньги</span>
                <span><i className="legend-complexity" /> сложность</span>
              </div>
            </article>

            <article className="detail-panel">
              <div className="panel-title">
                <Sparkles size={19} />
                <h2>Шаг {activeStep.index + 1}</h2>
              </div>
              <button
                type="button"
                className="ai-inline-button"
                onClick={analyzeActiveStep}
                disabled={aiBusy === "step"}
              >
                <Sparkles size={16} />
                {aiBusy === "step" ? "Ищу минусы..." : "Найти минусы ИИ"}
              </button>

              <div className="edit-grid">
                <label>
                  Название
                  <input
                    value={activeStep.title}
                    onChange={(event) => updateStep(activeStep.index, { title: event.target.value })}
                  />
                </label>
                <label>
                  Действие
                  <textarea
                    value={activeStep.action}
                    onChange={(event) => updateStep(activeStep.index, { action: event.target.value })}
                  />
                </label>
              </div>

              <div className="score-row">
                <RangeControl
                  icon={<AlertTriangle size={17} />}
                  label="Минусы"
                  min={0}
                  max={100}
                  value={activeStep.risk}
                  onChange={(value) => updateStep(activeStep.index, { risk: value })}
                />
                <RangeControl
                  icon={<Clock3 size={17} />}
                  label="Время"
                  min={1}
                  max={30}
                  value={activeStep.time}
                  onChange={(value) => updateStep(activeStep.index, { time: value })}
                />
                <div className="budget-readout">
                  <span>
                    <Gauge size={17} />
                    Деньги
                  </span>
                  <strong>{activeStep.budgetLabel || getBudgetLabel(activeStep.cost)}</strong>
                </div>
                <RangeControl
                  icon={<Gauge size={17} />}
                  label="Сложность"
                  min={1}
                  max={9}
                  value={activeStep.complexity}
                  onChange={(value) => updateStep(activeStep.index, { complexity: value })}
                />
              </div>

              <div className="cons-list">
                <div className={`status-chip ${riskTone(activeStep.adjustedRisk)}`}>
                  <Minus size={15} />
                  {riskLabel(activeStep.adjustedRisk)}
                </div>
                {activeStep.cons.map((con) => (
                  <p key={con}>
                    <Check size={15} />
                    {con}
                  </p>
                ))}
              </div>
            </article>
          </section>
        </section>
      </section>
    </main>
  );
}

function RangeControl({ icon, label, min, max, value, onChange }) {
  return (
    <label className="range-control">
      <span>
        {icon}
        {label}
        <strong>{value}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(clamp(event.target.value, min, max))}
      />
    </label>
  );
}

function MoneyControl({ icon, label, value, onChange }) {
  return (
    <label className="range-control money-control">
      <span>
        {icon}
        {label}
        <strong>{formatRubles(value)}</strong>
      </span>
      <input
        type="number"
        min={0}
        step={5000}
        value={value}
        onChange={(event) => onChange(clamp(event.target.value, 0, 10000000))}
      />
    </label>
  );
}

function Metric({ icon, label, value, tone }) {
  return (
    <div className={`metric ${tone}`}>
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;
