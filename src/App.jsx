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
  }
];

const emptyStep = {
  title: "Новый шаг",
  action: "Опишите действие, которое приблизит к цели.",
  risk: 45,
  time: 3,
  cost: 2,
  complexity: 3,
  cons: ["есть неопределенность", "нужна проверка на практике"]
};

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

function App() {
  const [templateId, setTemplateId] = useState(templates[0].id);
  const [customGoal, setCustomGoal] = useState("");
  const [steps, setSteps] = useState(templates[0].steps);
  const [activeIndex, setActiveIndex] = useState(0);
  const [limits, setLimits] = useState({ time: 30, budget: 12, strictness: 55 });

  const selectedTemplate = templates.find((template) => template.id === templateId) ?? templates[0];

  const totals = useMemo(() => {
    const totalTime = steps.reduce((sum, step) => sum + step.time, 0);
    const totalCost = steps.reduce((sum, step) => sum + step.cost, 0);
    const averageRisk = Math.round(steps.reduce((sum, step) => sum + step.risk, 0) / steps.length);
    const pressure = Math.round(
      clamp((totalTime / limits.time) * 38 + (totalCost / limits.budget) * 34 + (limits.strictness / 100) * 28, 0, 100)
    );

    return { totalTime, totalCost, averageRisk, pressure };
  }, [limits, steps]);

  const chartData = useMemo(
    () =>
      steps.map((step, index) => ({
        ...step,
        index,
        adjustedRisk: Math.round(
          clamp(step.risk + (totals.pressure - 50) * 0.35 + step.complexity * 1.8, 0, 100)
        )
      })),
    [steps, totals.pressure]
  );

  const activeStep = chartData[activeIndex] ?? chartData[0];
  const maxTime = Math.max(...steps.map((step) => step.time), 1);

  function selectTemplate(nextId) {
    const nextTemplate = templates.find((template) => template.id === nextId) ?? templates[0];
    setTemplateId(nextId);
    setSteps(nextTemplate.steps);
    setCustomGoal("");
    setActiveIndex(0);
  }

  function updateStep(index, patch) {
    setSteps((current) =>
      current.map((step, stepIndex) => (stepIndex === index ? { ...step, ...patch } : step))
    );
  }

  function addStep() {
    setSteps((current) => [...current, { ...emptyStep }]);
    setActiveIndex(steps.length);
  }

  function resetScenario() {
    setSteps(selectedTemplate.steps);
    setCustomGoal("");
    setActiveIndex(0);
    setLimits({ time: 30, budget: 12, strictness: 55 });
  }

  return (
    <main className="app-shell">
      <section className="workspace">
        <aside className="sidebar" aria-label="Настройки сценария">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">
              <Layers3 size={22} />
            </div>
            <div>
              <p>IdeaDiagram</p>
              <span>План действий и минусы</span>
            </div>
          </div>

          <div className="control-group">
            <label htmlFor="scenario">Сценарий</label>
            <select id="scenario" value={templateId} onChange={(event) => selectTemplate(event.target.value)}>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="goal">Цель</label>
            <input
              id="goal"
              value={customGoal}
              onChange={(event) => setCustomGoal(event.target.value)}
              placeholder={selectedTemplate.goal}
            />
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
            <RangeControl
              icon={<Gauge size={17} />}
              label="Бюджет"
              min={3}
              max={30}
              value={limits.budget}
              onChange={(value) => setLimits((current) => ({ ...current, budget: value }))}
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
            <p>Чем меньше запас времени и бюджета, тем жестче подсветка минусов в диаграммах.</p>
          </div>

          <div className="sidebar-actions">
            <button type="button" className="icon-button" onClick={addStep} aria-label="Добавить шаг" title="Добавить шаг">
              <Plus size={18} />
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
        </aside>

        <section className="main-panel">
          <header className="topline">
            <div>
              <p className="eyebrow">
                <Compass size={16} />
                последовательность действий
              </p>
              <h1>{customGoal || selectedTemplate.goal}</h1>
              <p>{selectedTemplate.description}</p>
              <div className="hero-status">
                <span className={`pulse-dot ${riskTone(totals.pressure)}`} />
                <strong>{riskLabel(totals.pressure)}</strong>
                <span>оценка нагрузки по текущим ограничениям</span>
              </div>
            </div>
            <div className="summary-grid">
              <Metric icon={<Clock3 size={18} />} label="Время" value={`${totals.totalTime} дн.`} tone="time" />
              <Metric icon={<BarChart3 size={18} />} label="Риск" value={`${totals.averageRisk}%`} tone="risk" />
              <Metric icon={<Target size={18} />} label="Давление" value={`${totals.pressure}%`} tone="pressure" />
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
                      <div className="bar-fill" style={{ width: `${step.adjustedRisk}%` }} />
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
              <div className="load-chart" aria-label="Сравнение времени, цены и сложности">
                {chartData.map((step) => (
                  <button
                    type="button"
                    key={`${step.title}-load`}
                    className={`load-column ${step.index === activeIndex ? "active" : ""}`}
                    onClick={() => setActiveIndex(step.index)}
                  >
                    <span className="load-stack">
                      <span className="load-time" style={{ height: `${Math.max(14, (step.time / maxTime) * 100)}%` }} />
                      <span className="load-cost" style={{ height: `${Math.max(10, step.cost * 13)}%` }} />
                      <span className="load-complexity" style={{ height: `${Math.max(10, step.complexity * 11)}%` }} />
                    </span>
                    <span>{step.index + 1}</span>
                  </button>
                ))}
              </div>
              <div className="legend">
                <span><i className="legend-time" /> время</span>
                <span><i className="legend-cost" /> бюджет</span>
                <span><i className="legend-complexity" /> сложность</span>
              </div>
            </article>

            <article className="detail-panel">
              <div className="panel-title">
                <Sparkles size={19} />
                <h2>Шаг {activeStep.index + 1}</h2>
              </div>

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
