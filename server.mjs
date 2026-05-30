import "dotenv/config";
import http from "node:http";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const port = Number(process.env.PORT ?? 8787);
const model = process.env.OPENAI_MODEL ?? "gpt-5-mini";
const apiKey = process.env.OPENAI_API_KEY;

const StepSchema = z.object({
  title: z.string().min(3).max(80),
  action: z.string().min(12).max(360),
  risk: z.number().int().min(0).max(100),
  time: z.number().int().min(1).max(60),
  cost: z.number().int().min(0).max(9),
  complexity: z.number().int().min(1).max(9),
  cons: z.array(z.string().min(6).max(120)).min(2).max(4)
});

const PlanSchema = z.object({
  goal: z.string().min(6).max(120),
  description: z.string().min(20).max(220),
  steps: z.array(StepSchema).min(4).max(7)
});

const StepAnalysisSchema = z.object({
  action: z.string().min(12).max(360),
  risk: z.number().int().min(0).max(100),
  complexity: z.number().int().min(1).max(9),
  cons: z.array(z.string().min(6).max(120)).min(2).max(4)
});

const openai = apiKey ? new OpenAI({ apiKey }) : null;

const server = http.createServer(async (request, response) => {
  response.setHeader("Content-Type", "application/json; charset=utf-8");

  if (request.method === "GET" && request.url === "/api/health") {
    sendJson(response, 200, { ok: true, hasKey: Boolean(apiKey), model });
    return;
  }

  if (request.method !== "POST") {
    sendJson(response, 404, { error: "Маршрут не найден." });
    return;
  }

  try {
    if (!openai) {
      sendJson(response, 500, { error: "Добавь OPENAI_API_KEY в .env и перезапусти dev-сервер." });
      return;
    }

    if (request.url === "/api/generate-plan") {
      const body = await readJson(request);
      const goal = String(body.goal ?? "").trim();

      if (goal.length < 4) {
        sendJson(response, 400, { error: "Напиши цель хотя бы в нескольких словах." });
        return;
      }

      const plan = await generatePlan(goal, body.limits);
      sendJson(response, 200, plan);
      return;
    }

    if (request.url === "/api/analyze-step") {
      const body = await readJson(request);
      const analysis = await analyzeStep(body);
      sendJson(response, 200, analysis);
      return;
    }

    sendJson(response, 404, { error: "Маршрут не найден." });
  } catch (error) {
    console.error("AI API error", {
      status: error.status,
      code: error.code,
      type: error.type,
      message: error.message
    });
    sendJson(response, error.status === 401 ? 401 : 500, {
      error: getPublicErrorMessage(error)
    });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`AI API ready on http://127.0.0.1:${port}`);
});

async function generatePlan(goal, limits = {}) {
  const response = await openai.responses.parse({
    model,
    instructions: [
      "Ты продуктовый планировщик для русскоязычного сайта IdeaDiagram.",
      "Верни практичный JSON-план действий: шаги, минусы, риски, время, бюджет и сложность.",
      "Пиши по-русски, конкретно, без воды. Не обещай гарантированный успех.",
      "Оцени cost как условные единицы от 0 до 9, где 0 почти бесплатно, 9 очень дорого.",
      "risk — общий риск/минусы шага от 0 до 100. complexity — сложность от 1 до 9."
    ].join(" "),
    input: [
      {
        role: "user",
        content: [
          `Цель пользователя: ${goal}`,
          `Ограничения: дней ${limits.time ?? "не указано"}, бюджет ${limits.budget ?? "не указано"}, строгость оценки ${limits.strictness ?? "не указано"}.`,
          "Сделай 4-7 последовательных шагов. Каждый шаг должен быть выполнимым и проверяемым."
        ].join("\n")
      }
    ],
    text: {
      format: zodTextFormat(PlanSchema, "idea_diagram_plan")
    }
  });

  return response.output_parsed;
}

async function analyzeStep(body) {
  const step = body.step ?? {};
  const goal = String(body.goal ?? "цель не указана").trim();

  const response = await openai.responses.parse({
    model,
    instructions: [
      "Ты аналитик рисков для плана действий.",
      "Улучши выбранный шаг: уточни действие, найди реальные минусы, оцени риск и сложность.",
      "Пиши по-русски, кратко и прикладно."
    ].join(" "),
    input: [
      {
        role: "user",
        content: [
          `Цель: ${goal}`,
          `Название шага: ${step.title ?? ""}`,
          `Текущее действие: ${step.action ?? ""}`,
          `Текущий риск: ${step.risk ?? ""}`,
          `Текущая сложность: ${step.complexity ?? ""}`,
          "Верни улучшенное действие, 2-4 минуса, риск и сложность."
        ].join("\n")
      }
    ],
    text: {
      format: zodTextFormat(StepAnalysisSchema, "idea_diagram_step_analysis")
    }
  });

  return response.output_parsed;
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let raw = "";

    request.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 100_000) {
        request.destroy();
        reject(new Error("Request body is too large."));
      }
    });

    request.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });

    request.on("error", reject);
  });
}

function sendJson(response, status, payload) {
  response.writeHead(status);
  response.end(JSON.stringify(payload));
}

function getPublicErrorMessage(error) {
  if (error.status === 401 || error.code === "invalid_api_key") {
    return "Ключ не принят OpenAI. Нужен действующий API key из platform.openai.com.";
  }

  if (error.status === 429) {
    return "Лимит API исчерпан или слишком много запросов. Попробуй позже.";
  }

  if (error.status === 400 && String(error.message || "").includes("model")) {
    return "Модель не доступна для этого ключа. Попробуй поменять OPENAI_MODEL в .env.";
  }

  return "ИИ не ответил. Проверь ключ, модель или попробуй ещё раз.";
}
